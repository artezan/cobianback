"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer = require("multer");
const path = require("path");
const Build_1 = require("../models/Build");
const mongodb_1 = require("mongodb");
const fs = require("fs");
/**
 * @apiDefine AdviserResponseParams
 * @apiSuccess {Date} timestamp
 * @apiSuccess {ISchedule[]} schedule Calendario
 * @apiSuccess {number} hourStart Hora inicio servicio
 * @apiSuccess {number} hourEnd Hora fin de servicio
 * @apiSuccess {IBuyer[]} buyer Compradores asignados
 * @apiSuccess {IGoal[]} goal Objetivos planteados
 * @apiSuccess {INotification[]} notification Historial notificaciones
 * @apiSuccess {boolean} isRenter Si renta o vende
 * @apiSuccess {string} name
 * @apiSuccess {string} lastName
 * @apiSuccess {string} password
 * @apiSuccess {string} email
 * @apiSuccess {ObjectId} companyId
 */
class BuildRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * @api {GET} /adviser/ Request all
     * @apiVersion  0.1.0
     * @apiName get
     * @apiGroup adviser
     *
     *
     * @apiSampleRequest /adviser/
     *
     * @apiSuccessExample {json} Success-Response a JSON-Array<consultant>:
     * { "data": [ { "timestamp": "2018-08-24T22:12:10.843Z", "schedule": [], "buyer": [], "goal": [], "notification": [], "_id": "5b8082ba69a5a10b589abc75", "name": "asesor", "lastName": "apellido", "password": "cobian2018", "email": "asesor@correo.com", "hourStart": 9, "hourEnd": 18, "isRenter": false, "__v": 0 }, { "timestamp": "2018-08-24T22:12:43.596Z", "schedule": [], "buyer": [], "goal": [], "notification": [], "_id": "5b8082db69a5a10b589abc76", "name": "asesor2", "lastName": "apellido", "password": "cobian2018", "email": "asesor2@correo.com", "hourStart": 10, "hourEnd": 18, "isRenter": true, "__v": 0 }, { "timestamp": "2018-08-24T22:13:03.608Z", "schedule": [], "buyer": [], "goal": [], "notification": [], "_id": "5b8082ef69a5a10b589abc77", "name": "asesor3", "lastName": "apellido", "password": "cobian2018", "email": "asesor3@correo.com", "hourStart": 7, "hourEnd": 20, "isRenter": true, "__v": 0 }, { "timestamp": "2018-08-24T22:13:28.257Z", "schedule": [], "buyer": [], "goal": [], "notification": [], "_id": "5b80830869a5a10b589abc78", "name": "asesor4", "lastName": "apellido", "password": "cobian2018", "email": "asesor4@correo.com", "hourStart": 7, "hourEnd": 21, "isRenter": false, "__v": 0 }, { "timestamp": "2018-08-27T15:00:31.181Z", "schedule": [], "buyer": [], "goal": [], "notification": [], "_id": "5b84120f0255c71b3c0a21d8", "name": "asesor5", "lastName": "apellido", "password": "cobian2018", "email": "asesor5@correo.com", "hourStart": 8, "hourEnd": 22, "isRenter": true, "__v": 0 } ] }
     */
    all(req, res) {
        Build_1.default.find()
            .populate("maker")
            .sort({ timestamp: -1 })
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {GET} /adviser/byadviserid/:id Request by Object Id
     * @apiVersion  0.1.0
     * @apiName getById
     * @apiGroup adviser
     *
     *
     * @apiParam {ObjectId} consultantId Must be provided as QueryParam
     *
     *
     * @apiSampleRequest /adviser/byadviserid/5b8082ba69a5a10b589abc75
     *
     * @apiUse AdviserResponseParams
     *
     * @apiSuccessExample {json} Success-Response Consultant:
     * { "data": { "timestamp": "2018-08-24T22:12:10.843Z", "schedule": [], "buyer": [], "goal": [], "notification": [], "_id": "5b8082ba69a5a10b589abc75", "name": "asesor", "lastName": "apellido", "password": "cobian2018", "email": "asesor@correo.com", "hourStart": 9, "hourEnd": 18, "isRenter": false, "__v": 0 } }
     */
    oneById(req, res) {
        const id = req.params.id;
        Build_1.default.findById(id)
            .populate("maker")
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {GET} byadviserpassword/:base64 Request by Object Pass
     * @apiVersion  0.1.0
     * @apiName getByPass
     * @apiGroup adviser
     *
     *
     * @apiParam {ObjectId} b64(name:password) Must be provided as QueryParam
     *
     *
     * @apiSampleRequest /adviser/byadviserid/5b8082ba69a5a10b589abc75
     *
     * @apiUse AdviserResponseParams
     *
     * @apiSuccessExample {json} Success-Response Consultant:
     * { "data": { "timestamp": "2018-08-24T22:12:10.843Z", "schedule": [], "buyer": [], "goal": [], "notification": [], "_id": "5b8082ba69a5a10b589abc75", "name": "asesor", "lastName": "apellido", "password": "cobian2018", "email": "asesor@correo.com", "hourStart": 9, "hourEnd": 18, "isRenter": false, "__v": 0 } }
     */
    /*   public byPassword(req: Request, res: Response): void {
      const strDecode: string = base64.decode(req.params.base64);
      const name = strDecode.substring(0, strDecode.indexOf(":"));
      const password = strDecode.substring(
        strDecode.indexOf(":") + 1,
        strDecode.length,
      );
  
      Adviser.find({ password: password, name: name })
        .then(data => {
          res.status(200).json({ data });
        })
        .catch(error => {
          res.status(500).json({ error });
        });
    } */
    /**
     * @api {GET} /byadvisercity/:city Request by Object City
     * @apiVersion  0.1.0
     * @apiName getByCity
     * @apiGroup adviser
     *
     *
     */
    /* public byCity(req: Request, res: Response): void {
      const city: string = req.params.city;
  
      Adviser.find({ city: city })
        .populate("schedule")
        .populate("buyer")
        .populate("goal")
        .populate("notification")
        .then(data => {
          res.status(200).json({ data });
        })
        .catch(error => {
          res.status(500).json({ error });
        });
    } */
    /**
     * @api {POST} /adviser/ Request New
     * @apiVersion  0.1.0
     * @apiName post
     * @apiGroup adviser
     *
     *
     * @apiParam {string} name
     * @apiParam {string} lastName
     * @apiParam {string} password
     * @apiParam {string} email
     * @apiParam {number} hourStart
     * @apiParam {number} hourEnd
     * @apiParam {boolean} isRenter
     *
     * @apiParamExample {json} Request-Example:
     * { "name":"asesor5", "password":"cobian2018", "lastName":"apellido", "email":"asesor5@correo.com", "hourStart":8, "hourEnd":22, "isRenter":true }
     *
     *
     * @apiUse AdviserResponseParams
     *
     * @apiSuccessExample {json} Success-Response Created User:
     * { "data": { "timestamp": "2018-08-27T15:00:31.181Z", "schedule": [], "buyer": [], "goal": [], "notification": [], "_id": "5b84120f0255c71b3c0a21d8", "name": "asesor5", "lastName": "apellido", "password": "cobian2018", "email": "asesor5@correo.com", "hourStart": 8, "hourEnd": 22, "isRenter": true, "__v": 0 } }
     */
    create(req, res) {
        const name = req.body.name;
        const timeLine = req.body.timeLine;
        const maker = req.body.maker;
        const notes = req.body.notes;
        const city = req.body.city;
        const build = new Build_1.default({
            name,
            timeLine,
            maker,
            notes,
            city,
        });
        build
            .save()
            .then(data => {
            res.status(201).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {PUT} /adviser/:_id Request Update
     * @apiVersion  0.1.0
     * @apiName put
     * @apiGroup adviser
     *
     * @apiParam {ObjectId} adviserId Must be provided as QueryParam
     *  @apiParam {ISchedule[]} schedule Calendario
     *  @apiParam {number} hourStart Hora inicio servicio
     *  @apiParam {number} hourEnd Hora fin de servicio
     *  @apiParam {IBuyer[]} buyer Compradores asignados
     *  @apiParam {IGoal[]} goal Objetivos planteados
     *  @apiParam {INotification[]} notification Historial notificaciones
     *  @apiParam {boolean} isRenter Si renta o vende
     *  @apiParam {string} name
     * @apiParam {string} lastName
     * @apiParam {string} password
     * @apiParam {string} email
     *
     *
     * @apiParamExample {json} Request-Example:
     * { "isRenter": true }
     *
     * @apiSuccessExample {json} Success-Response:
     * { "data": true }
     */
    update(req, res) {
        const _id = req.params.id;
        Build_1.default.findByIdAndUpdate({ _id: _id }, req.body)
            .then(() => {
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {DELETE} /adviser/:id Request  Deleted
     * @apiVersion  0.1.0
     * @apiName deleteByToken
     * @apiGroup adviser
     *
     */
    delete(req, res) {
        const _id = req.params.id;
        Build_1.default.findByIdAndRemove({ _id: _id })
            .then(() => {
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    uploadFile(req, res) {
        const storage = multer.diskStorage({
            destination: "./build/public",
            // tslint:disable-next-line:no-shadowed-variable
            filename: (req, file, cb) => {
                cb(
                // tslint:disable-next-line:no-null-keyword
                null, 
                /* file.fieldname + "-" +  */ path.parse(file.originalname).name +
                    path.extname(file.originalname));
            },
        });
        const upload = multer({
            storage,
        }).array("imagen1", 10);
        upload(req, res, err => {
            if (err) {
                res.status(500).json({ err });
            }
            else {
                const filenames = req.files.map(f => f.filename);
                res.status(200).json({ data: filenames });
            }
        });
    }
    deleteFile(req, res) {
        const filePath = `./build/public/${req.params.fileName}`;
        fs.unlink(filePath, err => {
            if (err) {
                res.status(500).json({ err });
            }
            else {
                res.status(200).json({ data: true });
            }
        });
        // const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    }
    /**
     * changeImgPhase
     */
    changeImgPhase(req, res) {
        const _id = req.params.id;
        const timeLine = req.body.timeLine;
        Build_1.default.findById({ _id: _id })
            .then(build => {
            const findIndex = build.timeLine.findIndex(b => new mongodb_1.ObjectId(b._id).toString() ===
                new mongodb_1.ObjectId(timeLine._id).toString());
            build.timeLine[findIndex] = timeLine;
            build
                .save()
                .then(data => {
                res.status(200).json({ data: data });
            })
                .catch(error => {
                res.status(500).json({ error });
            });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    // set up our routes
    routes() {
        this.router.get("/", this.all);
        this.router.get("/bybuildid/:id", this.oneById);
        this.router.get("/deleteFile/:fileName", this.deleteFile);
        // this.router.get("/bybuildcity/:city", this.byCity);
        // this.router.get("/byadviserpassword/:base64", this.byPassword);
        this.router.post("/", this.create);
        this.router.put("/updatephase/:id", this.changeImgPhase);
        this.router.put("/:id", this.update);
        this.router.delete("/:id", this.delete);
        this.router.post("/uploadImg", this.uploadFile);
    }
}
exports.BuildRouter = BuildRouter;
//# sourceMappingURL=BuildRouter.js.map