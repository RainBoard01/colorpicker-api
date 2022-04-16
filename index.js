import Fastify from "fastify";
import mercurius from "mercurius";
import schema from "./schema";
import resolvers from "./resolvers";
import fastifyCors from "fastify-cors";

const fastify = Fastify({
  logger: true,
});

fastify.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
});

fastify.register(fastifyCors, {
  origin: false,
});

fastify.listen(3001, "0.0.0.0");
