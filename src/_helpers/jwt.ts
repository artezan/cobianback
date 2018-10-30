import * as expressJwt from "express-jwt";
import { config } from "../config";

export function jwt() {
  const { secret } = config;
  return expressJwt({ secret }).unless({
    path: [
      // public routes that don't require authentication
      "/api/v1/usersession/",
      "/api/v1/buyer/checkbuyer/",
      "/api/v1/buyer/",
      "/api/v1/administrator/",
      "/api/v1/mail/add/",
      "/api/v1/mail/find/",
    ],
  });
}
