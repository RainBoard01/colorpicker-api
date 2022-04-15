import { readFileSync } from "fs";
import { resolve } from "path";

const colorTypes = readFileSync(resolve("./schema/color/types.gql")).toString(
  "utf-8"
);

const colorQueries = readFileSync(
  resolve("./schema/color/queries.gql")
).toString("utf-8");

const colorMutations = readFileSync(
  resolve("./schema/color/mutations.gql")
).toString("utf-8");

export { colorTypes, colorQueries, colorMutations };
