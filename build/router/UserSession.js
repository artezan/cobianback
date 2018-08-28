"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const base64 = require("base-64");
const Seller_1 = require("../models/Seller");
const Buyer_1 = require("../models/Buyer");
const Administrator_1 = require("../models/Administrator");
const Adviser_1 = require("../models/Adviser");
const Management_1 = require("../models/Management");
class UserSession {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    byPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const strDecode = base64.decode(req.params.base64);
            const name = strDecode.substring(0, strDecode.indexOf(":"));
            const password = strDecode.substring(strDecode.indexOf(":") + 1, strDecode.length);
            // crea promise con respuesta si encuentra o no
            const promise = new Promise((resolve, reject) => {
                // busca la info
                try {
                    //   admin
                    Administrator_1.default.find({ password: password, name: name })
                        .then(data => {
                        if (data.length > 0) {
                            resolve("administrator");
                        }
                        else {
                            //   buyer
                            Buyer_1.default.find({ password: password, name: name })
                                .then(data => {
                                if (data.length > 0) {
                                    resolve("buyer");
                                }
                                else {
                                    Seller_1.default.find({ password: password, name: name })
                                        .then(data => {
                                        if (data.length > 0) {
                                            resolve("seller");
                                        }
                                        else {
                                            Adviser_1.default.find({ password: password, name: name })
                                                .then(data => {
                                                if (data.length > 0) {
                                                    resolve("adviser");
                                                }
                                                else {
                                                    // resolve("error");
                                                    Management_1.default.find({
                                                        password: password,
                                                        name: name,
                                                    })
                                                        .then(data => {
                                                        if (data.length > 0) {
                                                            resolve("management");
                                                        }
                                                        else {
                                                            resolve("error");
                                                        }
                                                    })
                                                        .catch(error => { });
                                                }
                                            })
                                                .catch(error => { });
                                        }
                                    })
                                        .catch(error => { });
                                }
                            })
                                .catch(error => { });
                        }
                    })
                        .catch(error => { });
                }
                catch (error) {
                    console.log("error");
                }
            });
            const data = yield promise;
            if (data === "error") {
                res.status(200).json({ data: "error" });
            }
            else {
                res.status(200).json({ data });
            }
        });
    }
    // set up our routes
    routes() {
        this.router.get("/:base64", this.byPassword);
    }
}
exports.UserSession = UserSession;
//# sourceMappingURL=UserSession.js.map