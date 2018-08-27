"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CreditSchema = new mongoose_1.Schema({
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
     * status Gris Verde Amarillo Rojo
     */
    status: {
        type: String,
    },
    notes: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    /**
     * Documentos para el credito
     */
    files: [
        {
            type: String,
            default: [],
        },
    ],
});
exports.default = mongoose_1.model("Credit", CreditSchema);
//# sourceMappingURL=Credit.js.map