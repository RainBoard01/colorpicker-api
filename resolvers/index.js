import { paletteQueries, paletteMutations } from "./paletteResolvers";
import { colorQueries, colorMutations } from "./colorResolvers";

const queries = {
  Query: {
    ...paletteQueries,
    ...colorQueries,
  },
};

const mutations = {
  Mutation: {
    ...paletteMutations,
    ...colorMutations,
  },
};

export default {
  ...queries,
  ...mutations,
};
