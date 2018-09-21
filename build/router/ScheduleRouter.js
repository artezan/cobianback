"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Schedule_1 = require("../models/Schedule");
class ScheduleRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * @api {GET} /schedule/:id Request all by company
     * @apiVersion  0.1.0
     * @apiName get
     * @apiGroup schedule
     *
     */
    all(req, res) {
        Schedule_1.default.find()
            .populate("property")
            .populate("buyer")
            .populate("adviser")
            .populate("seller")
            .sort({ timestamp: "desc" })
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {GET} /schedule/byscheduleid/:id Request by Object Id
     * @apiVersion  0.1.0
     * @apiName getById
     * @apiGroup schedule
     *
     */
    oneById(req, res) {
        const id = req.params.id;
        Schedule_1.default.findById(id)
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
     * @api {POST} /schedule/ Request New
     * @apiVersion  0.1.0
     * @apiName post
     * @apiGroup schedule
     *
     *
     *
     * @apiParam {string} title
     * @apiParam {string} address
     * @apiParam {string} description
     * @apiParam {ObjectId} property
     * @apiParam {ObjectId} buyer
     * @apiParam {ObjectId} adviser
     * @apiParam {ObjectId} seller
     * @apiParam {string} status
     * @apiParam {string} note
     * @apiParam {number} day
     * @apiParam {number} month
     * @apiParam {number} year
     * @apiParam {number} hour
     * @apiParam {number} minute
     *
     * @apiParamExample {json} Request-Example:
     * { "dateOfEvent":"20/18/2018", "title":"Evento2", "address":"La paz", "property":"5b842b334f965c30a03c1951", "buyer":"5b84586674acb1030cabb419", "adviser":"5b8082ba69a5a10b589abc75", "status":"Pendiente", "note":"Ver Propiedad segunda visita" }
     *
     *
     * @apiSuccessExample {json} Success-Response Created User:
     * { "data": { "timestamp": "2018-08-27T21:57:08.771Z", "_id": "5b8473b42a3ac4214ce7590b", "title": "Evento2", "address": "La paz", "property": "5b842b334f965c30a03c1951", "buyer": "5b84586674acb1030cabb419", "adviser": "5b8082ba69a5a10b589abc75", "status": "Pendiente", "note": "Ver Propiedad segunda visita", "dateOfEvent": "20/18/2018", "__v": 0 } }
     */
    create(req, res) {
        const dateOfEvent = req.body.dateOfEvent;
        const title = req.body.title;
        const address = req.body.address;
        const property = req.body.property;
        const buyer = req.body.buyer;
        const adviser = req.body.adviser;
        const seller = req.body.seller;
        const administrator = req.body.administrator;
        const management = req.body.management;
        const status = req.body.status;
        const note = req.body.note;
        const day = req.body.day;
        const month = req.body.month;
        const year = req.body.year;
        const hour = req.body.hour;
        const minute = req.body.minute;
        const schedule = new Schedule_1.default({
            title,
            address,
            property,
            buyer,
            adviser,
            seller,
            administrator,
            management,
            status,
            note,
            dateOfEvent,
            day,
            month,
            year,
            hour,
            minute,
        });
        schedule
            .save()
            .then(data => {
            res.status(201).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {PUT} /schedule/:_id Request Update
     * @apiVersion  0.1.0
     * @apiName put
     * @apiGroup schedule
     *
     */
    update(req, res) {
        const _id = req.params.id;
        req.body.timestamp = new Date();
        Schedule_1.default.findByIdAndUpdate({ _id: _id }, req.body)
            .then(() => {
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {DELETE} /schedule/:id Request  Deleted
     * @apiVersion  0.1.0
     * @apiName deleteByToken
     * @apiGroup schedule
     *
     */
    delete(req, res) {
        const _id = req.params.id;
        Schedule_1.default.findByIdAndRemove({ _id: _id })
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
        this.router.get("/byscheduleid/:id", this.oneById);
        // this.router.get("/bybuyerpassword/:base64", this.byPassword);
        this.router.post("/", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
exports.ScheduleRouter = ScheduleRouter;
//# sourceMappingURL=ScheduleRouter.js.map