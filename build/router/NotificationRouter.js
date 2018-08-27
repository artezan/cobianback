"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Notification_1 = require("../models/Notification");
class NotificationRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * @api {GET} /notification/ Request all
     * @apiVersion  0.1.0
     * @apiName get
     * @apiGroup notification
     *
     */
    all(req, res) {
        Notification_1.default.find()
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    oneById(req, res) {
        const id = req.params.id;
        Notification_1.default.findById(id)
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {POST} /notification/ Request New
     * @apiVersion  0.1.0
     * @apiName post
     * @apiGroup notification
     *
     */
    create(req, res) {
        const title = req.body.title;
        const content = req.body.content;
        const notification = new Notification_1.default({
            title,
            content,
        });
        notification
            .save()
            .then(data => {
            res.status(201).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {PUT} /notification/:_id Request Update
     * @apiVersion  0.1.0
     * @apiName put
     * @apiGroup notification
     */
    update(req, res) {
        const _id = req.params.id;
        Notification_1.default.findByIdAndUpdate({ _id: _id }, req.body)
            .then(() => {
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {DELETE} /notification/:id Request  Deleted
     * @apiVersion  0.1.0
     * @apiName deleteByToken
     * @apiGroup notification
     *
     */
    delete(req, res) {
        const _id = req.params.id;
        Notification_1.default.findByIdAndRemove({ _id: _id })
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
        this.router.get("/bynotificationid/:id", this.oneById);
        // this.router.get("/bybuyerpassword/:base64", this.byPassword);
        this.router.post("/", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
exports.NotificationRouter = NotificationRouter;
//# sourceMappingURL=NotificationRouter.js.map