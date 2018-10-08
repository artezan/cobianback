"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongodb_1 = require("mongodb");
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
            .sort({ timestamp: "asc" })
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    allPage(req, res) {
        const pageNumber = req.body.pageNumber;
        const nPerPage = req.body.nPerPage;
        Schedule_1.default.find()
            .populate("property")
            .populate("buyer")
            .populate("adviser")
            .populate("seller")
            .sort({ timestamp: -1 })
            .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
            .limit(nPerPage)
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
        const personal = req.body.personal;
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
            personal,
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
    check(req, res) {
        const property = req.body.property;
        const buyer = req.body.buyer;
        const adviser = req.body.adviser;
        const seller = req.body.seller;
        const personal = req.body.personal;
        const month = +req.body.month;
        const year = +req.body.year;
        const hour = +req.body.hour;
        const day = +req.body.day;
        const _id = req.body._id;
        let check = {};
        // const minute: string = req.body.minute;
        Schedule_1.default.find()
            .then(schedules => {
            const arrSchedules = schedules.filter(s => new mongodb_1.ObjectId(s._id).toString() !== new mongodb_1.ObjectId(_id).toString());
            const scheduleFind = arrSchedules.filter(s => s.year === year &&
                s.month === month &&
                s.day === day &&
                s.hour === hour);
            console.log(scheduleFind);
            if (scheduleFind.length > 0) {
                check.buyerCan = !!!scheduleFind.find(s => new mongodb_1.ObjectId(s.buyer).toString() ===
                    new mongodb_1.ObjectId(buyer).toString());
                check.adviserCan = !!!scheduleFind.find(s => new mongodb_1.ObjectId(s.adviser).toString() ===
                    new mongodb_1.ObjectId(adviser).toString());
                check.propertyCan = !!!scheduleFind.find(s => new mongodb_1.ObjectId(s.property).toString() ===
                    new mongodb_1.ObjectId(property).toString());
                /* check = {
                  adviserCan: !(
                    new ObjectId(scheduleFind.adviser).toString() ===
                      new ObjectId(adviser).toString() ||
                    (scheduleFind.personal &&
                      new ObjectId(scheduleFind.personal).toString() ===
                        new ObjectId(adviser).toString())
                  ),
                  buyerCan: !(
                    new ObjectId(scheduleFind.buyer).toString() ===
                    new ObjectId(buyer).toString()
                  ),
                  propertyCan: !(
                    new ObjectId(scheduleFind.property).toString() ===
                    new ObjectId(property).toString()
                  ),
                }; */
            }
            else {
                check = {
                    adviserCan: true,
                    buyerCan: true,
                    propertyCan: true,
                };
            }
            console.log(check);
            res.status(200).json({ data: check });
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
        this.router.post("/page", this.allPage);
        this.router.post("/checkschedule", this.check);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
exports.ScheduleRouter = ScheduleRouter;
//# sourceMappingURL=ScheduleRouter.js.map