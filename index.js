import Fastify from "fastify";
import mercurius from "mercurius";
import schema from "./schema";
import resolvers from "./resolvers";

const fastify = Fastify({
  logger: true,
});

fastify.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
});

fastify.get("/", async function (req, reply) {
  return reply.send("GraphQL Server Fastify-Mercurius");
});

fastify.listen(3001, "0.0.0.0");
