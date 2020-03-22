import { MongoClient } from "mongodb";
const url = "mongodb://localhost:27017";
const dbName = "formularioApp";
const client = new MongoClient(url, { useUnifiedTopology: true });
client.connect();
const db = client.db(dbName);
console.log("Connected to DB");
export default db;