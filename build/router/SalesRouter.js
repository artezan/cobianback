"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Sale_1 = require("../models/Sale");
class SalesRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * @api {GET} /status/bycompanyid/:companyId Request all by company
     * @apiVersion  0.1.0
     * @apiName get
     * @apiGroup status
     */
    all(req, res) {
        Sale_1.default.find()
            .populate("property")
            .populate("buyer")
            .populate("adviser")
            .populate("seller")
            .sort({ timestamp: -1 })
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {GET} /status/bystatusid/:id Request by Object Id
     * @apiVersion  0.1.0
     * @apiName getById
     * @apiGroup status
     *
     *
     */
    oneById(req, res) {
        const id = req.params.id;
        Sale_1.default.findById(id)
            .populate("property")
            .populate("buyer")
            .populate("adviser")
            .populate("seller")
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {POST} /status/ Request New
     * @apiVersion  0.1.0
     * @apiName post
     * @apiGroup status
     *
     *
     * @apiParam {string} status Estado (Negociación,Oferta,Propuesta de crédito  )
     * @apiParam {ObjectId} buyer
     * @apiParam {ObjectId} property
     * @apiParam {string} note
     *
     * @apiParamExample {json} Request-Example:
     * { "status":"negociacion", "buyer":"5b84586674acb1030cabb419", "property":"5b842b334f965c30a03c1951", "note":"En proceso" }
     *
     *
     * @apiSuccessExample {json} Success-Response Created User:
     * { "data": { "timestamp": "2018-08-27T22:18:13.525Z", "_id": "5b8478a5258cea39b839cbf7", "status": "negociacion", "buyer": "5b84586674acb1030cabb419", "property": "5b842b334f965c30a03c1951", "note": "En proceso", "__v": 0 } }
     */
    create(req, res) {
        const property = req.body.property;
        const buyer = req.body.buyer;
        const adviser = req.body.adviser;
        const seller = req.body.seller;
        const note = req.body.note;
        const price = req.body.price;
        const isRent = req.body.isRent;
        const statusBuyerProperty = new Sale_1.default({
            property,
            buyer,
            adviser,
            seller,
            note,
            price,
            isRent,
        });
        statusBuyerProperty
            .save()
            .then(data => {
            res.status(201).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {PUT} /status/:_id Request Update
     * @apiVersion  0.1.0
     * @apiName put
     * @apiGroup status
     *
     */
    update(req, res) {
        const _id = req.params.id;
        req.body.timestamp = new Date();
        Sale_1.default.findByIdAndUpdate({ _id: _id }, req.body)
            .then(() => {
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {DELETE} /status/:id Request  Deleted
     * @apiVersion  0.1.0
     * @apiName deleteByToken
     * @apiGroup status
     *
     */
    delete(req, res) {
        const _id = req.params.id;
        Sale_1.default.findByIdAndRemove({ _id: _id })
            .then(() => {
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {POST} /status/upgradelevelbyid/:id Request  UpgradeLevel
     * @apiVersion  0.1.0
     * @apiName UpgradeLevel
     * @apiGroup status
     *
     * @apiParam {ObjectId} id
     * @apiParam {string} status gris, verde, amarillo, rojo
     */
    searchByAdvId(req, res) {
        const adviser = req.body.adviser;
        Sale_1.default.find({ adviser: adviser })
            .populate("property")
            .populate("buyer")
            .populate("adviser")
            .populate("seller")
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    // set up our routes
    routes() {
        this.router.get("/", this.all);
        this.router.get("/bysaleid/:id", this.oneById);
        this.router.post("/byadviserid", this.searchByAdvId);
        this.router.post("/", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
exports.SalesRouter = SalesRouter;
//# sourceMappingURL=SalesRouter.js.map