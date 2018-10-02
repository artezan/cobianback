"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NotificationSchema = new mongoose_1.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    title: {
        type: String,
    },
    message: {
        type: String,
    },
    senderId: {
        type: mongoose_1.Schema.Types.ObjectId,
    },
    receiversId: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
        },
    ],
    tags: {
        type: [String],
    },
    readBy: [
        {
            readerId: { type: mongoose_1.Schema.Types.ObjectId },
            readAt: { type: Date, default: Date.now },
        },
    ],
    status: {
        type: String,
    },
    type: {
        type: String,
    },
});
exports.default = mongoose_1.model("Notification", NotificationSchema);
//# sourceMappingURL=Notification.js.map