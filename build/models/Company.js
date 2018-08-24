"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CompanySchema = new mongoose_1.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});
exports.default = mongoose_1.model("Company", CompanySchema);
//# sourceMappingURL=Company.js.map