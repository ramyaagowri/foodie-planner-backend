import { API_METHODS } from "../../interface/api.interface";
import { IRouteOptions } from "../../interface/fastify.interface";
import { jwtVerification } from "../../prehandlers/auth.prehandler";
import {authHandler, getProfile, googleOauth, googleUrl } from "./Auth.controller";

const authRoutes: IRouteOptions<{
  Params: any;
  Body: any;
  Querystring: any;
}>[] = [
  {
    url: "/signup",
    handler: authHandler,
    preHandler: [],
    method: API_METHODS.POST,
  },
  {
    url: "/googleUrl",
    handler: googleUrl,
    preHandler: [],
    method: API_METHODS.POST,
  },
  {
    url:"/googleOauth",
    handler:googleOauth,
    preHandler:[],
    method:API_METHODS.POST
  },
  {
    url:"/getProfile",
    handler:getProfile,
    preHandler:[jwtVerification],
    method:API_METHODS.GET
  }
];

export default authRoutes;
