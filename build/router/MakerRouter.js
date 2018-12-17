"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Maker_1 = require("../models/Maker");
class MakerRouter {
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
        const city = req.headers.city;
        const obj = {};
        if (city !== undefined) {
            obj["city"] = city;
        }
        Maker_1.default.find(obj)
            .sort({ timestamp: -1 })
            .populate("build")
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
        Maker_1.default.findById(id)
            .populate("build")
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
        const name = req.body.name;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const phone = req.body.phone;
        const build = req.body.build;
        const city = req.body.city;
        const password = req.body.password;
        const maker = new Maker_1.default({
            name,
            lastName,
            email,
            phone,
            build,
            city,
            password,
        });
        maker
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
        Maker_1.default.findByIdAndUpdate({ _id: _id }, req.body)
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
        Maker_1.default.findByIdAndRemove({ _id: _id })
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
        this.router.get("/bymakerid/:id", this.oneById);
        // this.router.get("/bybuyerpassword/:base64", this.byPassword);
        this.router.post("/", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
exports.MakerRouter = MakerRouter;
//# sourceMappingURL=MakerRouter.js.map