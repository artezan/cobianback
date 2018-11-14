"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PreBuyerSchema = new mongoose_1.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    phone: {
        type: Number
    },
    preBuild: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "PreBuild",
            default: []
        }
    ]
});
exports.default = mongoose_1.model("PreBuyer", PreBuyerSchema);
//# sourceMappingURL=PreBuyer.js.map