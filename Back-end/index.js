require('dotenv').config();
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const sanitizer = require('perfect-express-sanitizer');
const cache = require('./cache');

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

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const libraryRoutes = require('./routes/library');
app.use('/api/library', libraryRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});