const { conn } = require('../db/mongo');

async function findUserByUsername(username) {
    let client;
    try {
        const db = await conn();
        client = db.client
        const usersCollection = db.collection('users');
        const user = await usersCollection.findOne({ username });
        return user;
    } catch (error) {
        console.error("Erro em findUserByUsername:", error);
        throw new Error("Erro ao buscar usuário no banco de dados");
    } finally {
        if (client) {
            await client.close();
            console.log("Conexão fechada.");
        }
    }
}

module.exports = { findUserByUsername };