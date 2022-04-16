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
  origin: "*",
  methods: "GET,PUT,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Accept",
});

fastify.listen(3001, "0.0.0.0");
