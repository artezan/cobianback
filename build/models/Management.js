"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ManagementSchema = new mongoose_1.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
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
    goal: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Goal",
            default: [],
        },
    ],
});
exports.default = mongoose_1.model("Management", ManagementSchema);
//# sourceMappingURL=Management.js.map