"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MakerSchema = new mongoose_1.Schema({
    name: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    /**
     *  Obra
     */
    build: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Build",
    },
    /**
     * ciudad para filtar
     */
    city: {
        type: String,
    },
    password: {
        type: String,
    },
});
exports.default = mongoose_1.model("Maker", MakerSchema);
//# sourceMappingURL=Maker.js.map