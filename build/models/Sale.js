"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ScheduleSchema = new mongoose_1.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    /**
     *  propiedad
     */
    property: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Property",
    },
    /**
     * Comprador
     */
    buyer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Buyer",
    },
    /**
     *  Asesor
     */
    adviser: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Adviser",
    },
    /**
     *  Vendedor
     */
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Seller",
    },
    /**
     * Notas
     */
    note: {
        type: String,
    },
    price: {
        type: Number,
    },
    isRent: {
        type: Boolean,
    },
});
exports.default = mongoose_1.model("Sale", ScheduleSchema);
//# sourceMappingURL=Sale.js.map