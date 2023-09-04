import Fastify from "fastify";
import Autoload from "@fastify/autoload";
import cors from "@fastify/cors";
import path from "path";
import { jwtVerification } from "./prehandlers/auth.prehandler";
function server() {
  const fastify = Fastify();
  fastify.register(cors, {
    origin: ["*"],
    credentials: true,
  });
  // fastify.register(fastifyXLSX);
  fastify.decorate("jwtVerification", jwtVerification);

  fastify.register(Autoload, {
    dir: path.join(__dirname, "api"),
    options: { prefix: "/foodie-planner" },
  });
  return fastify;
}
export default server;
