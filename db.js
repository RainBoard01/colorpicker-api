import mongoist from "mongoist";
import dotenv from "dotenv";
dotenv.config();
const { DB_USER, DB_PWD, DB_HOST, DB_PORT, DB_DBN } = process.env;

const connectionString = `mongodb://${DB_USER}:${DB_PWD}@${DB_HOST}:${DB_PORT}/${DB_DBN}`;

const db = mongoist(connectionString, {
  useNewUrlParser: true,
  authSource: DB_DBN,
});
db.on("error", (err) => console.log("Database error", err)).on("connect", () =>
  console.log("Database connected")
);

await db.listCollections();

export default db;
