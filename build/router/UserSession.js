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
const Maker_1 = require("../models/Maker");
const Office_1 = require("../models/Office");
const jwt = require("jsonwebtoken");
const PreBuyer_1 = require("../models/PreBuyer");
class UserSession {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    byPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const strDecode = base64.decode(req.body.base64);
            const email = strDecode.substring(0, strDecode.indexOf(":"));
            const password = strDecode.substring(strDecode.indexOf(":") + 1, strDecode.length);
            // crea promise con respuesta si encuentra o no
            const promise = new Promise((resolve, reject) => {
                // busca la info
                try {
                    //   admin
                    Administrator_1.default.find({ password: password, email: email })
                        .then(data => {
                        if (data.length > 0) {
                            resolve({ data: data, type: "administrator" });
                        }
                        else {
                            //   buyer
                            Buyer_1.default.find({ password: password, email: email })
                                .then(data => {
                                if (data.length > 0) {
                                    resolve({ data: data, type: "buyer" });
                                }
                                else {
                                    Seller_1.default.find({ password: password, email: email })
                                        .then(data => {
                                        if (data.length > 0) {
                                            resolve({ data: data, type: "seller" });
                                        }
                                        else {
                                            Adviser_1.default.find({ password: password, email: email })
                                                .then(data => {
                                                if (data.length > 0) {
                                                    resolve({ data: data, type: "adviser" });
                                                }
                                                else {
                                                    // resolve("error");
                                                    Management_1.default.find({
                                                        password: password,
                                                        email: email
                                                    })
                                                        .then(data => {
                                                        if (data.length > 0) {
                                                            resolve({
                                                                data: data,
                                                                type: "management"
                                                            });
                                                        }
                                                        else {
                                                            Maker_1.default.find({
                                                                password: password,
                                                                email: email
                                                            })
                                                                .then(data => {
                                                                if (data.length > 0) {
                                                                    resolve({
                                                                        data: data,
                                                                        type: "maker"
                                                                    });
                                                                }
                                                                else {
                                                                    Office_1.default.find({
                                                                        password: password,
                                                                        email: email
                                                                    })
                                                                        .then(data => {
                                                                        if (data.length > 0) {
                                                                            resolve({
                                                                                data: data,
                                                                                type: "office"
                                                                            });
                                                                        }
                                                                        else {
                                                                            PreBuyer_1.default.find({
                                                                                password: password,
                                                                                email: email
                                                                            })
                                                                                .then(data => {
                                                                                if (data.length > 0) {
                                                                                    resolve({
                                                                                        data: data,
                                                                                        type: "preBuyer"
                                                                                    });
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
                const token = jwt.sign({ sub: data.data.password }, "sss");
                const result = {
                    data: data.data,
                    type: data.type,
                    token: token
                };
                res.status(200).json({ data: result });
                // res.status(200).json({ data });
            }
        });
    }
    // set up our routes
    routes() {
        this.router.post("/", this.byPassword);
    }
}
exports.UserSession = UserSession;
//# sourceMappingURL=UserSession.js.map