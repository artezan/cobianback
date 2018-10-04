"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ScheduleSchema = new mongoose_1.Schema({
    day: {
        type: Number,
    },
    month: {
        type: Number,
    },
    year: {
        type: Number,
    },
    hour: {
        type: Number,
    },
    minute: {
        type: Number,
        default: 0,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    /**
     * Titulo del evento
     */
    title: {
        type: String,
    },
    /**
     * Direccion
     */
    address: {
        type: String,
    },
    /**
     *  propiedad
     */
    property: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Property",
    },
    /**
     * Comprador
     */
    buyer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Buyer",
    },
    /**
     *  Asesor
     */
    adviser: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Adviser",
    },
    /**
     *  Vendedor
     */
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Seller",
    },
    /**
     *  admin
     */
    administrator: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Administrator",
    },
    /**
     *  Management
     */
    management: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Management",
    },
    /**
     * Estado
     */
    status: {
        type: String,
    },
    /**
     * Notas
     */
    note: {
        type: String,
    },
    /**
     * personal
     */
    personal: {
        type: String,
    },
    scoreByAdviser: {
        type: String,
    },
    notificationOneSignal: [{ type: String, default: [] }],
});
exports.default = mongoose_1.model("Schedule", ScheduleSchema);
//# sourceMappingURL=Schedule.js.map