require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const sanitizer = require('perfect-express-sanitizer');
const cache = require('./cache');
const rateLimit = require('express-rate-limit');
const expressWinston = require('express-winston');
const logger = require('./logger');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(sanitizer.clean({
    xss: true,
    noSql: true,
    sql: true,
    level: 5,
}));

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 1000,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: 'Muitas requisições, tente novamente mais tarde.'
});
app.use(globalLimiter);

app.use(expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    expressFormat: false,
    colorize: true,
    requestWhitelist: ['url', 'method', 'httpVersion', 'originalUrl', 'query', 'body'],
    responseWhitelist: ['statusCode', 'body'],
}));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const libraryRoutes = require('./routes/library');
app.use('/api/library', libraryRoutes);

app.use(expressWinston.errorLogger({
    winstonInstance: logger,
    msg: '{{err.message}} - {{req.method}} {{req.url}}',
    exceptionToMeta: (err) => {
        return {
            stack: err.stack
        }
    }
}));

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});