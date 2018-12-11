"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OfficeSchema = new mongoose_1.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    password: {
        type: String,
    },
    phone: {
        type: Number,
    },
    email: {
        type: String,
    },
    city: {
        type: String,
    },
});
exports.default = mongoose_1.model("Office", OfficeSchema);
//# sourceMappingURL=Office.js.map