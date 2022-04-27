import { ObjectId } from "mongoist";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../db";

const userQueries = {
  users: async () =>
    await db.users
      .find()
      .then((res) => res)
      .catch((err) => console.log(err)),

  user: async (_, { username }) =>
    await db.users
      .findOne({ username: username })
      .then((res) => res)
      .catch((err) => console.log(err)),

  login: async (_, { username, password }) => {
    const user = await db.users.findOne({ username: username });
    const isValidPassword = await bcrypt
      .compare(password, user.password)
      .then((res) => res);
    if (username === user.username && isValidPassword) {
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
  createUser: async (_, { data }) => {
    const newId = ObjectId();
    await db.users.insert({
      _id: newId,
      email: data.email,
      username: data.username,
      password: await bcrypt.hash(data.password, 10).then((res) => res),
      role: data.role,
    });
    return await db.users
      .findOne({ _id: newId })
      .then((res) => res)
      .catch((err) => console.log(err));
  },

  updateUser: async (_, { id, data }) =>
    await db.users
      .findAndModify({
        query: { _id: ObjectId(id) },
        update: {
          email: data.email,
          username: data.username,
          password: await bcrypt.hash(data.password, 10).then((res) => res),
          role: data.role,
        },
        new: true,
      })
      .then((res) => res)
      .catch((err) => console.log(err)),

  deleteUser: async (_, { id }) =>
    await db.users
      .findAndModify({
        query: { _id: ObjectId(id) },
        remove: true,
      })
      .then((res) => res)
      .catch((err) => console.log(err)),
};

export { userQueries, userMutations };
