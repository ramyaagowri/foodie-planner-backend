import { API_METHODS } from "../../interface/api.interface";
import { IRouteOptions } from "../../interface/fastify.interface";
import { jwtVerification } from "../../prehandlers/auth.prehandler";
import { fileUpload } from "../../prehandlers/multerStorage";
import {
  authHandler,
  follow,
  getFollowing,
  getProfile,
  googleOauth,
  googleUrl,
  unfollow,
  updateProfile,
  updateProfilePic,
} from "./Auth.controller";

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
    url: "/googleOauth",
    handler: googleOauth,
    preHandler: [],
    method: API_METHODS.POST,
  },
  {
    url: "/getProfile/:id",
    handler: getProfile,
    preHandler: [jwtVerification],
    method: API_METHODS.GET,
  },
  {
    url: "/updateProfile",
    handler: updateProfile,
    preHandler: [jwtVerification],
    method: API_METHODS.POST,
  },
  {
    url: "/updateProfilePic",
    handler: updateProfilePic,
    preHandler: [jwtVerification, fileUpload],
    method: API_METHODS.POST,
  },
  {
    url: "/follow/:id",
    handler: follow,
    preHandler: [jwtVerification],
    method: API_METHODS.GET,
  },
  {
    url: "/unfollow/:id",
    handler: unfollow,
    preHandler: [jwtVerification],
    method: API_METHODS.GET,
  },
  {
    url: "/getFollowing",
    handler: getFollowing,
    preHandler: [jwtVerification],
    method: API_METHODS.GET,
  },
];

export default authRoutes;
