import { ObjectId } from "mongoist";
import db from "../db";

const colorQueries = {
  allColors: async () =>
    await db.colors
      .aggregate([
        {
          $lookup: {
            from: "palettes",
            localField: "palette",
            foreignField: "_id",
            as: "palette",
          },
        },
      ])
      .then((res) => res)
      .catch((err) => console.log(err)),

  findColorByID: async (_, { id }) =>
    await db.colors
      .findOne({ _id: ObjectId(id) })
      .then((res) => res)
      .catch((err) => console.log(err)),
};

const colorMutations = {
  createColor: async (_, { data }) => {
    const newId = ObjectId();
    await db.colors.insert({
      _id: newId,
      name: data.name,
      color: data.color,
      palette: ObjectId(data.palette),
    });
    return await db.colors
      .findOne({ _id: newId })
      .then((res) => res)
      .catch((err) => console.log(err));
  },

  updateColor: async (_, { id, data }) =>
    await db.colors
      .findAndModify({
        query: { _id: ObjectId(id) },
        update: {
          name: data.name,
          color: data.color,
          palette: ObjectId(data.palette),
        },
        new: true,
      })
      .then((res) => res)
      .catch((err) => console.log(err)),
};

export { colorQueries, colorMutations };
