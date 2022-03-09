import { MongoClient } from "mongodb";

let uri = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_DB;

let cachedClient = null;
let cacheDb = null;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

if (!dbName) {
  throw new Error("Please define the MONGODB_DB environment variable inside .env.local");
}
export async function connctToDatabase() {
  if (cachedClient && cacheDb) {
    return {
      client: cachedClient,
      db: cacheDb,
    };
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await client.db(dbName);

  cachedClient = client;
  cacheDb = db;
  return { client, db };
}
