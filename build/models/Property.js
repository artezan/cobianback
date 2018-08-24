"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PropertySchema = new mongoose_1.Schema({
    isRent: {
        type: Boolean,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    /**
     * tipo de propiedad
     */
    typeOfProperty: {
        type: String,
    },
    /**
     * forma de compra
     */
    wayToBuy: [
        {
            type: String,
            default: [],
        },
    ],
    dateToBuy: {
        type: String,
    },
    /**
     * costo minimo
     */
    minPrice: {
        type: Number,
        default: 0,
    },
    /**
     * costo maximo
     */
    maxPrice: {
        type: Number,
        default: 0,
    },
    tag: [
        {
            type: String,
        },
    ],
    /**
     * num de Visitas
     */
    numVisit: {
        type: Number,
        default: 0,
    },
});
exports.default = mongoose_1.model("Property", PropertySchema);
//# sourceMappingURL=Property.js.map