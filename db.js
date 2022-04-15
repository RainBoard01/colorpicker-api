import mongoist from "mongoist";
import dotenv from "dotenv";
dotenv.config();

const user = process.env.DB_USER;
const pwd = process.env.DB_PWD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const dbN = process.env.DB_DBN;

const db = mongoist(`mongodb://${user}:${pwd}@${host}:${port}/${dbN}`, {
  useNewUrlParser: true,
  authSource: dbN,
});
console.log(`mongodb://${user}:${pwd}@${host}:${port}/${dbN}`);

// Emitted if no db connection could be established
db.on("error", function (err) {
  console.log("database error", err);
});

// Emitted if a db connection was established
db.on("connect", function () {
  console.log("database connected");
});

await db.listCollections();

export default db;
