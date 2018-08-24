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
const base64 = require("base-64");
const Company_1 = require("../models/Company");
class CompaniesLogic {
    // base64 nombre:pass
    checkCompany(base64Input) {
        return __awaiter(this, void 0, void 0, function* () {
            const strDecode = base64.decode(base64Input);
            const name = strDecode.substring(0, strDecode.indexOf(":"));
            const password = strDecode.substring(strDecode.indexOf(":") + 1, strDecode.length);
            // crea promise con respuesta si encuentra o no
            const promise = new Promise((resolve, reject) => {
                // busca la info
                try {
                    Company_1.default.find({ password: password, name: name })
                        .then(data => {
                        if (data.length > 0) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    })
                        .catch(error => { });
                }
                catch (error) {
                    // error
                }
            });
            const result = yield promise;
            return result;
        });
    }
}
CompaniesLogic.Instance = function () {
    if (this._instance) {
        return this._instance;
    }
    else {
        return (this._instance = new this());
    }
};
exports.CompaniesLogic = CompaniesLogic;
//# sourceMappingURL=CompaniesLogic.js.map