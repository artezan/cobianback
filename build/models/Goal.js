"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GoalSchema = new mongoose_1.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    content: {
        type: String,
    },
    /**
     * Asesores
     */
    adviser: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Adviser",
            default: [],
        },
    ],
    /**
     * Estado de la meta
     */
    status: {
        type: String,
    },
    title: {
        type: String,
    },
    dateLimit: {
        type: String,
    },
    day: {
        type: Number,
    },
    month: {
        type: Number,
    },
    year: {
        type: Number,
    },
    /**
     * Datos Cuantitativos
     */
    dataNumber: {
        type: Number,
        default: 0,
    },
    /**
     * Cumplido o no
     */
    isComplete: {
        type: Boolean,
        default: false,
    },
    isByManagement: {
        type: Boolean,
    },
});
exports.default = mongoose_1.model("Goal", GoalSchema);
//# sourceMappingURL=Goal.js.map