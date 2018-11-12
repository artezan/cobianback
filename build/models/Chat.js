"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ChatSchema = new mongoose_1.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    property: {
        type: String,
        required: true,
    },
    buyer: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    messages: [
        {
            content: String,
            createAt: String,
            // quien lo hizo
            uid: String,
            readBy: [{ type: String, default: [] }],
            typeOfUser: String,
        },
    ],
});
exports.default = mongoose_1.model("Chat", ChatSchema);
//# sourceMappingURL=Chat.js.map