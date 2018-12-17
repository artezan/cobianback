"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    status: {
        type: String,
    },
    city: [{ type: String, default: [] }],
    tags: [{ type: String, default: [] }],
    uids: [{ type: String, default: [] }],
});
exports.default = mongoose_1.model("Post", PostSchema);
//# sourceMappingURL=Post.js.map