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
const PreBuyer_1 = require("../models/PreBuyer");
const Chat_1 = require("../models/Chat");
const PreBuild_1 = require("../models/PreBuild");
class PreBuyerRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    all(req, res) {
        PreBuyer_1.default.find()
            .populate("preBuild")
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
        PreBuyer_1.default.findById(id)
            .populate("preBuild")
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    create(req, res) {
        const name = req.body.name;
        const lastName = req.body.lastName;
        const password = req.body.password;
        const email = req.body.email;
        const phone = req.body.phone;
        const preBuild = req.body.preBuild;
        const preBuyer = new PreBuyer_1.default({
            name,
            lastName,
            password,
            email,
            preBuild,
            phone,
        });
        preBuyer
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
        PreBuyer_1.default.findByIdAndUpdate({ _id: _id }, req.body)
            .then(() => {
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.params.id;
            yield PreBuild_1.default.update({ preBuyer: { $in: [_id] } }, { $pull: { preBuyer: { $in: [_id] } } });
            yield Chat_1.default.find({ buyer: _id }).remove();
            PreBuyer_1.default.findByIdAndRemove({ _id: _id })
                .then(() => {
                res.status(200).json({ data: true });
            })
                .catch(error => {
                res.status(500).json({ error });
            });
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
exports.PreBuyerRouter = PreBuyerRouter;
//# sourceMappingURL=PreBuyerRouter.js.map