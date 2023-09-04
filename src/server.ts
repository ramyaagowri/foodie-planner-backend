import server from "./app";
import dotenv from "dotenv";
import path from "path";
import Autoload from "@fastify/autoload";
import cors from "@fastify/cors";
// import { jwtVerification } from "./preHandlers/preAuth";

const envPath = path.resolve(__dirname, ".././.env");
const result = dotenv.config({ path: envPath });
const buildServer = server();
async function main() {
  try {
    console.log("Listening to " + process.env.port);
    await buildServer.listen({
      port: Number(process.env.port),
      host: "0.0.0.0",
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
