"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VerificationEmailSchema = new mongoose_1.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
});
exports.default = mongoose_1.model("VerificationEmail", VerificationEmailSchema);
//# sourceMappingURL=VerificationEmail.js.map