"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AdministratorSchema = new mongoose_1.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
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
exports.default = mongoose_1.model("Administrator", AdministratorSchema);
//# sourceMappingURL=Administrator.js.map