import jwt from "jsonwebtoken";
import db from "../db";
import users from "../users";

const userQueries = {
  users: async (_, obj) => users,
  user: async (_, { username }) =>
    users[username] ? users[username] : new Error("Unknown user"),
  login: async (_, { username, password }) => {
    const user = await db.users.findOne({ username: username });
    if (username === user.username && password === user.password) {
      return jwt.sign(
        {
          username: user.username,
          password: user.password,
          role: user.role,
        },
        "awadeowo",
        { expiresIn: "1h" }
      );
    } else {
      throw new AuthenticationError("Invalid Credentials");
    }
  },
};

export { userQueries };
