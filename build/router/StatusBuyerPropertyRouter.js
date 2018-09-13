"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const StatusBuyerProperty_1 = require("../models/StatusBuyerProperty");
const StatusBuyerProperty_2 = require("../logic/StatusBuyerProperty");
class StatusBuyerPropertyRouter {
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
        StatusBuyerProperty_1.default.find()
            .populate("buyer")
            .populate("property")
            .sort({ dateOfEvent: "asc" })
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
        StatusBuyerProperty_1.default.findById(id)
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
        const status = req.body.status;
        const buyer = req.body.buyer;
        const property = req.body.property;
        const note = req.body.note;
        const statusBuyerProperty = new StatusBuyerProperty_1.default({
            status,
            buyer,
            property,
            note,
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
        StatusBuyerProperty_1.default.findByIdAndUpdate({ _id: _id }, req.body)
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
        StatusBuyerProperty_1.default.findByIdAndRemove({ _id: _id })
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
    upgradeLevel(req, res) {
        const _id = req.params.id;
        const status = req.body.status;
        StatusBuyerProperty_1.default.findById({ _id: _id })
            .then(s => {
            const isUpdate = StatusBuyerProperty_2.StatusBuyerPropertyLogic.Instance().isUpgradeStatus(status, s.status);
            if (isUpdate) {
                const timestamp = new Date();
                StatusBuyerProperty_1.default.findByIdAndUpdate({ _id: _id }, { status: status, timestamp: timestamp })
                    .then(() => {
                    res.status(200).json({ data: true });
                })
                    .catch(error => {
                    res.status(500).json({ error });
                });
            }
            else {
                res.status(200).json({ data: false });
            }
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {POST} /status/bybuyerpropid/ Request by Object Id
     * @apiVersion  0.1.0
     * @apiName getById
     * @apiGroup status
     *
     *
     */
    oneByPropBuyer(req, res) {
        const buyer = req.body.buyer;
        const property = req.body.property;
        StatusBuyerProperty_1.default.findOne({
            buyer,
            property,
        })
            .populate("buyer")
            .populate("property")
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
        this.router.get("/bystatusid/:id", this.oneById);
        this.router.post("/bybuyerpropid", this.oneByPropBuyer);
        // this.router.get("/bybuyerpassword/:base64", this.byPassword);
        this.router.post("/", this.create);
        this.router.post("/upgradelevelbyid/:id", this.upgradeLevel);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
exports.StatusBuyerPropertyRouter = StatusBuyerPropertyRouter;
//# sourceMappingURL=StatusBuyerPropertyRouter.js.map