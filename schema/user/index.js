import { readFileSync } from "fs";
import { resolve } from "path";

const userTypes = readFileSync(resolve("./schema/user/types.gql")).toString(
  "utf-8"
);

const userQueries = readFileSync(resolve("./schema/user/queries.gql")).toString(
  "utf-8"
);

const userMutations = readFileSync(
  resolve("./schema/user/mutations.gql")
).toString("utf-8");

export { userTypes, userQueries, userMutations };
