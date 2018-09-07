"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Administrator_1 = require("../models/Administrator");
/**
 * @apiDefine AdministratorResponseParams
 * @apiSuccess {string} name
 * @apiSuccess {ObjectId} _id
 * @apiSuccess {Date} timestamp
 */
class AdministratorRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * @api {GET} /administrator/ Request all
     * @apiVersion  0.1.0
     * @apiName get
     * @apiGroup administrator
     *
     *
     * @apiSampleRequest /administrator/
     *
     * @apiSuccessExample {json} Success-Response a JSON-Array<administrator>:
     * { "data": { "timestamp": "2018-08-27T14:49:37.217Z", "_id": "5b840f8116b1cf2accc95ae4", "name": "admin2", "password": "cobian2018", "__v": 0 } }
     */
    all(req, res) {
        Administrator_1.default.find()
            .populate({
            path: "schedule",
            populate: [{ path: "adviser" }, { path: "property" }],
        })
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {GET} /administrator/:id Request by Object Id
     * @apiVersion  0.1.0
     * @apiName getByNameAndPassword
     * @apiGroup administrator
     *
     *
     * @apiParam {ObjectId} id Must be provided as QueryParam
     *
     *
     * @apiSampleRequest /administrator/
     *
     * @apiUse AdministratorResponseParams
     *
     * @apiSuccessExample {json} Success-Response Company:
     * { "data": { "timestamp": "2018-08-27T14:49:37.217Z", "_id": "5b840f8116b1cf2accc95ae4", "name": "admin2", "password": "cobian2018", "__v": 0 } }
     */
    oneById(req, res) {
        const id = req.params.id;
        Administrator_1.default.findById(id)
            .populate({
            path: "schedule",
            populate: [{ path: "adviser" }, { path: "property" }],
        })
            .populate("goal")
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {POST} /administrator/ Request New
     * @apiVersion  0.1.0
     * @apiName post
     * @apiGroup administrator
     *
     *
     * @apiParam {string} name
     * @apiParam {string} password
     *
     * @apiParamExample {json} Request-Example:
     * { "name":"admin2", "password":"cobian2018" }
     *
     * @apiUse AdministratorResponseParams
     *
     * @apiSuccessExample {json} Success-Response Created Company:
     * { "data": { "timestamp": "2018-08-27T14:49:37.217Z", "_id": "5b840f8116b1cf2accc95ae4", "name": "admin2", "password": "cobian2018", "__v": 0 } }
     */
    createAdmin(req, res) {
        const name = req.body.name;
        const password = req.body.password;
        const admin = new Administrator_1.default({
            name,
            password,
        });
        admin
            .save()
            .then(data => {
            res.status(201).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    update(req, res) {
        const _id = req.params.id;
        Administrator_1.default.findByIdAndUpdate({ _id: _id }, req.body)
            .then(data => {
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    delete(req, res) {
        const _id = req.params.id;
        Administrator_1.default.findByIdAndRemove({ _id: _id })
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
        this.router.get("/:id", this.oneById);
        this.router.post("/", this.createAdmin);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
exports.AdministratorRouter = AdministratorRouter;
//# sourceMappingURL=AdministratorRouter.js.map