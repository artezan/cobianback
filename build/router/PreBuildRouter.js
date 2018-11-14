"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PreBuild_1 = require("../models/PreBuild");
class PreBuildRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    all(req, res) {
        PreBuild_1.default.find()
            .populate("preBuyer")
            .sort({ timestamp: -1 })
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    oneById(req, res) {
        const id = req.params.id;
        PreBuild_1.default.findById(id)
            .populate("preBuyer")
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    create(req, res) {
        const name = req.body.name;
        const timeLine = req.body.timeLine;
        const city = req.body.city;
        const preBuyer = req.body.preBuyer;
        const notes = req.body.notes;
        const preBuild = new PreBuild_1.default({
            name,
            timeLine,
            preBuyer,
            city,
            notes
        });
        preBuild
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
        PreBuild_1.default.findByIdAndUpdate({ _id: _id }, req.body)
            .then(() => {
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    delete(req, res) {
        const _id = req.params.id;
        PreBuild_1.default.findByIdAndRemove({ _id: _id })
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
        this.router.post("/", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
exports.PreBuildRouter = PreBuildRouter;
//# sourceMappingURL=PreBuildRouter.js.map