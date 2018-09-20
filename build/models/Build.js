"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BuildSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    /**
     *  conograma
     */
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
            imgUrls: [String],
            imagesData: [
                {
                    url: String,
                    notes: String,
                    date: String,
                },
            ],
        },
    ],
    /**
     * constructores
     */
    maker: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Maker",
            default: [],
        },
    ],
    /**
     * notas
     */
    notes: {
        type: String,
    },
    /**
     * ciudad para filtar
     */
    city: {
        type: String,
    },
});
exports.default = mongoose_1.model("Build", BuildSchema);
//# sourceMappingURL=Build.js.map