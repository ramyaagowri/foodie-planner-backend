import Fastify from "fastify";
import Autoload from "@fastify/autoload";
import cors from "@fastify/cors";
import path from "path";
import { jwtVerification } from "./prehandlers/auth.prehandler";
import multipart from "@fastify/multipart";
// import fastifyMulter from "fastify-multer";

function server() {
  const fastify = Fastify();
  fastify.register(require("@fastify/formbody"));
  fastify.register(cors, {
    origin: ["*"],
    credentials: true,
  });
  // fastify.register(fastifyXLSX);
  fastify.decorate("jwtVerification", jwtVerification);
  fastify.register(multipart);
  // fastify.register(fastifyMulter.contentParser);
  fastify.register(Autoload, {
    dir: path.join(__dirname, "api"),
    options: { prefix: "/foodie-planner" },
  });
  return fastify;
}
export default server;
