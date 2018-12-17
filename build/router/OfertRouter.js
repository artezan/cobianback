"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Ofert_1 = require("../models/Ofert");
class OfertRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * @api {GET} /ofert/Request all
     * @apiVersion  0.1.0
     * @apiName get
     * @apiGroup ofert
     *
     */
    all(req, res) {
        const city = req.headers.city;
        Ofert_1.default.find()
            .populate("buyer")
            .populate("property")
            .sort({ timestamp: -1 })
            .then(data => {
            if (city !== undefined) {
                const dataFilter = data.filter(ofert => ofert.buyer.city === city);
                res.status(200).json({ data: dataFilter });
            }
            else {
                res.status(200).json({ data });
            }
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {GET} /ofert/:id Request by Object Id
     * @apiVersion  0.1.0
     * @apiName getById
     * @apiGroup ofert
     *
     */
    oneById(req, res) {
        const id = req.params.id;
        Ofert_1.default.findById(id)
            .populate("buyer")
            .populate("property")
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {POST} /ofert/ Request New
     * @apiVersion  0.1.0
     * @apiName post
     * @apiGroup ofert
     *
     *
     * @apiParam {ObjectId} buyer
     * @apiParam {ObjectId} property
     * @apiParam {string} status aceptadas, rechazadas o sigue en negociación.
     * @apiParam {string} notes Notas extra
     * @apiParam {number} ofertPrice Oferta
     * @apiParam {string[]} files Documentos
     *
     * @apiParamExample {json} Request-Example:
     * { "name":"Consultor 1", "lastName":"Apellido", "password":"1234", "description":"Especialidad en", "companyId":"5b6db7c05291313ddcc318b7" }
     *
     *
     * @apiSuccessExample {json} Success-Response Created User:
     * { "data": { "timestamp": "2018-08-10T16:08:32.439Z", "rankingAverage": 0, "tickets": [], "_id": "5b6db8805291313ddcc318b9", "name": "Consultor 1", "lastName": "Apellido", "password": "1234", "description": "Especialidad en", "companyId": "5b6db7c05291313ddcc318b7", "__v": 0 } }
     */
    create(req, res) {
        const buyer = req.body.buyer;
        const property = req.body.property;
        const status = req.body.status;
        const notes = req.body.notes;
        const ofertPrice = req.body.ofertPrice;
        const apartOfert = req.body.apartOfert;
        const wayToBuy = req.body.wayToBuy;
        const files = req.body.files;
        const ofert = new Ofert_1.default({
            buyer,
            property,
            status,
            notes,
            ofertPrice,
            files,
            apartOfert,
            wayToBuy,
        });
        ofert
            .save()
            .then(data => {
            res.status(201).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {PUT} /ofert/:_id Request Update
     * @apiVersion  0.1.0
     * @apiName put
     * @apiGroup ofert
     */
    update(req, res) {
        const _id = req.params.id;
        req.body.timestamp = new Date();
        Ofert_1.default.findByIdAndUpdate({ _id: _id }, req.body)
            .then(() => {
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {DELETE} /ofert/:id Request  Deleted
     * @apiVersion  0.1.0
     * @apiName deleteByToken
     * @apiGroup ofert
     *
     */
    delete(req, res) {
        const _id = req.params.id;
        Ofert_1.default.findByIdAndRemove({ _id: _id })
            .then(() => {
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    // set up our routes
    routes() {
        this.router.get("/", this.all);
        this.router.get("/byofertid/:id", this.oneById);
        // this.router.get("/bybuyerpassword/:base64", this.byPassword);
        this.router.post("/", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
exports.OfertRouter = OfertRouter;
//# sourceMappingURL=OfertRouter.js.map