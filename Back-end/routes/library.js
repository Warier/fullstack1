const express = require('express');
const router = express.Router();
const { addGame, getGames, searchGames } = require('../services/games');
const authenticateToken = require('../middleware/auth');
const cache = require('../cache');


router.post('/', authenticateToken, cache.invalidate('/api/library'), async (req, res) => {
    try {
        console.log('add_game');
        const userId = req.user.userId;
        const gameData = req.body;
        const result = await addGame(userId, gameData);
        res.status(201).json({ message: 'Jogo adicionado à biblioteca com sucesso!', data: result });

    } catch (error) {
        console.error("Erro na rota POST addgame:", error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/', authenticateToken, cache.route({ expire: 5, name: 'get_library' }), async (req, res) => {
    try {
        console.log('get_library');
        const userId = req.user.userId;
        const games = await getGames(userId);
        res.status(200).json(games);
    } catch (error) {
        console.error("Erro na rota GET getgames:", error);
        res.status(500).json({ message: error.message });
    }
});

router.get('/search', authenticateToken, cache.route({ expire: 5, name: 'search_library' }), async (req, res) => {
    try {
        console.log('search_library');
        const userId = req.user.userId;
        const searchTerm = req.query.q;

        if (!searchTerm) {
            return res.status(200).json([]);
        }

        const games = await searchGames(userId, searchTerm);
        res.status(200).json(games);

    } catch (error) {
        console.error("Erro na rota GET search:", error);
        res.status(500).json({ message: error.message });
    }
});
module.exports = router;