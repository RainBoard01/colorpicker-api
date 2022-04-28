import { ObjectId } from "mongoist";
import db from "../db";

const paletteQueries = {
  allPalettes: async (_, { username }) =>
    username
      ? await db.palettes
          .aggregate([
            {
              $lookup: {
                from: "colors",
                localField: "_id",
                foreignField: "palette",
                as: "colors",
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $unwind: "$user",
            },
            {
              $match: {
                "user.username": username,
              },
            },
          ])
          .then((res) => res)
          .catch((err) => console.log(err))
      : await db.palettes
          .aggregate([
            {
              $lookup: {
                from: "colors",
                localField: "_id",
                foreignField: "palette",
                as: "colors",
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user",
              },
            },
          ])
          .then((res) => res)
          .catch((err) => console.log(err)),
  findPaletteByID: async (root, { id }) =>
    await db.palettes
      .findOne({ id: id })
      .then((res) => res)
      .catch((err) => console.log(err)),
};

const paletteMutations = {
  createPalette: async (root, newPalette) => {
    const newId = ObjectId();
    await db.palettes.insert({
      _id: newId,
      paletteName: newPalette.data.paletteName,
      id: newPalette.data.id,
      emoji: newPalette.data.emoji,
    });
    const colorsWPaletteID = newPalette.data.colors.create;
    colorsWPaletteID.map((color) => (color.palette = newId));
    await db.colors.insert(colorsWPaletteID);
    return await db.palettes
      .findOne({ _id: newId })
      .then((res) => res)
      .catch((err) => console.log(err));
  },
  updatePalette: async (root, id, newPalette) =>
    await db.palettes
      .findAndModify({
        query: { _id: Object(id.id) },
        update: {
          paletteName: newPalette.data.paletteName,
          id: newPalette.data.id,
          emoji: newPalette.data.emoji,
          colors: newPalette.data.colors,
        },
        new: true,
      })
      .then((res) => res)
      .catch((err) => console.log(err)),
  deletePalette: async (root, id) => {
    await db.colors.remove({ palette: ObjectId(id.id) });
    return await db.palettes
      .findAndModify({ query: { _id: ObjectId(id.id) }, remove: true })
      .then((res) => res)
      .catch((err) => console.log(err));
  },
};

export { paletteQueries, paletteMutations };
