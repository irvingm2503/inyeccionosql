require('dotenv').config();
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.DB_URI);

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Conexión exitosa a MongoDB");
        const db = client.db(process.env.DB_NAME);
        return db;
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1);
    }
}

module.exports = connectToDatabase;