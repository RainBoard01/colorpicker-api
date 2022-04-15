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

export default db;
