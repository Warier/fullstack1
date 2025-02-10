require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const libraryRoutes = require('./routes/library');
app.use('/api/library', libraryRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});