"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PropertySchema = new mongoose_1.Schema({
    isRent: {
        type: Boolean,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
    },
    /**
     * tipo de propiedad
     */
    typeOfProperty: {
        type: String,
    },
    /**
     * num de Visitas
     */
    numVisit: {
        type: Number,
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
     * Documentos
     */
    files: [
        {
            type: String,
            default: [],
        },
    ],
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
    /**
     * Forma de compra FOVISSTE, IMSS, contado, PEMEX, Infonavit, aliados, otros
     */
    wayToBuy: {
        type: String,
    },
    /**
     * fecha de apartado
     */
    dateToApart: {
        type: Date,
    },
    /**
     * comprada
     */
    isBuy: {
        type: Boolean,
    },
});
exports.default = mongoose_1.model("Property", PropertySchema);
//# sourceMappingURL=Property.js.map