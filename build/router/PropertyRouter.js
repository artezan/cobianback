"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Property_1 = require("../models/Property");
const PropertyLogic_1 = require("../logic/PropertyLogic");
const Buyer_1 = require("../models/Buyer");
const mongodb_1 = require("mongodb");
const StatusBuyerProperty_1 = require("../models/StatusBuyerProperty");
const Schedule_1 = require("../models/Schedule");
const Chat_1 = require("../models/Chat");
/**
 * @apiDefine PropertyResponseParams
 * @apiSuccess {Date} timestamp
 * @apiSuccess {boolean} isRent Renta o Compra
 * @apiSuccess {ObjectId} _id
 * @apiSuccess {string} name
 * apiSuccess {string[]} typeOfProperty Tipos de Vivienda casa, departamento, terreno, nave industrial, etc., con la posibilidad de agregar alguna opción que no aparezca dentro del listado.
 * @apiSuccess {number} space Espacio de vivienda
 * @apiSuccess {number} numVisit num de Visitas
 * @apiSuccess {string[]} tag Etiquetas
 * @apiSuccess {string[]} files Documentos
 * @apiSuccess {string} dateToBuy Fecha posible compra/renta
 * @apiSuccess {string} zone Zona de compra/renta
 * @apiSuccess {number} minPrice Costo minimo
 * @apiSuccess {number} maxPrice Costo maximo
 * @apiSuccess {number} numRooms Numero de recamaras
 * @apiSuccess {number} numCars Numero de lugares de estacionamiento
 * @apiSuccess {boolean} isOld Nuevo o usado
 * @apiSuccess {boolean} isClose fraccionamiento cerrado o abierto
 * @apiSuccess {number} numBathrooms numero de banos
 * @apiSuccess {boolean} hasGarden jardin
 * @apiSuccess {boolean} isLowLevel Si se desea recámara en planta baja
 * @apiSuccess {boolean} hasElevator Elevador
 * @apiSuccess {boolean} allServices Con o sin servicios
 * @apiSuccess {boolean} wayToBuy Forma de compra FOVISSTE, IMSS, contado, PEMEX, Infonavit, aliados, otros
 */
class PropertyRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * @api {GET} /property/ Request all
     * @apiVersion  0.1.0
     * @apiName get
     * @apiGroup property
     */
    allNoBuy(req, res) {
        Property_1.default.find()
            .sort({ timestamp: -1 })
            .then(data => {
            const filterData = data.filter(d => !d.isBuy);
            res.status(200).json({ data: filterData });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    all(req, res) {
        Property_1.default.find()
            .sort({ timestamp: -1 })
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {GET} /property/bypropertyid/:id Request by Object Id
     * @apiVersion  0.1.0
     * @apiName getById
     * @apiGroup property
     *
     *
     * @apiParam {ObjectId} propertyId Must be provided as QueryParam
     *
     * @apiSampleRequest /property/bypropertyid/5b842b334f965c30a03c1951
     *
     * @apiUse PropertyResponseParams
     *
     * @apiSuccessExample {json} Success-Response Consultant:
     * { "data": { "timestamp": "2018-08-27T16:47:47.968Z", "tag": [ "UPAEP" ], "files": [ "documento1", "documento2" ], "_id": "5b842b334f965c30a03c1951", "isRent": true, "name": "Depa 1", "typeOfProperty": "departamento", "space": 45, "dateToBuy": "18/11/2018", "zone": "La Paz", "minPrice": 2500, "maxPrice": 2500, "numRooms": 1, "numCars": 1, "isOld": false, "isClose": false, "numBathrooms": 2, "hasGarden": false, "isLowLevel": false, "hasElevator": false, "allServices": true, "wayToBuy": "otros", "__v": 0 } }
     */
    oneById(req, res) {
        const id = req.params.id;
        Property_1.default.findById(id)
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {POST} /property/ Request New
     * @apiVersion  0.1.0
     * @apiName post
     * @apiGroup property
     *
     *
     * @apiParam {string} name
     * @apiParam {boolean} isRent Renta o Compra
     * @apiParam {string[]} typeOfProperty Tipos de Vivienda casa, departamento, terreno, nave industrial, etc., con la posibilidad de agregar alguna opción que no aparezca dentro del listado.
     * @apiParam {number} space Espacio de vivienda
     * @apiParam {number} numVisit num de Visitas
     * @apiParam {string[]} tag Etiquetas
     * @apiParam {string[]} files Documentos
     * @apiParam {string} dateToBuy Fecha posible compra/renta
     * @apiParam {string} zone Zona de compra/renta
     * @apiParam {number} minPrice Costo minimo
     * @apiParam {number} maxPrice Costo maximo
     * @apiParam {number} numRooms Numero de recamaras
     * @apiParam {number} numCars Numero de lugares de estacionamiento
     * @apiParam {boolean} isOld Nuevo o usado
     * @apiParam {boolean} isClose fraccionamiento cerrado o abierto
     * @apiParam {number} numBathrooms numero de banos
     * @apiParam {boolean} hasGarden jardin
     * @apiParam {boolean} isLowLevel Si se desea recámara en planta baja
     * @apiParam {boolean} hasElevator Elevador
     * @apiParam {boolean} allServices Con o sin servicios
     * @apiParam {boolean} wayToBuy Forma de compra FOVISSTE, IMSS, contado, PEMEX, Infonavit, aliados, otros
     *
     * @apiParamExample {json} Request-Example:
     * { "isRent":true, "name":"Depa 1", "typeOfProperty":"departamento", "space":45, "tag":["UPAEP"], "files":["documento1","documento2"], "dateToBuy":"18/11/2018", "zone":"La Paz", "minPrice":2500, "maxPrice":2500, "numRooms":1, "numCars":1, "isOld":false, "isClose":false, "numBathrooms":2, "hasGarden":false, "isLowLevel":false, "hasElevator":false, "allServices":true, "wayToBuy":"otros" }
     *
     * @apiUse PropertyResponseParams
     *
     * @apiSuccessExample {json} Success-Response Created User:
     * { "data": { "timestamp": "2018-08-27T16:47:47.968Z", "tag": [ "UPAEP" ], "files": [ "documento1", "documento2" ], "_id": "5b842b334f965c30a03c1951", "isRent": true, "name": "Depa 1", "typeOfProperty": "departamento", "space": 45, "dateToBuy": "18/11/2018", "zone": "La Paz", "minPrice": 2500, "maxPrice": 2500, "numRooms": 1, "numCars": 1, "isOld": false, "isClose": false, "numBathrooms": 2, "hasGarden": false, "isLowLevel": false, "hasElevator": false, "allServices": true, "wayToBuy": "otros", "__v": 0 } }
     */
    create(req, res) {
        const isRent = req.body.isRent;
        const name = req.body.name;
        const typeOfProperty = req.body.typeOfProperty;
        const space = req.body.space;
        const tag = req.body.tag;
        const files = req.body.files;
        const dateToBuy = req.body.dateToBuy;
        const zone = req.body.zone;
        const minPrice = req.body.minPrice;
        const maxPrice = req.body.maxPrice;
        const numRooms = req.body.numRooms;
        const numCars = req.body.numCars;
        const isOld = req.body.isOld;
        const isClose = req.body.isClose;
        const numBathrooms = req.body.numBathrooms;
        const hasGarden = req.body.hasGarden;
        const isLowLevel = req.body.isLowLevel;
        const hasElevator = req.body.hasElevator;
        const allServices = req.body.allServices;
        const wayToBuy = req.body.wayToBuy;
        const property = new Property_1.default({
            isRent,
            name,
            typeOfProperty,
            space,
            tag,
            files,
            dateToBuy,
            zone,
            minPrice,
            maxPrice,
            numRooms,
            numCars,
            isOld,
            isClose,
            numBathrooms,
            hasGarden,
            isLowLevel,
            hasElevator,
            allServices,
            wayToBuy,
        });
        property
            .save()
            .then(data => {
            res.status(201).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {PUT} /property/:_id Request Update
     * @apiVersion  0.1.0
     * @apiName put
     * @apiGroup property
     *
     * @apiParam {ObjectId} propertyId Must be provided as QueryParam
     * @apiParam {string} name
     * @apiParam {boolean} isRent Renta o Compra
     * @apiParam {string[]} typeOfProperty Tipos de Vivienda casa, departamento, terreno, nave industrial, etc., con la posibilidad de agregar alguna opción que no aparezca dentro del listado.
     * @apiParam {number} space Espacio de vivienda
     * @apiParam {number} numVisit num de Visitas
     * @apiParam {string[]} tag Etiquetas
     * @apiParam {string[]} files Documentos
     * @apiParam {string} dateToBuy Fecha posible compra/renta
     * @apiParam {string} zone Zona de compra/renta
     * @apiParam {number} minPrice Costo minimo
     * @apiParam {number} maxPrice Costo maximo
     * @apiParam {number} numRooms Numero de recamaras
     * @apiParam {number} numCars Numero de lugares de estacionamiento
     * @apiParam {boolean} isOld Nuevo o usado
     * @apiParam {boolean} isClose fraccionamiento cerrado o abierto
     * @apiParam {number} numBathrooms numero de banos
     * @apiParam {boolean} hasGarden jardin
     * @apiParam {boolean} isLowLevel Si se desea recámara en planta baja
     * @apiParam {boolean} hasElevator Elevador
     * @apiParam {boolean} allServices Con o sin servicios
     * @apiParam {boolean} wayToBuy Forma de compra FOVISSTE, IMSS, contado, PEMEX, Infonavit, aliados, otros
     *
     *
     * @apiParamExample {json} Request-Example:
     * { "files":["documento1","documento2", "documento3"] }
     *
     * @apiSuccessExample {json} Success-Response:
     * { "data": true }
     */
    update(req, res) {
        const _id = req.params.id;
        Property_1.default.findByIdAndUpdate({ _id: _id }, req.body)
            .then(() => {
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {DELETE} /property/:id Request  Deleted
     * @apiVersion  0.1.0
     * @apiName deleteByToken
     * @apiGroup property
     *
     * @apiParam {ObjectId} propertyId Must be provided as QueryParam
     *
     * @apiSuccessExample {json} Success-Response:
     * {"data":true}
     */
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.params.id;
            yield StatusBuyerProperty_1.default.findOneAndRemove({ property: _id });
            yield Schedule_1.default.findOneAndRemove({ property: _id });
            yield Chat_1.default.findOneAndRemove({ property: _id });
            Property_1.default.findByIdAndRemove({ _id: _id })
                .then(() => {
                res.status(200).json({ data: true });
            })
                .catch(error => {
                res.status(500).json({ error });
            });
        });
    }
    /**
     * @api  {POST} /property/matchsearchbybuyer/:id Request match search by buyer
     * @apiVersion  0.1.0
     * @apiName demomatch
     * @apiGroup property
     *
     * @apiParam {ObjectId} buyerId Must be provided as QueryParam
     * @apiParam {number} percentage  % Minimo de match
     * @apiParamExample {json} Request-Example:
     * { "percentage": 60 }
     * @apiSuccessExample {json} Success-Response:
     * {"data":true}
     */
    setPropiertiesToBuyer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // id de buyer
            const _id = req.params.id;
            // percentage
            const percentage = req.body.percentage;
            const properties = yield PropertyLogic_1.PropertyLogic.Instance().matchSearchByBuyerId(_id, percentage);
            Buyer_1.default.findById(_id).then(buyer => {
                properties.forEach(p => {
                    const isFinded = buyer.property.findIndex((property) => new mongodb_1.ObjectId(property).toString() ===
                        new mongodb_1.ObjectId(p._id).toString());
                    if (isFinded === -1) {
                        buyer.property.push(p._id);
                    }
                });
                buyer
                    .save()
                    .then(() => {
                    res.status(200).json({ data: true });
                })
                    .catch(error => {
                    res.status(500).json({ error });
                });
            });
        });
    }
    /**
     * @api {POST} /property/matchsearchbydemo/ Request demo match
     * @apiVersion  0.1.0
     * @apiName matchsearchbybuyer
     * @apiGroup property
     *
     *
     * @apiParam {number} percentage  % Minimo de match
     * @apiParam {string} typeOfProperty Tipos de Vivienda casa, departamento, terreno, nave industrial, etc., con la posibilidad de agregar alguna opción que no aparezca dentro del listado.
     * @apiParam {number} space Espacio de vivienda
     * @apiParam {string[]} tag Etiquetas
     * @apiParam {ISchedule[]} schedule Eventos programados
     * @apiParam {ICredit[]} credit Creditos
     * @apiParam {string[]} files Documentos
     * @apiParam {IProperty[]} property Lista de sugerencias
     * @apiParam {IProperty[]} propertySave Lista Propiedades guardadas o que le interesan
     * @apiParam {IAdviser[]} adviser Asesores Asignados
     * @apiParam {INotification[]} notification Notificaciones guardadas
     * @apiParam {boolean} isRenter Renta o Compra
     * @apiParam {string} dateToBuy Fecha posible compra/renta
     * @apiParam {string} zone Zona de compra/renta
     * @apiParam {number} minPrice Costo minimo
     * @apiParam {number} maxPrice Costo maximo
     * @apiParam {number} numRooms Numero de recamaras
     * @apiParam {number} numCars Numero de lugares de estacionamiento
     * @apiParam {boolean} isOld Nuevo o usado
     * @apiParam {boolean} isClose fraccionamiento cerrado o abierto
     * @apiParam {number} numBathrooms numero de banos
     * @apiParam {boolean} hasGarden jardin
     * @apiParam {boolean} isLowLevel Si se desea recámara en planta baja
     * @apiParam {boolean} hasElevator Elevador
     * @apiParam {boolean} allServices Con o sin servicios
     * @apiParam {boolean} wayToBuy Forma de compra FOVISSTE, IMSS, contado, PEMEX, Infonavit, aliados, otros
     * @apiParamExample {json} Request-Example:
     * { "typeOfProperty":"departamento", "space":40, "tag":["mascotas", "estudiante"], "isRenter":true, "dateToBuy":"20/12/2018", "zone":"La Paz", "minPrice":2000, "maxPrice":4000, "numRooms":1, "numCars":0, "isOld":false, "isClose":false, "numBathrooms":2, "hasGarden":false, "isLowLevel":false, "hasElevator":false, "allServices":true, "wayToBuy":"otro", "percentage": 60 }
     * @apiSuccessExample {json} Success-Response:
     * { "data": [ { "timestamp": "2018-08-27T16:47:47.968Z", "tag": [ "UPAEP" ], "files": [ "documento1", "documento2", "documento3" ], "_id": "5b842b334f965c30a03c1951", "isRent": true, "name": "Depa 1", "typeOfProperty": "departamento", "space": 45, "dateToBuy": "18/11/2018", "zone": "La Paz", "minPrice": 2500, "maxPrice": 2500, "numRooms": 1, "numCars": 1, "isOld": false, "isClose": false, "numBathrooms": 2, "hasGarden": false, "isLowLevel": false, "hasElevator": false, "allServices": true, "wayToBuy": "otros", "__v": 0 } ] }
     */
    demoMatchSearch(req, res) {
        // obj de tipo buyer
        const demoBuyer = {
            isRenter: req.body.isRenter,
            typeOfProperty: req.body.typeOfProperty,
            space: req.body.space,
            dateToBuy: req.body.dateToBuy,
            zone: req.body.zone,
            minPrice: req.body.minPrice,
            maxPrice: req.body.maxPrice,
            numRooms: req.body.numRooms,
            numCars: req.body.numCars,
            isOld: req.body.isOld,
            isClose: req.body.isClose,
            numBathrooms: req.body.numBathrooms,
            hasGarden: req.body.hasGarden,
            isLowLevel: req.body.isLowLevel,
            hasElevator: req.body.hasElevator,
            allServices: req.body.allServices,
            wayToBuy: req.body.wayToBuy,
            tag: req.body.tag,
        };
        // percentage
        const percentage = req.body.percentage;
        // resultado
        PropertyLogic_1.PropertyLogic.Instance()
            .resultOfProperty(demoBuyer, percentage)
            .then(result => {
            res.status(200).json({ data: result });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    // set up our routes
    routes() {
        this.router.get("/all", this.all);
        this.router.get("/", this.allNoBuy);
        this.router.get("/bypropertyid/:id", this.oneById);
        this.router.post("/matchsearchbybuyer/:id", this.setPropiertiesToBuyer);
        this.router.post("/matchsearchbydemo/", this.demoMatchSearch);
        this.router.post("/", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
exports.PropertyRouter = PropertyRouter;
//# sourceMappingURL=PropertyRouter.js.map