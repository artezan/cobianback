"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { model, Schema } from "mongoose";
const mongoose = require("mongoose");
const booksSchema = new mongoose.Schema({
    createAt: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: "",
        required: true,
        unique: true,
        lowercase: true
    },
    pages: {
        type: Number,
        default: 0,
        required: false
    }
});
exports.default = mongoose.model("Books", booksSchema);
//# sourceMappingURL=Books.js.map