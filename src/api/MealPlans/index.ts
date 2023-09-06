import { FastifyInstance } from "fastify";
import mealPlanRoutes from "./mealplan.route";

export default async (fastify: FastifyInstance) => {
  for (const authRoute of mealPlanRoutes) {
    fastify.route(authRoute);
  }
};
