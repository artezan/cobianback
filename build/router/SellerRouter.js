"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const base64 = require("base-64");
const Seller_1 = require("../models/Seller");
/**
 * @apiDefine SellerResponseParams
 * @apiSuccess {Date} timestamp
 * @apiSuccess {IProperty[]} property Propiedades
 * @apiSuccess {ISchedule[]} schedule Eventos
 * @apiSuccess {ObjectId} _id
 * @apiSuccess {INotification[]} notification
 * @apiSuccess {string} name
 * @apiSuccess {string} lastName
 * @apiSuccess {string} password
 * @apiSuccess {boolean} isRenter
 */
class SellerRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * @api {GET} /seller/ Request all
     * @apiVersion  0.1.0
     * @apiName get
     * @apiGroup seller
     *
     *
     */
    all(req, res) {
        Seller_1.default.find()
            .populate("property")
            .populate("schedule")
            .populate("notification")
            .sort({ timestamp: -1 })
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {GET} /seller/bysellerid/:Id Request by Object Id
     * @apiVersion  0.1.0
     * @apiName getById
     * @apiGroup seller
     *
     *
     */
    oneById(req, res) {
        const id = req.params.id;
        Seller_1.default.findById(id)
            .populate("property")
            .populate("schedule")
            .populate("notification")
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    byPassword(req, res) {
        const strDecode = base64.decode(req.params.base64);
        const name = strDecode.substring(0, strDecode.indexOf(":"));
        const password = strDecode.substring(strDecode.indexOf(":") + 1, strDecode.length);
        Seller_1.default.find({ password: password, name: name })
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {GET} /bysellercity/:city Request by Object City
     * @apiVersion  0.1.0
     * @apiName getByCity
     * @apiGroup seller
     *
     *
     */
    byCity(req, res) {
        const city = req.params.city;
        Seller_1.default.find({ city: city })
            .populate("schedule")
            .populate("buyer")
            .populate("goal")
            .populate("notification")
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {POST} /seller/ Request New
     * @apiVersion  0.1.0
     * @apiName post
     * @apiGroup seller
     *
     *
     * @apiParam {string} name
     * @apiParam {string} lastName
     * @apiParam {string} password
     * @apiParam { boolean} isRenter Renta o Vende
     *
     * @apiParamExample {json} Request-Example:
     * { "name": "Vendedor 1", "lastName": "Apellido", "password":"12345", "isRenter": true }
     *
     * @apiUse SellerResponseParams
     *
     * @apiSuccessExample {json} Success-Response Created User:
     * { "data": { "timestamp": "2018-08-27T22:34:35.839Z", "property": [], "schedule": [], "notification": [], "_id": "5b847c7bdba3a530b0aa264b", "name": "Vendedor 1", "lastName": "Apellido", "password": "12345", "isRenter": true, "__v": 0 } }
     */
    create(req, res) {
        const name = req.body.name;
        const lastName = req.body.lastName;
        const password = req.body.password;
        const isRenter = req.body.isRenter;
        const city = req.body.city;
        const seller = new Seller_1.default({
            name,
            lastName,
            password,
            isRenter,
            city,
        });
        seller
            .save()
            .then(data => {
            res.status(201).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {PUT} /seller/:_id Request Update
     * @apiVersion  0.1.0
     * @apiName put
     * @apiGroup seller
     *
     */
    update(req, res) {
        const _id = req.params.id;
        Seller_1.default.findByIdAndUpdate({ _id: _id }, req.body)
            .then(() => {
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {DELETE} /seller/:id Request  Deleted
     * @apiVersion  0.1.0
     * @apiName deleteByToken
     * @apiGroup seller
     *
     */
    delete(req, res) {
        const _id = req.params.id;
        Seller_1.default.findByIdAndRemove({ _id: _id })
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
        this.router.get("/bysellerid/:id", this.oneById);
        this.router.get("/bysellercity/:city", this.byCity);
        this.router.get("/bysellerpassword/:base64", this.byPassword);
        this.router.post("/", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
exports.SellerRouter = SellerRouter;
//# sourceMappingURL=SellerRouter.js.map