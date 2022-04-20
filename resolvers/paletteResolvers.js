import { ObjectId } from "mongoist";
import db from "../db";

const paletteQueries = {
  allPalettes: async () =>
    await db.palettes
      .aggregate([
        {
          $lookup: {
            from: "colors",
            localField: "_id",
            foreignField: "palette",
            as: "colors",
          },
        },
      ])
      .then((res) => res)
      .catch((err) => console.log(err)),

  findPaletteByID: async (_, { id }) =>
    await db.palettes
      .findOne({ _id: ObjectId(id) })
      .then((res) => res)
      .catch((err) => console.log(err)),
};

const paletteMutations = {
  createPalette: async (_, { data }) => {
    const newId = ObjectId();
    await db.palettes.insert({
      _id: newId,
      paletteName: data.paletteName,
      id: data.id,
      emoji: data.emoji,
    });
    const colorsWPaletteID = data.colors.create;
    colorsWPaletteID.map((color) => (color.palette = newId));
    await db.colors.insert(colorsWPaletteID);
    return await db.palettes
      .findOne({ _id: newId })
      .then((res) => res)
      .catch((err) => console.log(err));
  },

  updatePalette: async (_, { id, data }) =>
    await db.palettes
      .findAndModify({
        query: { _id: Object(id) },
        update: {
          paletteName: data.paletteName,
          id: data.id,
          emoji: data.emoji,
          colors: data.colors,
        },
        new: true,
      })
      .then((res) => res)
      .catch((err) => console.log(err)),

  deletePalette: async (_, { id }) => {
    await db.colors.remove({ palette: ObjectId(id) });
    return await db.palettes
      .findAndModify({
        query: { _id: ObjectId(id) },
        remove: true,
      })
      .then((res) => res)
      .catch((err) => console.log(err));
  },
};

export { paletteQueries, paletteMutations };
