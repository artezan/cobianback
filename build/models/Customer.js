"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// tslint:disable object-literal-sort-keys
const CustomerSchema = new mongoose_1.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    logo: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    adress: {
        type: String,
    },
    totalHours: {
        type: Number,
        default: 0
    },
    phone: {
        type: Number
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    workArea: {
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
exports.default = mongoose_1.model("Customer", CustomerSchema);
//# sourceMappingURL=Customer.js.map