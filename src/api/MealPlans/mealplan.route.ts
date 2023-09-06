import { API_METHODS } from "../../interface/api.interface";
import { IRouteOptions } from "../../interface/fastify.interface";
import { jwtVerification } from "../../prehandlers/auth.prehandler";
import { createMealPlan, getMealPlan } from "./mealplan.controller";

const mealPlanRoutes: IRouteOptions<{
    Params: any;
    Body: any;
    Querystring: any;
  }>[] = [
    {
      url: "/createMealPlan",
      handler: createMealPlan,
      preHandler: [jwtVerification],
      method: API_METHODS.POST,
    },
    {
        url: "/getMealPlan",
        handler: getMealPlan,
        preHandler: [jwtVerification],
        method: API_METHODS.GET,
      },
    
  ];
  
  export default mealPlanRoutes;
  