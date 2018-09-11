"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AdviserSchema = new mongoose_1.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    city: {
        type: String,
    },
    schedule: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Schedule",
            default: [],
        },
    ],
    hourStart: {
        type: Number,
    },
    hourEnd: {
        type: Number,
    },
    isRenter: {
        type: Boolean,
    },
    buyer: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Buyer",
            default: [],
        },
    ],
    goal: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Goal",
            default: [],
        },
    ],
    notification: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Notification",
            default: [],
        },
    ],
});
exports.default = mongoose_1.model("Adviser", AdviserSchema);
//# sourceMappingURL=Adviser.js.map