"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Notification_1 = require("../models/Notification");
/**
 * @apiDefine ConsultantResponseParams
 * @apiSuccess {Date} timestamp
 * @apiSuccess {number} rankingAverage Promedio de ranking de los tickets del consultor
 * @apiSuccess {ObjectId} _id
 * @apiSuccess {tickets[]} tickets
 * @apiSuccess {string} name
 * @apiSuccess {string} lastName
 * @apiSuccess {string} description Area de especialidad del Consultor
 * @apiSuccess {string} password
 * @apiSuccess {ObjectId} companyId
 */
class CreditRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * @api {GET} /consultants/bycompanyid/:companyId Request all by company
     * @apiVersion  0.1.0
     * @apiName get
     * @apiGroup Consultant
     *
     *
     * @apiSampleRequest /consultants/bycompanyid/:companyId
     *
     * @apiSuccessExample {json} Success-Response a JSON-Array<consultant>:
     * { "data": [ { "timestamp": "2018-08-10T16:08:32.439Z", "rankingAverage": 0, "tickets": [], "_id": "5b6db8805291313ddcc318b9", "name": "Consultor 1", "lastName": "Apellido", "password": "1234", "description": "Especialidad en", "companyId": "5b6db7c05291313ddcc318b7", "__v": 0 } ] }
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
    /**
     * @api {GET} /consultants/byconsultantid/:consultantId Request by Object Id
     * @apiVersion  0.1.0
     * @apiName getById
     * @apiGroup Consultant
     *
     *
     * @apiParam {ObjectId} consultantId Must be provided as QueryParam
     *
     * @apiExample Example usage:
     * http://31.220.52.51:3000/api/v1/consultants/byconsultantid/5b6db8805291313ddcc318b9
     *
     * @apiSampleRequest /consultants/byconsultantid/5b6db8805291313ddcc318b9
     *
     * @apiUse ConsultantResponseParams
     *
     * @apiSuccessExample {json} Success-Response Consultant:
     * { "data": { "timestamp": "2018-08-10T16:08:32.439Z", "rankingAverage": 0, "tickets": [], "_id": "5b6db8805291313ddcc318b9", "name": "Consultor 1", "lastName": "Apellido", "password": "1234", "description": "Especialidad en", "companyId": "5b6db7c05291313ddcc318b7", "__v": 0 } }
     */
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
    /* public byPassword(req: Request, res: Response): void {
      const strDecode: string = base64.decode(req.params.base64);
      const name = strDecode.substring(0, strDecode.indexOf(":"));
      const password = strDecode.substring(
        strDecode.indexOf(":") + 1,
        strDecode.length,
      );
  
      Buyer.find({ password: password, name: name })
        .then(data => {
          res.status(200).json({ data });
        })
        .catch(error => {
          res.status(500).json({ error });
        });
    } */
    /**
     * @api {POST} /consultants/ Request New
     * @apiVersion  0.1.0
     * @apiName post
     * @apiGroup Consultant
     *
     *
     * @apiParam {string} name
     * @apiParam {string} lastName
     * @apiParam {string} password
     * @apiParam {string} description
     * @apiParam {ObjectId} companyId
     *
     * @apiParamExample {json} Request-Example:
     * { "name":"Consultor 1", "lastName":"Apellido", "password":"1234", "description":"Especialidad en", "companyId":"5b6db7c05291313ddcc318b7" }
     *
     * @apiUse ConsultantResponseParams
     *
     * @apiSuccessExample {json} Success-Response Created User:
     * { "data": { "timestamp": "2018-08-10T16:08:32.439Z", "rankingAverage": 0, "tickets": [], "_id": "5b6db8805291313ddcc318b9", "name": "Consultor 1", "lastName": "Apellido", "password": "1234", "description": "Especialidad en", "companyId": "5b6db7c05291313ddcc318b7", "__v": 0 } }
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
     * @api {PUT} /consultants/:_id Request Update
     * @apiVersion  0.1.0
     * @apiName put
     * @apiGroup Consultant
     *
     * @apiParam {ObjectId} consultantId Must be provided as QueryParam
     * @apiParam {string} name
     * @apiParam {string} lastName
     * @apiParam {string} password
     * @apiParam {string} description
     * @apiParam {ObjectId} companyId
     *
     * @apiExample Example usage:
     * http://31.220.52.51:3000/api/v1/consultants/5b6db8805291313ddcc318b9
     *
     * @apiParamExample {json} Request-Example:
     * { "password":"3ede3" }
     *
     * @apiSuccessExample {json} Success-Response:
     * { "data": true }
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
     * @api {DELETE} /consultants/:consultantId Request  Deleted
     * @apiVersion  0.1.0
     * @apiName deleteByToken
     * @apiGroup Consultant
     *
     *
     * @apiParam {ObjectId} consultantId Must be placed as QueryParam
     *
     * @apiExample Example usage:
     * http://31.220.52.51:3000/api/v1/consultants/5b69b23777093a04244fae68
     *
     * @apiSuccessExample {json} Success-Response:
     * {"data":true}
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
exports.CreditRouter = CreditRouter;
//# sourceMappingURL=NotificationRouter.js.map