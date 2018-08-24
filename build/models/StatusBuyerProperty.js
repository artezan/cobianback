"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const StatusBuyerPropertySchema = new mongoose_1.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
    },
    buyer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Buyer",
    },
    property: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Property",
    },
    note: {
        type: String,
    },
});
exports.default = mongoose_1.model("StatusBuyerProperty", StatusBuyerPropertySchema, "StatusBuyerProperty");
//# sourceMappingURL=StatusBuyerProperty.js.map