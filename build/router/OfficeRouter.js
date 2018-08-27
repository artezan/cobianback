"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const base64 = require("base-64");
const Office_1 = require("../models/Office");
class OfficeRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * @api {GET} /office/Request all
     * @apiVersion  0.1.0
     * @apiName get
     * @apiGroup office
     */
    all(req, res) {
        Office_1.default.find()
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {GET} /office/byofficeid/:id Request by Object Id
     * @apiVersion  0.1.0
     * @apiName getById
     * @apiGroup office
     *
     */
    oneById(req, res) {
        const id = req.params.id;
        Office_1.default.findById(id)
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    byPassword(req, res) {
        const strDecode = base64.decode(req.params.base64);
        const name = strDecode.substring(0, strDecode.indexOf(":"));
        const password = strDecode.substring(strDecode.indexOf(":") + 1, strDecode.length);
        Office_1.default.find({ password: password, name: name })
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {POST} /office/ Request New
     * @apiVersion  0.1.0
     * @apiName post
     * @apiGroup office
     *
     *
     * @apiParam {string} name
     * @apiParam {string} password
     *
     */
    create(req, res) {
        const name = req.body.name;
        const password = req.body.password;
        const office = new Office_1.default({
            name,
            password,
        });
        office
            .save()
            .then(data => {
            res.status(201).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {PUT} /office/:_id Request Update
     * @apiVersion  0.1.0
     * @apiName put
     * @apiGroup office
     *
     */
    update(req, res) {
        const _id = req.params.id;
        Office_1.default.findByIdAndUpdate({ _id: _id }, req.body)
            .then(() => {
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {DELETE} /office/:id Request  Deleted
     * @apiVersion  0.1.0
     * @apiName deleteByToken
     * @apiGroup office
     *
     */
    delete(req, res) {
        const _id = req.params.id;
        Office_1.default.findByIdAndRemove({ _id: _id })
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
        this.router.get("/byofficeid/:id", this.oneById);
        this.router.get("/byofficepassword/:base64", this.byPassword);
        this.router.post("/", this.create);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
    }
}
exports.OfficeRouter = OfficeRouter;
//# sourceMappingURL=OfficeRouter.js.map