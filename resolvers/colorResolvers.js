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

  findColorByID: async (root, id) =>
    await db.colors
      .findOne({ _id: ObjectId(id.id) })
      .then((res) => res)
      .catch((err) => console.log(err)),
};

const colorMutations = {
  createColor: async (root, newColor) => {
    const newId = ObjectId();
    await db.colors.insert({
      _id: newId,
      name: newColor.data.name,
      color: newColor.data.color,
      palette: ObjectId(newColor.data.palette),
    });
    return await db.colors
      .findOne({ _id: newId })
      .then((res) => res)
      .catch((err) => console.log(err));
  },

  updateColor: async (root, id, newColor) =>
    await db.colors
      .findAndModify({
        query: { _id: ObjectId(id.id) },
        update: {
          name: newColor.data.name,
          color: newColor.data.color,
          palette: ObjectId(newColor.data.palette),
        },
        new: true,
      })
      .then((res) => res)
      .catch((err) => console.log(err)),
};

export { colorQueries, colorMutations };
