"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Credit_1 = require("../models/Credit");
class CreditRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * @api {GET} /credit/ Request all
     * @apiVersion  0.1.0
     * @apiName getall
     * @apiGroup credit
     *
     */
    all(req, res) {
        Credit_1.default.find()
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
     * @api {GET} /credit/bycreditid/:id Request by Object Id
     * @apiVersion  0.1.0
     * @apiName getById
     * @apiGroup credit
     *
     */
    oneById(req, res) {
        const id = req.params.id;
        Credit_1.default.findById(id)
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
     * @api {POST} /credit/ Request New
     * @apiVersion  0.1.0
     * @apiName post
     * @apiGroup credit
     *
     *
     * @apiParam {ObjectId} buyer
     * @apiParam {ObjectId} property
     * @apiParam {string} status Gris Verde Amarillo Rojo
     * @apiParam {string} notes Notas o Describir
     * @apiParam {string[]} files Archivos para el credito
     *
     * @apiParamExample {json} Request-Example:
     * { "buyer":"5b84586674acb1030cabb419", "property":"5b842b334f965c30a03c1951", "status":"Verde", "files":["documento1", "documento2"], "notes":"Describir credito" }
     *
     *
     *
     * @apiSuccessExample {json} Success-Response Created User:
     * { "data": { "timestamp": "2018-08-27T20:53:41.976Z", "files": [ "documento1", "documento2" ], "_id": "5b8464d565fb8a39b8ae3523", "buyer": "5b84586674acb1030cabb419", "property": "5b842b334f965c30a03c1951", "status": "Verde", "notes": "Describir credito", "__v": 0 } }
     */
    create(req, res) {
        const buyer = req.body.buyer;
        const property = req.body.property;
        const status = req.body.status;
        const files = req.body.files;
        const notes = req.body.notes;
        const credit = new Credit_1.default({
            buyer,
            property,
            status,
            files,
            notes,
        });
        credit
            .save()
            .then(data => {
            res.status(201).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {PUT} /credit/:_id Request Update
     * @apiVersion  0.1.0
     * @apiName put
     * @apiGroup credit
     */
    update(req, res) {
        const _id = req.params.id;
        req.body.timestamp = new Date();
        Credit_1.default.findByIdAndUpdate({ _id: _id }, req.body)
            .then(() => {
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {DELETE} /credit/:id Request  Deleted
     * @apiVersion  0.1.0
     * @apiName deleteByToken
     * @apiGroup credit
     */
    delete(req, res) {
        const _id = req.params.id;
        Credit_1.default.findByIdAndRemove({ _id: _id })
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
        this.router.get("/bycreditid/:id", this.oneById);
        // this.router.get("/bybuyerpassword/:base64", this.byPassword);
        this.router.post("/", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
exports.CreditRouter = CreditRouter;
//# sourceMappingURL=CreditRouter.js.map