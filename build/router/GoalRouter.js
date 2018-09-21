"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Goal_1 = require("../models/Goal");
class GoalRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * @api {GET} /goal/ Request all by company
     * @apiVersion  0.1.0
     * @apiName get
     * @apiGroup goal
     *
     */
    all(req, res) {
        Goal_1.default.find()
            .populate("adviser")
            .sort({ timestamp: -1 })
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {GET} /goal/bygoalid/:id Request by Object Id
     * @apiVersion  0.1.0
     * @apiName getById
     * @apiGroup goal
     *
     */
    oneById(req, res) {
        const id = req.params.id;
        Goal_1.default.findById(id)
            .populate("adviser")
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {POST} /goal/ Request New
     * @apiVersion  0.1.0
     * @apiName post
     * @apiGroup goal
     *
     *
     * @apiParam {string} content Descripcion de meta
     * @apiParam {ObjetId[]} adviser Asesores
     * @apiParam {string} status
     * @apiParam {number} dataNumber Dato Cuantitativo
     * @apiParam {boolean} isByManagement Personal o equipo
     * @apiParam {string} title Titulo
     * @apiParam {string} dateLimit Fecha limite
     *
     * @apiParamExample {json} Request-Example:
     * { "adviser":"5b8082ba69a5a10b589abc75", "status":"sin completar", "dataNumber":2, "isByManagement":false, "title":"Objetivo1", "content": "Ventas por mes", "dateLimit": "20/11/2018" }
     *
     *
     * @apiSuccessExample {json} Success-Response Created User:
     * { "data": { "timestamp": "2018-08-27T21:11:44.455Z", "adviser": [ "5b8082ba69a5a10b589abc75" ], "dataNumber": 2, "isComplete": false, "_id": "5b8469105b769522d8806ff0", "content": "Ventas por mes", "status": "sin completar", "isByManagement": false, "title": "Objetivo1", "dateLimit": "20/11/2018", "__v": 0 } }
     */
    create(req, res) {
        const content = req.body.content;
        const adviser = req.body.adviser;
        const status = req.body.status;
        const title = req.body.title;
        const day = req.body.day;
        const month = req.body.month;
        const year = req.body.year;
        const isComplete = req.body.isComplete;
        const isByManagement = req.body.isByManagement;
        const goals = req.body.goals;
        const goal = new Goal_1.default({
            content,
            adviser,
            status,
            goals,
            isComplete,
            isByManagement,
            title,
            day,
            month,
            year,
        });
        goal
            .save()
            .then(data => {
            res.status(201).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {PUT} /goal/:_id Request Update
     * @apiVersion  0.1.0
     * @apiName put
     * @apiGroup goal
     *
     */
    update(req, res) {
        const _id = req.params.id;
        // req.body.timestamp = new Date();
        Goal_1.default.findByIdAndUpdate({ _id: _id }, req.body)
            .then(() => {
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {DELETE} /goal/:id Request  Deleted
     * @apiVersion  0.1.0
     * @apiName deleteByToken
     * @apiGroup goal
     *
     */
    delete(req, res) {
        const _id = req.params.id;
        Goal_1.default.findByIdAndRemove({ _id: _id })
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
        this.router.get("/bygoalid/:id", this.oneById);
        // this.router.get("/bybuyerpassword/:base64", this.byPassword);
        this.router.post("/", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
exports.GoalRouter = GoalRouter;
//# sourceMappingURL=GoalRouter.js.map