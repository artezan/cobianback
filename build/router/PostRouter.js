"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Post_1 = require("../models/Post");
/**
 * @apiDefine AdministratorResponseParams
 * @apiSuccess {string} name
 * @apiSuccess {ObjectId} _id
 * @apiSuccess {Date} timestamp
 */
class PostRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    all(req, res) {
        const city = req.headers.city;
        const obj = {};
        if (city !== undefined) {
            obj["city"] = city;
        }
        Post_1.default.find(obj)
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    oneById(req, res) {
        const id = req.params.id;
        Post_1.default.findById(id)
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    createPost(req, res) {
        const title = req.body.title;
        const content = req.body.content;
        const status = req.body.status;
        const tags = req.body.tags;
        const uids = req.body.uids;
        const city = req.body.city;
        const p = new Post_1.default({
            title,
            content,
            status,
            tags,
            uids,
            city,
        });
        p.save()
            .then(data => {
            res.status(201).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    update(req, res) {
        const _id = req.params.id;
        Post_1.default.findByIdAndUpdate({ _id: _id }, req.body)
            .then(data => {
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    delete(req, res) {
        const _id = req.params.id;
        Post_1.default.findByIdAndRemove({ _id: _id })
            .then(() => {
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    searchByIdOrTags(req, res) {
        const city = req.headers.city;
        const id = req.body.id;
        const tags = req.body.tags;
        Post_1.default.find({
            $or: [{ uids: id }, { tags }],
        })
            .sort({ timestamp: -1 })
            .then(data => {
            if (city !== undefined) {
                const dataFilter = data.filter((post) => post.city.some(c => c === city));
                res.status(200).json({ data: dataFilter });
            }
            else {
                res.status(200).json({ data });
            }
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    // set up our routes
    routes() {
        this.router.get("/", this.all);
        this.router.get("/:id", this.oneById);
        this.router.post("/", this.createPost);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
        this.router.post("/search", this.searchByIdOrTags);
    }
}
exports.PostRouter = PostRouter;
//# sourceMappingURL=PostRouter.js.map