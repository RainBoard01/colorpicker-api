import { paletteQueries, paletteMutations } from "./paletteResolvers";
import { colorQueries, colorMutations } from "./colorResolvers";
import { userQueries, userMutations } from "./userResolvers";

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
    ...userMutations,
  },
};

export default {
  ...queries,
  ...mutations,
};
