const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { findUserByUsername } = require('../services/user');
const cache = require("../cache");

router.post('/login', cache.invalidate('/api/library'),async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Usuário e senha são obrigatórios' });
        }


        const user = await findUserByUsername(username);

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        if (password !== user.password) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            jwtSecret,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });

    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ message: error.message || 'Erro do servidor' });
    }
});

module.exports = router;