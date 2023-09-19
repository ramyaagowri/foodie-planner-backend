import { API_METHODS } from "../../interface/api.interface";
import { IRouteOptions } from "../../interface/fastify.interface";
import { jwtVerification } from "../../prehandlers/auth.prehandler";
import { fileUpload } from "../../prehandlers/multerStorage";
import upload from "../../utils/multer";
import { getAllRecipe } from "../Auth/Auth.controller";
import RecipeController from "./recipies.controller";
const recipeController = new RecipeController();
const recipeRoutes: IRouteOptions<{
  Params: any;
  Body: any;
  Querystring: any;
}>[] = [
  {
    url: "/create-recipe",
    handler: recipeController.generateRecipe,
    preHandler: [jwtVerification],
    method: API_METHODS.POST,
  },
  {
    url: "/saveRecipe",
    handler: recipeController.saveRecipe,
    preHandler: [jwtVerification],
    method: API_METHODS.POST,
  },
  {
    url: "/getSavedRecipe",
    handler: recipeController.getUserRecipe,
    preHandler: [jwtVerification],
    method: API_METHODS.GET,
  },
  {
    url: "/getAllRecipe",
    handler: recipeController.getAllRecipe,
    preHandler: [],
    method: API_METHODS.GET,
  },
  {
    url: "/randomRecipe",
    handler: recipeController.getRandomRecipe,
    preHandler: [],
    method: API_METHODS.GET,
  },
  {
    url: "/getDetails/:id",
    handler: recipeController.getDetails,
    preHandler: [],
    method: API_METHODS.GET,
  },
  {
    url: "/fileUpload/:recipeId",
    handler: recipeController.imageUpload,
    preHandler: [jwtVerification, fileUpload],
    method: API_METHODS.POST,
  },
  {
    url: "/getIngredients/:recipeId",
    handler: recipeController.getIngredients,
    preHandler: [],
    method: API_METHODS.GET,
  },
  {
    url: "/delete/:recipeId",
    handler: recipeController.deleteRecipe,
    preHandler: [],
    method: API_METHODS.DELETE,
  },
  // {
  //   url: "/isSaved",
  //   handler: recipeController.isSaved,
  //   preHandler: [],
  //   method: API_METHODS.DELETE,
  // },
];

export default recipeRoutes;
