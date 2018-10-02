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
        const message = req.body.message;
        const senderId = req.body.senderId;
        const receiversId = req.body.receiversId;
        const tags = req.body.tags;
        const status = req.body.status;
        const type = req.body.type;
        const notification = new Notification_1.default({
            title,
            message,
            senderId,
            receiversId,
            tags,
            status,
            type,
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
        const id = req.params.id;
        Notification_1.default.findByIdAndUpdate(id, req.body)
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
    searchByIdOrTags(req, res) {
        const id = req.body.id;
        const pageNumber = req.body.pageNumber;
        const nPerPage = req.body.nPerPage;
        const tags = req.body.tags;
        Notification_1.default.find({
            $or: [{ senderId: id }, { receiversId: id }, { tags }],
        })
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
    // set up our routes
    routes() {
        this.router.get("/", this.all);
        this.router.get("/bynotificationid/:id", this.oneById);
        // this.router.get("/bybuyerpassword/:base64", this.byPassword);
        this.router.post("/", this.create);
        this.router.post("/search", this.searchByIdOrTags);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
exports.NotificationRouter = NotificationRouter;
//# sourceMappingURL=NotificationRouter.js.map