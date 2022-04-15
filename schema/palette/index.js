import { readFileSync } from "fs";
import { resolve } from "path";

const paletteTypes = readFileSync(
  resolve("./schema/palette/types.gql")
).toString("utf-8");

const paletteQueries = readFileSync(
  resolve("./schema/palette/queries.gql")
).toString("utf-8");

const paletteMutations = readFileSync(
  resolve("./schema/palette/mutations.gql")
).toString("utf-8");

export { paletteTypes, paletteQueries, paletteMutations };
