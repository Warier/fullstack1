const { MongoClient, ServerApiVersion } = require('mongodb');

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
let uri = process.env.DB_URI;

async function checkAndCreate(db, collectionName) {
    const collections = await db.listCollections({ name: collectionName }).toArray();
    if (collections.length === 0) {
        await db.createCollection(collectionName);
        console.log(`Coleção '${collectionName}' criada com sucesso.`);

        if(collectionName === 'library'){
            await db.collection(collectionName).createIndex({ userId: 1, gameId: 1 }, { unique: true });
            console.log(`Index único criado em 'userId' e 'gameId' na coleção 'library'.`);
        }

    } else {
        console.log(`Coleção '${collectionName}' já existe.`);
    }
}

async function conn() {

    uri = uri.replace('<DB_USER>', dbUser)
        .replace('<DB_PASSWORD>', dbPassword)
        .replace('<DB_NAME>', dbName);

    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        console.log("Conectado ao db");
        const mongo = client.db(dbName);

        await checkAndCreate(mongo, 'users');
        await checkAndCreate(mongo, 'library');

        return mongo;
    } catch (error) {
        console.error("Erro ao conectar ao db:", error);
        throw error;
    }
}

module.exports = { conn };