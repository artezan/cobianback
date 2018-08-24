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
const Customer_1 = require("../models/Customer");
const mongodb_1 = require("mongodb");
const base64 = require("base-64");
class CustmersLogic {
    checkCustomer(base64Input) {
        return __awaiter(this, void 0, void 0, function* () {
            const strDecode = base64.decode(base64Input);
            const name = strDecode.substring(0, strDecode.indexOf(":"));
            const password = strDecode.substring(strDecode.indexOf(":") + 1, strDecode.length);
            const promise = new Promise((resolve, reject) => {
                // busca la info
                try {
                    Customer_1.default.find({ password: password, name: name })
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
    addTicketToCustomer(ticket, customertId) {
        Customer_1.default.findById(customertId)
            .populate("tickets")
            .then((customer) => {
            const indexFind = customer.tickets.findIndex(t => new mongodb_1.ObjectId(t._id).toString() ===
                new mongodb_1.ObjectId(ticket._id).toString());
            if (indexFind === -1) {
                customer.tickets.push(ticket);
            }
            else {
                customer.tickets.splice(indexFind, 1);
                customer.tickets.push(ticket);
            }
            customer.save().then(() => {
                this.calculateTotalHours(customer._id);
            });
        })
            .catch();
    }
    changeTicketToCustomer(ticket, newCustomerId, oldCustomerId) {
        // eliminar del viejo
        Customer_1.default.findById(oldCustomerId)
            .populate("tickets")
            .then((oldCustomer) => {
            const indexFind = oldCustomer.tickets.findIndex(t => new mongodb_1.ObjectId(t._id).toString() ===
                new mongodb_1.ObjectId(ticket._id).toString());
            if (indexFind !== -1) {
                oldCustomer.tickets.splice(indexFind, 1);
                oldCustomer.save().then(() => {
                    this.calculateTotalHours(oldCustomer._id);
                });
            }
        })
            .catch();
        // add al neuvo
        Customer_1.default.findById(newCustomerId)
            .populate("tickets")
            .then((newCustomer) => {
            const indexFind = newCustomer.tickets.findIndex(t => new mongodb_1.ObjectId(t._id).toString() ===
                new mongodb_1.ObjectId(ticket._id).toString());
            if (indexFind === -1) {
                newCustomer.tickets.push(ticket);
                newCustomer.save().then(() => {
                    this.calculateTotalHours(newCustomer._id);
                });
            }
        })
            .catch();
    }
    removeTicket(ticketId) {
        Customer_1.default.find()
            .populate("tickets")
            .then(customers => {
            customers.forEach(customer => {
                const indexFind = customer.tickets.findIndex(t => new mongodb_1.ObjectId(t._id).toString() === ticketId);
                if (indexFind !== -1) {
                    customer.tickets.splice(indexFind, 1);
                    customer.save().then(() => {
                        this.calculateTotalHours(customer._id);
                    });
                }
            });
        });
    }
    calculateTotalHours(customerId) {
        Customer_1.default.findById(customerId)
            .populate("tickets")
            .then(customer => {
            let sumTotalHours = 0;
            if (customer.tickets.length > 0) {
                customer.tickets.forEach(t => {
                    sumTotalHours += t.hours;
                });
                customer.totalHours = sumTotalHours;
            }
            else {
                customer.totalHours = 0;
            }
            customer.save();
        });
    }
}
CustmersLogic.Instance = function () {
    if (this._instance) {
        return this._instance;
    }
    else {
        return (this._instance = new this());
    }
};
exports.CustmersLogic = CustmersLogic;
//# sourceMappingURL=CustumersLogic.js.map