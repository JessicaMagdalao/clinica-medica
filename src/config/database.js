import { MongoClient } from 'mongodb';

let client = null;
let database = null;

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  const databaseName = process.env.DATABASE_NAME;

  if (!uri) {
    throw new Error('A variável MONGODB_URI não foi configurada no arquivo .env');
  }

  if (!databaseName) {
    throw new Error('A variável DATABASE_NAME não foi configurada no arquivo .env');
  }

  if (database) {
    return database;
  }

  client = new MongoClient(uri);

  await client.connect();

  database = client.db(databaseName);

  await database.command({ ping: 1 });

  console.log(`Conectado ao MongoDB no banco ${databaseName}`);

  return database;
}

export function getDatabase() {
  if (!database) {
    throw new Error('Banco de dados não conectado. Execute connectToDatabase primeiro.');
  }

  return database;
}

export async function closeDatabaseConnection() {
  if (client) {
    await client.close();
    client = null;
    database = null;
  }
}