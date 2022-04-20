import Fastify from "fastify";
import mercurius from "mercurius";
import mercuriusAuth from "mercurius-auth";
import schema from "./schema";
import resolvers from "./resolvers";
import fastifyCors from "fastify-cors";
import jwt from "jsonwebtoken";

const fastify = Fastify({ logger: true });

fastify
  .register(mercurius, {
    schema,
    resolvers,
    graphiql: true,
  })
  .register(fastifyCors, {
    origin: "*",
    methods: "GET,PUT,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,x-user",
  })
  .register(mercuriusAuth, {
    authContext(context) {
      return { identity: context.reply.request.headers["x-user"] };
    },
    async applyPolicy(authDirectiveAST, parent, args, context, info) {
      const token = context.auth.identity;
      try {
        const claim = jwt.verify(token, "awadeowo");
        const requiredRole = authDirectiveAST.arguments[0].value.value;
        if (
          claim.role === "ADMIN" ||
          (claim.role === "USER" && requiredRole === "USER") ||
          requiredRole === "GUEST"
        ) {
          return true;
        }
      } catch (error) {
        throw new Error(`An error occurred. Try again!`);
      }
    },
    authDirective: "auth",
  });

const start = async () => {
  try {
    await fastify.listen(3001, "0.0.0.0", () =>
      console.log("Server running on port 3001")
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
