"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OfertSchema = new mongoose_1.Schema({
    buyer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Buyer",
    },
    /**
     * Propiedad
     */
    property: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Property",
    },
    /**
     * aceptadas, rechazadas o sigue en negociación.
     */
    status: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    notes: {
        type: String,
    },
    ofertPrice: {
        type: Number,
    },
    files: [
        {
            type: String,
            default: [],
        },
    ],
    isAccept: {
        type: Boolean,
    },
    notificationOneSignal: { type: String },
});
exports.default = mongoose_1.model("Ofert", OfertSchema);
//# sourceMappingURL=Ofert.js.map