"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const FatherPreBuildSchema = new mongoose_1.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
        required: true,
    },
    preBuild: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "PreBuild",
            default: [],
        },
    ],
    /**
     * notas
     */
    notes: {
        type: String,
    },
    city: {
        type: String,
    },
    numOfChild: {
        type: Number,
    },
});
exports.default = mongoose_1.model("FatherPreBuild", FatherPreBuildSchema);
//# sourceMappingURL=FatherPreBuild.js.map