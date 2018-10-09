"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SellerSchema = new mongoose_1.Schema({
    city: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    lastName: {
        type: String,
    },
    isRenter: {
        type: Boolean,
    },
    /**
     * Propiedades
     */
    property: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Property",
            default: [],
        },
    ],
    /**
     * Calendario
     */
    schedule: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Schedule",
            default: [],
        },
    ],
    /**
     * Notificaciones guardadas
     */
    notification: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Notification",
            default: [],
        },
    ],
    email: {
        type: String,
        required: true,
    },
});
exports.default = mongoose_1.model("Seller", SellerSchema);
//# sourceMappingURL=Seller.js.map