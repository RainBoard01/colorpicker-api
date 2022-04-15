import { colorTypes, colorQueries, colorMutations } from "./color";
import { paletteTypes, paletteQueries, paletteMutations } from "./palette";

const directives = `
directive @embedded on OBJECT
directive @collection(name: String!) on OBJECT
directive @index(name: String!) on FIELD_DEFINITION
directive @resolver(
	name: String
  	paginated: Boolean! = false
) on FIELD_DEFINITION
directive @relation(name: String) on FIELD_DEFINITION
directive @unique(index: String) on FIELD_DEFINITION

scalar Date
scalar Time
scalar Long
`;
const types = colorTypes + paletteTypes;
const queries = `type Query {${
  colorQueries.slice(12, -3) + paletteQueries.slice(12, -3)
}}
`;
const mutations = `type Mutation {${
  colorMutations.slice(15, -3) + paletteMutations.slice(15, -3)
}}
`;

const schema = directives + types + queries + mutations;

export default schema;
