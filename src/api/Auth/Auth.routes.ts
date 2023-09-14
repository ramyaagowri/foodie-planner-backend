import { API_METHODS } from "../../interface/api.interface";
import { IRouteOptions } from "../../interface/fastify.interface";
import { jwtVerification } from "../../prehandlers/auth.prehandler";
import { fileUpload } from "../../prehandlers/multerStorage";
import {authHandler, getProfile, googleOauth, googleUrl, updateProfile, updateProfilePic } from "./Auth.controller";

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
  },
  {
    url:"/updateProfile",
    handler:updateProfile,
    preHandler:[jwtVerification],
    method:API_METHODS.POST
  },
  {
    url:"/updateProfilePic",
    handler:updateProfilePic,
    preHandler:[jwtVerification,fileUpload],
    method:API_METHODS.POST
  }
];

export default authRoutes;