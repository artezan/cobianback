"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const base64 = require("base-64");
const Management_1 = require("../models/Management");
class ManagementRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * @api {GET} /management// Request all
     * @apiVersion  0.1.0
     * @apiName get
     * @apiGroup management
     *
     */
    all(req, res) {
        Management_1.default.find()
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {GET} /management/bymanagementid/:id Request by Object Id
     * @apiVersion  0.1.0
     * @apiName getById
     * @apiGroup management
     *
     */
    oneById(req, res) {
        const id = req.params.id;
        Management_1.default.findById(id)
            .populate("adviser")
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {GET} /bymanagementcity/:city Request by Object City
     * @apiVersion  0.1.0
     * @apiName getByCity
     * @apiGroup management
     *
     *
     */
    byCity(req, res) {
        const city = req.params.city;
        Management_1.default.find({ city: city })
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
     * @api {GET} /management/bymanagementpassword/:b64 Request by Object Id
     * @apiVersion  0.1.0
     * @apiName getById
     * @apiGroup management
     *
     */
    byPassword(req, res) {
        const strDecode = base64.decode(req.params.base64);
        const name = strDecode.substring(0, strDecode.indexOf(":"));
        const password = strDecode.substring(strDecode.indexOf(":") + 1, strDecode.length);
        Management_1.default.find({ password: password, name: name })
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {POST} /management/ Request New
     * @apiVersion  0.1.0
     * @apiName post
     * @apiGroup management
     *
     *
     * @apiParam {string} name
     * @apiParam {string} password
     *
     */
    create(req, res) {
        const name = req.body.name;
        const password = req.body.password;
        const city = req.body.city;
        const management = new Management_1.default({ name, password, city });
        management
            .save()
            .then(data => {
            res.status(201).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {PUT} /management/:_id Request Update
     * @apiVersion  0.1.0
     * @apiName put
     * @apiGroup management
     *
     */
    update(req, res) {
        const _id = req.params.id;
        Management_1.default.findByIdAndUpdate({ _id: _id }, req.body)
            .then(() => {
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {DELETE} /management/:id Request  Deleted
     * @apiVersion  0.1.0
     * @apiName deleteByToken
     * @apiGroup management
     *
     */
    delete(req, res) {
        const _id = req.params.id;
        Management_1.default.findByIdAndRemove({ _id: _id })
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
        this.router.get("/bymanagementid/:id", this.oneById);
        this.router.get("/bymanagementcity/:city", this.byCity);
        this.router.get("/bymanagementpassword/:base64", this.byPassword);
        this.router.post("/", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
exports.ManagementRouter = ManagementRouter;
//# sourceMappingURL=ManagementRouter.js.map