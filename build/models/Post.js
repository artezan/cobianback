"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
    },
    content: {
        type: String,
        required: true
    },
    customer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Customer"
    },
    consultant: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Consultant"
    },
    ticket: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Ticket"
    },
    isByCustomer: {
        type: Boolean,
    },
    seen: {
        type: Boolean,
        default: false
    }
});
exports.default = mongoose_1.model("Post", PostSchema);
//# sourceMappingURL=Post.js.map