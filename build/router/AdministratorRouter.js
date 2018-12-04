"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Administrator_1 = require("../models/Administrator");
const Ofert_1 = require("../models/Ofert");
const Credit_1 = require("../models/Credit");
const Schedule_1 = require("../models/Schedule");
const StatusBuyerProperty_1 = require("../models/StatusBuyerProperty");
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
        const email = req.body.email;
        const admin = new Administrator_1.default({
            name,
            password,
            email,
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
    allEvents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageNumber = req.body.pageNumber;
            const nPerPage = req.body.nPerPage;
            const numSchemas = 4;
            // ofert
            const oferts = yield Ofert_1.default.find()
                .populate("buyer")
                .populate("property")
                .sort({ timestamp: -1 })
                .skip(pageNumber > 0 ? (pageNumber - 1) * (nPerPage / numSchemas) : 0)
                .limit(Math.round(nPerPage / numSchemas));
            // credit
            const credits = yield Credit_1.default.find()
                .populate("buyer")
                .populate("property")
                .sort({ timestamp: -1 })
                .skip(pageNumber > 0 ? (pageNumber - 1) * (nPerPage / numSchemas) : 0)
                .limit(Math.round(nPerPage / numSchemas));
            // schedule
            const schedules = yield Schedule_1.default.find()
                .populate("property")
                .populate("buyer")
                .populate("adviser")
                .populate("seller")
                .sort({ timestamp: -1 })
                .skip(pageNumber > 0 ? (pageNumber - 1) * (nPerPage / numSchemas) : 0)
                .limit(Math.round(nPerPage / numSchemas));
            // sbp
            const sbps = yield StatusBuyerProperty_1.default.find()
                .populate("property")
                .populate({
                path: "buyer",
                populate: [{ path: "credit" }, { path: "ofert" }],
            })
                .sort({ timestamp: -1 })
                .skip(pageNumber > 0 ? (pageNumber - 1) * (nPerPage / numSchemas) : 0)
                .limit(Math.round(nPerPage / numSchemas));
            // crear datos para front
            const allData = [];
            oferts.forEach(ofert => {
                allData.push({
                    type: "ofert",
                    time: ofert.timestamp,
                    data: { oferts: ofert },
                });
            });
            schedules.forEach(schedule => {
                if (!schedule.administrator &&
                    !schedule.personal &&
                    schedule.buyer &&
                    schedule.adviser) {
                    allData.push({
                        type: "schedule",
                        time: schedule.timestamp.toString(),
                        data: { schedules: schedule },
                    });
                }
            });
            credits.forEach(credit => {
                allData.push({
                    type: "credit",
                    time: credit.timestamp.toString(),
                    data: { credits: credit },
                });
            });
            sbps.forEach(sbp => {
                if (sbp.buyer && sbp.property) {
                    allData.push({
                        type: "sbp",
                        time: sbp.timestamp.toString(),
                        data: { sbps: sbp },
                    });
                }
            });
            allData.sort((a, b) => {
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
                return new Date(b.time) - new Date(a.time);
            });
            /* --pageNumber;
            allData = allData.slice(pageNumber * nPerPage, (pageNumber + 1) * nPerPage);*/
            res.status(200).json({ data: allData });
        });
    }
    // set up our routes
    routes() {
        this.router.get("/", this.all);
        this.router.get("/:id", this.oneById);
        this.router.post("/events", this.allEvents);
        this.router.post("/", this.createAdmin);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
exports.AdministratorRouter = AdministratorRouter;
//# sourceMappingURL=AdministratorRouter.js.map