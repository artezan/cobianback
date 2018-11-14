"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PreBuildSchema = new mongoose_1.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    preBuyer: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "PreBuyer",
            default: []
        }
    ],
    timeLine: [
        {
            dayToStart: Number,
            monthToStart: Number,
            yearToStart: Number,
            dayToEnd: Number,
            monthToEnd: Number,
            yearToEnd: Number,
            notes: String,
            namePhase: String,
            isComplete: Boolean,
            imgUrls: [String]
        }
    ],
    /**
     * notas
     */
    notes: {
        type: String
    },
    city: {
        type: String
    },
    notificationOneSignal: [{ type: String, default: [] }]
});
exports.default = mongoose_1.model("PreBuild", PreBuildSchema);
//# sourceMappingURL=PreBuild.js.map