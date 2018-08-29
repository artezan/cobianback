"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const BuyerSchema = new mongoose_1.Schema({
    city: {
        type: String,
    },
    name: {
        type: String,
        required: true,
    },
    fatherLastName: {
        type: String,
        required: true,
    },
    motherLastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    /**
     * Edad
     */
    years: {
        type: Number,
    },
    /**
     * Sexo
     */
    isMale: {
        type: Boolean,
    },
    /**
     * Número de miembros de familia
     */
    numOfFamily: {
        type: Number,
    },
    /**
     * estado civil
     */
    isSingle: {
        type: Boolean,
    },
    /**
     * Tipos de Vivienda
     */
    typeOfProperty: {
        type: String,
        default: [],
    },
    /**
     * Espacio de vivienda
     */
    space: {
        type: Number,
    },
    /**
     * Etiquetas
     */
    tag: [
        {
            type: String,
            default: [],
        },
    ],
    /**
     *  eventos programados
     */
    schedule: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Schedule",
            default: [],
        },
    ],
    statusBuyerProperty: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "StatusBuyerProperty",
            default: [],
        },
    ],
    /**
     * Creditos
     */
    credit: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Credit",
            default: [],
        },
    ],
    /**
     * Documentos
     */
    files: [
        {
            type: String,
            default: [],
        },
    ],
    /**
     * Lista de sugerencias
     */
    property: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Property",
            default: [],
        },
    ],
    propertySave: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Property",
            default: [],
        },
    ],
    /**
     * Asesores
     */
    adviser: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Adviser",
            default: [],
        },
    ],
    notification: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Notification",
            default: [],
        },
    ],
    ofert: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Ofert",
            default: [],
        },
    ],
    isRenter: {
        type: Boolean,
    },
    /**
     * Fecha posible
     */
    dateToBuy: {
        type: String,
    },
    /**
     * Zona de compra/renta
     */
    zone: {
        type: String,
    },
    /**
     * Costo minimo
     */
    minPrice: {
        type: Number,
    },
    /**
     * Costo maximo
     */
    maxPrice: {
        type: Number,
    },
    /**
     * num recamaras
     */
    numRooms: {
        type: Number,
    },
    /**
     * num de lugares para estacionaminto
     */
    numCars: {
        type: Number,
    },
    /**
     * Nueva o usada
     */
    isOld: {
        type: Boolean,
    },
    /**
     * un fraccionamiento cerrado
     */
    isClose: {
        type: Boolean,
    },
    /**
     * numero de banos
     */
    numBathrooms: {
        type: Number,
    },
    /**
     * jardin
     */
    hasGarden: {
        type: Boolean,
    },
    /**
     * Si se desea recámara en planta baja
     */
    isLowLevel: {
        type: Boolean,
    },
    /**
     * Elevador
     */
    hasElevator: {
        type: Boolean,
    },
    /**
     * todos servicios
     */
    allServices: {
        type: Boolean,
    },
    wayToBuy: {
        type: String,
    },
});
exports.default = mongoose_1.model("Buyer", BuyerSchema);
//# sourceMappingURL=Buyer.js.map