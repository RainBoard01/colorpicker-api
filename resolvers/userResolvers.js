import { ObjectId } from "mongoist";
import jwt from "jsonwebtoken";
import db from "../db";

const userQueries = {
  users: async () =>
    await db.users
      .find()
      .then((res) => res)
      .catch((err) => console.log(err)),

  user: async (_, username) =>
    await db.users
      .findOne({ username: username })
      .then((res) => res)
      .catch((err) => console.log(err)),

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

const userMutations = {
  createUser: async (_, newUser) => {
    const newId = ObjectId();
    await db.users.insert({
      _id: newId,
      email: newUser.data.email,
      username: newUser.data.username,
      password: newUser.data.password,
      role: newUser.data.role,
    });
    return await db.users
      .findOne({ _id: newId })
      .then((res) => res)
      .catch((err) => console.log(err));
  },

  updateUser: async (_, { id, newUser }) =>
    await db.users
      .findAndModify({
        query: { _id: ObjectId(id.id) },
        update: {
          email: newUser.data.email,
          username: newUser.data.username,
          password: newUser.data.password,
          role: newUser.data.role,
        },
        new: true,
      })
      .then((res) => res)
      .catch((err) => console.log(err)),

  deleteUser: async (_, id) =>
    await db.users
      .findAndModify({
        query: { _id: ObjectId(id.id) },
        remove: true,
      })
      .then((res) => res)
      .catch((err) => console.log(err)),
};

export { userQueries, userMutations };
