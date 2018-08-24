"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ScheduleSchema = new mongoose_1.Schema({
    dateOfEvent: {
        type: String,
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
});
exports.default = mongoose_1.model("Schedule", ScheduleSchema);
//# sourceMappingURL=Schedule.js.map