const { conn } = require('../db/mongo');

async function addGame(userId, gameData) {
    let client;
    try {
        const db = await conn();
        client = db.client;
        const libraryCollection = db.collection('library');

        const existingGame = await libraryCollection.findOne({ userId, gameId: gameData.gameId });
        if (existingGame) {
            throw new Error('Jogo já existe na biblioteca');
        }

        const libraryEntry = {
            userId,
            ...gameData,
        };
        const result = await libraryCollection.insertOne(libraryEntry);
        return result;

    } catch (error) {
        console.error("Erro em addGame:", error);
        throw new Error("Erro ao adicionar jogo à biblioteca: " + error.message);
    } finally {
        if (client) {
            await client.close();
        }
    }
}

async function getGames(userId) {
    let client;
    try {
        const db = await conn();
        client = db.client;
        const libraryCollection = db.collection('library');
        const games = await libraryCollection.find({ userId }).sort({ _id: -1 }).toArray();
        return games;
    } catch (error) {
        console.error("Erro em getGames:", error);
        throw new Error("Erro ao buscar jogos da biblioteca: " + error.message);
    } finally {
        if (client) {
            await client.close();
        }
    }
}

async function searchGames(userId, searchTerm) {
    let client;
    try {
        const db = await conn();
        client = db.client;
        const libraryCollection = db.collection('library');

        if (!searchTerm) {
            return [];
        }

        const games = await libraryCollection.find({
            userId,
            name: { $regex: searchTerm, $options: 'i' }
        }).sort({ _id: -1 }).toArray();

        return games;

    } catch (error) {
        console.error("Erro em searchGames:", error);
        throw new Error("Erro ao buscar jogos na biblioteca: " + error.message);
    } finally {
        if (client) {
            await client.close();
        }
    }
}
module.exports = { addGame, getGames, searchGames };