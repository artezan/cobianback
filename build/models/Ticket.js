"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TicketSchema = new mongoose_1.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    hours: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Customer"
    },
    consultant: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Consultant"
    },
    ranking: {
        type: Number,
        default: 0
    },
    cost: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "Pendiente"
    },
    isPay: {
        type: Boolean,
        default: false
    },
    companyId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Company"
    }
});
exports.default = mongoose_1.model("Ticket", TicketSchema);
//# sourceMappingURL=Ticket.js.map