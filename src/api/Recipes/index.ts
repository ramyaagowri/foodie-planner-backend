import { FastifyInstance } from "fastify";
import recipeRoutes from "./recipes.routes";

export default async (fastify: FastifyInstance) => {
  for (const authRoute of recipeRoutes) {
    fastify.route(authRoute);
  }
};
