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
const Consultant_1 = require("../models/Consultant");
const mongodb_1 = require("mongodb");
const base64 = require("base-64");
class ConsultantsLogic {
    // base64 nombre:pass
    checkConsultant(base64Input) {
        return __awaiter(this, void 0, void 0, function* () {
            const strDecode = base64.decode(base64Input);
            const name = strDecode.substring(0, strDecode.indexOf(":"));
            const password = strDecode.substring(strDecode.indexOf(":") + 1, strDecode.length);
            // crea promise con respuesta si encuentra o no
            const promise = new Promise((resolve, reject) => {
                // busca la info
                try {
                    Consultant_1.default.find({ password: password, name: name })
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
    addTicketToConsultant(ticket, consultantId) {
        Consultant_1.default.findById(consultantId)
            .populate("tickets")
            .then((consultant) => {
            const indexFind = consultant.tickets.findIndex(t => new mongodb_1.ObjectId(t._id).toString() ===
                new mongodb_1.ObjectId(ticket._id).toString());
            if (indexFind === -1) {
                consultant.tickets.push(ticket);
            }
            else {
                consultant.tickets.splice(indexFind, 1);
                consultant.tickets.push(ticket);
            }
            consultant.save().then(() => {
                this.calculateAvgRating(consultant._id);
            });
        })
            .catch();
    }
    changeTicketToConsultant(ticket, newConsultantId, oldConsultantId) {
        // eliminar del viejo
        Consultant_1.default.findById(oldConsultantId)
            .populate("tickets")
            .then((oldConsultant) => {
            const indexFind = oldConsultant.tickets.findIndex(t => new mongodb_1.ObjectId(t._id).toString() ===
                new mongodb_1.ObjectId(ticket._id).toString());
            if (indexFind !== -1) {
                oldConsultant.tickets.splice(indexFind, 1);
                oldConsultant.save().then(() => {
                    this.calculateAvgRating(oldConsultant._id);
                });
            }
        })
            .catch();
        // add al nuevo
        Consultant_1.default.findById(newConsultantId)
            .populate("tickets")
            .then((newConsultant) => {
            const indexFind = newConsultant.tickets.findIndex(t => new mongodb_1.ObjectId(t._id).toString() ===
                new mongodb_1.ObjectId(ticket._id).toString());
            if (indexFind === -1) {
                newConsultant.tickets.push(ticket);
                newConsultant.save().then(() => {
                    this.calculateAvgRating(newConsultant._id);
                });
            }
        })
            .catch();
    }
    removeTicket(ticketId) {
        Consultant_1.default.find()
            .populate("tickets")
            .then(consultants => {
            consultants.forEach(consultant => {
                const indexFind = consultant.tickets.findIndex(t => new mongodb_1.ObjectId(t._id).toString() === ticketId);
                if (indexFind !== -1) {
                    consultant.tickets.splice(indexFind, 1);
                    consultant.save().then(() => {
                        this.calculateAvgRating(consultant._id);
                    });
                }
            });
        });
    }
    calculateAvgRating(consultantId) {
        Consultant_1.default.findById(consultantId)
            .populate("tickets")
            .then(consultant => {
            let sumTotalRanking = 0;
            if (consultant.tickets.length > 0) {
                consultant.tickets.forEach(t => {
                    sumTotalRanking += t.ranking;
                });
                if (sumTotalRanking > 0) {
                    consultant.rankingAverage =
                        sumTotalRanking / consultant.tickets.length;
                }
                else {
                }
                consultant.save();
            }
            else if (consultant.tickets.length === 0) {
                consultant.rankingAverage = 0;
                consultant.save();
            }
        });
    }
    calculateAvgRatingById(ticketId) {
        Consultant_1.default.find()
            .populate("tickets")
            .then(consultants => {
            consultants.forEach(consultant => {
                const indexFind = consultant.tickets.findIndex(t => new mongodb_1.ObjectId(t._id).toString() === ticketId);
                if (indexFind !== -1) {
                    this.calculateAvgRating(consultant._id);
                }
            });
        });
    }
}
ConsultantsLogic.Instance = function () {
    if (this._instance) {
        return this._instance;
    }
    else {
        return (this._instance = new this());
    }
};
exports.ConsultantsLogic = ConsultantsLogic;
//# sourceMappingURL=ConsultantsLogic.js.map