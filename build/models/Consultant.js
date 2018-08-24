"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// tslint:disable object-literal-sort-keys
const ConsultantSchema = new mongoose_1.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    rankingAverage: {
        type: Number,
        default: 0
    },
    password: {
        type: String
    },
    description: {
        type: String
    },
    tickets: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Ticket",
            default: []
        }],
    companyId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Company"
    }
});
exports.default = mongoose_1.model("Consultant", ConsultantSchema);
//# sourceMappingURL=Consultant.js.map