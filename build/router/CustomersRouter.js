"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Customer_1 = require("../models/Customer");
const multer = require("multer");
const path = require("path");
const base64 = require("base-64");
/**
 * @apiDefine CustomersResponseParams
 * @apiSuccess {Date} timestamp
 * @apiSuccess {number} totalHours Suma de horas de los tickets del cliente
 * @apiSuccess {ObjectId} _id
 * @apiSuccess {tickets[]} tickets
 * @apiSuccess {string} logo
 * @apiSuccess {string} name
 * @apiSuccess {string} adress
 * @apiSuccess {number} phone
 * @apiSuccess {string} email
 * @apiSuccess {string} workArea Area de desempeño del cliente
 * @apiSuccess {string} password
 * @apiSuccess {ObjectId} companyId
 */
class CustomersRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * @api {GET} /customers/bycompanyid/:companyId Request all by companyId
     * @apiVersion  0.1.0
     * @apiName get
     * @apiGroup Customers
     *
     *
     * @apiSampleRequest /customers/bycompanyid/5b6da8da15199540284396ce
     *
     * @apiSuccessExample {json} Success-Response a JSON-Array<customer>:
     * { "data": [ { "timestamp": "2018-08-10T15:37:34.097Z", "totalHours": 0, "tickets": [], "_id": "5b6db13e09d62f219495a7dd", "logo": "http://31.220.52.51:3000/LOGO.png", "name": "Cliente 1", "adress": "Direccion 1", "phone": 22222, "email": "cliente@gmail.com", "workArea": "Industria de ...", "password": "12345", "companyId": "5b6da8da15199540284396ce", "__v": 0 } ] }
     */
    all(req, res) {
        const companyId = req.params.companyId;
        Customer_1.default.find({ companyId: companyId })
            .populate("tickets")
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {GET} /customers/bycustomerid/:_id Request by Object Id
     * @apiVersion  0.1.0
     * @apiName getById
     * @apiGroup Customers
     *
     *
     * @apiParam {ObjectId} _id Must be provided as QueryParam
     *
     * @apiExample Example usage:
     * http://31.220.52.51:3000/api/v1/customers/bycustomerid/5b6db13e09d62f219495a7dd
     *
     * @apiSampleRequest customers/bycustomerid/5b6db13e09d62f219495a7dd
     *
     * @apiUse CustomersResponseParams
     *
     * @apiSuccessExample {json} Success-Response Customer:
     * { "data": { "timestamp": "2018-08-10T15:37:34.097Z", "totalHours": 0, "tickets": [], "_id": "5b6db13e09d62f219495a7dd", "logo": "http://31.220.52.51:3000/LOGO.png", "name": "Cliente 1", "adress": "Direccion 1", "phone": 22222, "email": "cliente@gmail.com", "workArea": "Industria de ...", "password": "12345", "companyId": "5b6da8da15199540284396ce", "__v": 0 } }
     */
    oneById(req, res) {
        const customerId = req.params.customerId;
        Customer_1.default.findById(customerId)
            // .populate("tickets")
            .populate({ path: "tickets", populate: { path: "consultant" } })
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
        Customer_1.default.find({ password: password, name: name })
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {POST} /customers/ Request New
     * @apiVersion  0.1.0
     * @apiName post
     * @apiGroup Customers
     *
     *
     * @apiParam {string} [logo]
     * @apiParam {string} name
     * @apiParam {string} [adress]
     * @apiParam {tickets[]} tickets._id
     * @apiParam {number} phone
     * @apiParam {string} email
     * @apiParam {string} password
     * @apiParam {string} workArea
     * @apiParam {ObjectId} companyId
     *
     * @apiParamExample {json} Request-Example:
     * { "logo":"http://31.220.52.51:3000/LOGO.png", "name":"Cliente 1", "adress":"Direccion 1", "tickets":[], "phone":"22222", "email":"cliente@gmail.com", "password":"12345", "workArea":"Industria de ...", "companyId":"5b6da8da15199540284396ce" }
     *
     * @apiUse CustomersResponseParams
     *
     * @apiSuccessExample {json} Success-Response Created User:
     * { "data": { "timestamp": "2018-08-10T15:37:34.097Z", "totalHours": 0, "tickets": [], "_id": "5b6db13e09d62f219495a7dd", "logo": "http://31.220.52.51:3000/LOGO.png", "name": "Cliente 1", "adress": "Direccion 1", "phone": 22222, "email": "cliente@gmail.com", "workArea": "Industria de ...", "password": "12345", "companyId": "5b6da8da15199540284396ce", "__v": 0 } }
     */
    create(req, res) {
        const logo = req.body.logo;
        const name = req.body.name;
        const adress = req.body.adress;
        const tickets = req.body.tickets;
        const totalHours = req.body.totalHours;
        const phone = req.body.phone;
        const email = req.body.email;
        const password = req.body.password;
        const workArea = req.body.workArea;
        const companyId = req.body.companyId;
        const customer = new Customer_1.default({
            logo,
            name,
            adress,
            tickets,
            totalHours,
            phone,
            email,
            workArea,
            password,
            companyId,
        });
        customer
            .save()
            .then(data => {
            res.status(201).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {PUT} /customers/:customerId Request Update
     * @apiVersion  0.1.0
     * @apiName put
     * @apiGroup Customers
     *
     *
     * @apiParam {ObjectId} customerId Must be placed as QueryParam
     * @apiParam {string} [logo]
     * @apiParam {string} name
     * @apiParam {string} [adress]
     * @apiParam {tickets[]} tickets._id
     * @apiParam {number} phone
     * @apiParam {string} email
     * @apiParam {string} password
     * @apiParam {string} workArea
     * @apiParam {ObjectId} companyId
     *
     * @apiExample Example usage:
     * http://31.220.52.51:3000:3000/api/v1/customers/5b6db13e09d62f219495a7dd
     *
     * @apiParamExample {json} Request-Example:
     * { "phone":"2224444" }
     *
     * @apiSuccessExample {json} Success-Response:
     * { "data": true }
     */
    update(req, res) {
        const _id = req.params.customerId;
        Customer_1.default.findByIdAndUpdate({ _id: _id }, req.body)
            .then(() => {
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {DELETE} /customers/:customerId Request  Deleted
     * @apiVersion  0.1.0
     * @apiName deleteByToken
     * @apiGroup Customers
     *
     *
     * @apiParam {ObjectId} customerId Must be placed as QueryParam
     *
     * @apiExample Example usage:
     * http://31.220.52.51:3000/api/v1/customers/5b69b23777093a04244fae68
     *
     * @apiSuccessExample {json} Success-Response:
     * {"data":true}
     */
    delete(req, res) {
        const _id = req.params.customerId;
        Customer_1.default.findByIdAndRemove({ _id: _id })
            .then(() => {
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {POST} /customers/uploadImg Request Upload Logo
     * @apiVersion  0.1.0
     * @apiName post/Upload photo
     * @apiGroup Customers
     * @apiDescription
     * Se debe enviar la imagen con form-data y con key imagen1
     * La imagen se guarda en http://31.220.52.51:3000/Nombre.png
     *
     * @apiparam {File} imagen1 Form-based File Upload in HTML.
     *
     * @apiParamExample {json} Request-Example:
     * { "imagen1":"File" }
     *
     *
     * @apiSuccessExample {json} Success-Response Created User:
     * { "data": "build/public/LOGO.png" }
     */
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
        }).single("imagen1");
        upload(req, res, err => {
            if (err) {
                res.status(500).json({ err });
            }
            else {
                res.status(200).json({ data: req.file.path });
            }
        });
    }
    // set up our routes
    routes() {
        this.router.get("/bycompanyid/:companyId", this.all);
        this.router.get("/bycustomerid/:customerId", this.oneById);
        this.router.get("/bycustomerpassword/:base64", this.byPassword);
        this.router.post("/", this.create);
        this.router.put("/:customerId", this.update);
        this.router.delete("/:customerId", this.delete);
        this.router.post("/uploadImg", this.uploadFile);
    }
}
exports.CustomersRouter = CustomersRouter;
//# sourceMappingURL=CustomersRouter.js.map