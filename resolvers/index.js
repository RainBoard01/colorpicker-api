import { paletteQueries, paletteMutations } from "./paletteResolvers";
import { colorQueries, colorMutations } from "./colorResolvers";
import { userQueries } from "./userResolvers";

const queries = {
  Query: {
    ...paletteQueries,
    ...colorQueries,
    ...userQueries,
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
