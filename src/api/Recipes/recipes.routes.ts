import { API_METHODS } from "../../interface/api.interface";
import { IRouteOptions } from "../../interface/fastify.interface";
import { jwtVerification } from "../../prehandlers/auth.prehandler";
import { generateRecipe, getUserRecipe, saveRecipe } from "./recipies.controller";



const recipeRoutes: IRouteOptions<{
    Params: any;
    Body: any;
    Querystring: any;
  }>[] = [
    {
      url: "/createRecipe",
      handler: generateRecipe,
      preHandler: [jwtVerification],
      method: API_METHODS.POST,
    },
    {
      url: "/saveRecipe",
      handler: saveRecipe,
      preHandler: [jwtVerification],
      method: API_METHODS.POST,
    },
    {
      url: "/getSavedRecipe",
      handler: getUserRecipe,
      preHandler: [jwtVerification],
      method: API_METHODS.GET,
    },
    
  ];
  
  export default recipeRoutes;
  