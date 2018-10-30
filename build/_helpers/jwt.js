"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expressJwt = require("express-jwt");
const config_1 = require("../config");
function jwt() {
    const { secret } = config_1.config;
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
exports.jwt = jwt;
//# sourceMappingURL=jwt.js.map