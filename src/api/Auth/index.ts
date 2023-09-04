import { FastifyInstance } from "fastify";
import authRoutes from "../Auth/Auth.routes";

export default async (fastify: FastifyInstance) => {
  for (const authRoute of authRoutes) {
    fastify.route(authRoute);
  }
};
