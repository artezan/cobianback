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
const Buyer_1 = require("../models/Buyer");
const Property_1 = require("../models/Property");
class PropertyLogic {
    //   Buyer.findByIdAndUpdate(buyerId, {property: propertiesMatch});
    matchSearchByBuyerId(buyerId, percentage) {
        return __awaiter(this, void 0, void 0, function* () {
            const promise = new Promise((resolve, reject) => {
                try {
                    Buyer_1.default.findById(buyerId).then((buyer) => __awaiter(this, void 0, void 0, function* () {
                        const arrProperty = yield this.resultOfProperty(buyer, percentage);
                        resolve(arrProperty);
                    }));
                }
                catch (error) {
                    // error
                }
            });
            const result = yield promise;
            return result;
        });
    }
    resultOfProperty(buyer, percentage) {
        return __awaiter(this, void 0, void 0, function* () {
            const promise = new Promise((resolve, reject) => {
                try {
                    Property_1.default.find()
                        .then(properties => {
                        const propertiesMatch = [];
                        properties.forEach(property => {
                            let sumTotal = 0;
                            let items = 17;
                            if (buyer.isRenter === property.isRent) {
                                sumTotal++;
                            }
                            if (buyer.typeOfProperty.toLocaleLowerCase().trim() ===
                                property.typeOfProperty.toLocaleLowerCase().trim()) {
                                sumTotal++;
                            }
                            if (buyer.space <= property.space) {
                                sumTotal++;
                            }
                            if (buyer.dateToBuy === property.dateToBuy) {
                                sumTotal++;
                            }
                            if (buyer.zone.toLocaleLowerCase().trim() ===
                                property.zone.toLocaleLowerCase().trim()) {
                                sumTotal++;
                            }
                            if (buyer.minPrice >= property.minPrice) {
                                sumTotal++;
                            }
                            if (buyer.maxPrice >= property.maxPrice) {
                                sumTotal++;
                            }
                            if (buyer.numRooms === property.numRooms) {
                                sumTotal++;
                            }
                            if (buyer.numCars <= property.numCars) {
                                sumTotal++;
                            }
                            if (buyer.isOld === property.isOld) {
                                sumTotal++;
                            }
                            if (buyer.isClose === property.isClose) {
                                sumTotal++;
                            }
                            if (buyer.numBathrooms <= property.numBathrooms) {
                                sumTotal++;
                            }
                            if (buyer.hasGarden === property.hasGarden) {
                                sumTotal++;
                            }
                            if (buyer.isLowLevel === property.isLowLevel) {
                                sumTotal++;
                            }
                            if (buyer.hasElevator === property.hasElevator) {
                                sumTotal++;
                            }
                            if (buyer.allServices === property.allServices) {
                                sumTotal++;
                            }
                            if (buyer.wayToBuy.toLocaleLowerCase().trim() ===
                                property.wayToBuy.toLocaleLowerCase().trim()) {
                                sumTotal++;
                            }
                            if (buyer.tag.length !== 0 && property.tag.length !== 0) {
                                buyer.tag.forEach(tag => {
                                    items++;
                                    const isFind = property.tag.find(t => t.toLocaleLowerCase().trim() ===
                                        tag.toLocaleLowerCase().trim());
                                    if (isFind) {
                                        sumTotal++;
                                    }
                                });
                            }
                            const avr = (sumTotal / items) * 100;
                            console.log(avr);
                            console.log(sumTotal);
                            console.log(items);
                            if (avr >= percentage) {
                                propertiesMatch.push(property);
                            }
                        });
                        // end foreach
                        resolve(propertiesMatch);
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
PropertyLogic.Instance = function () {
    if (this._instance) {
        return this._instance;
    }
    else {
        return (this._instance = new this());
    }
};
exports.PropertyLogic = PropertyLogic;
//# sourceMappingURL=PropertyLogic.js.map