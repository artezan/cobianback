"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Ticket_1 = require("../models/Ticket");
const CustumersLogic_1 = require("../logic/CustumersLogic");
const ConsultantsLogic_1 = require("../logic/ConsultantsLogic");
/**
 * @apiDefine TicketResponseParams
 * @apiSuccess {Date} timestamp
 * @apiSuccess {number} ranking Calificación dada por el cliente
 * @apiSuccess {number} cost Costo asignado por la empresa
 * @apiSuccess {string} status Estado del ticket que el consultor asigna 	(Atendiendo. Cerrado. Pendiente)
 * @apiSuccess {boolean} isPay Si esta pagado o no
 * @apiSuccess {ObjectId} _id
 * @apiSuccess {number} hours Horas para cumplir el ticket
 * @apiSuccess {string} description De lo que trata (servicio)
 * @apiSuccess {customer} customer
 * @apiSuccess {consultant} consultant
 * @apiSuccess {ObjectId} companyId
 */
class TicketsRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    /**
     * @api {GET} /tickets/bycompanyid/:companyId Request all
     * @apiVersion  0.1.0
     * @apiName get
     * @apiGroup Ticket
     *
     *
     * @apiSampleRequest http://31.220.52.51:3000/api/v1/tickets/bycompanyid/5b6db7c05291313ddcc318b7
     *
     * @apiSuccessExample {json} Success-Response a JSON-Array<ticket>:
     * { "data": [ { "timestamp": "2018-08-10T16:37:59.838Z", "ranking": 0, "cost": 2000, "status": "Pendiente", "isPay": false, "_id": "5b6dbf67b9da8f0894dd2a05", "hours": 7, "description": "Solucionar problema con", "customer": { "timestamp": "2018-08-10T16:06:48.854Z", "totalHours": 7, "tickets": [ "5b6dbf67b9da8f0894dd2a05" ], "_id": "5b6db8185291313ddcc318b8", "logo": "http://31.220.52.51:3000/LOGO.png", "name": "Cliente 1", "adress": "Direccion 1", "phone": 22222, "email": "cliente@gmail.com", "workArea": "Industria de ...", "password": "12345", "companyId": "5b6db7c05291313ddcc318b7", "__v": 3 }, "companyId": "5b6db7c05291313ddcc318b7", "__v": 0, "consultant": { "timestamp": "2018-08-10T17:14:26.803Z", "rankingAverage": 0, "tickets": [], "_id": "5b6dc7f2b9da8f0894dd2a06", "name": "Consultor 2", "lastName": "Apellido", "password": "1234", "description": "Especialidad en", "companyId": "5b6db7c05291313ddcc318b7", "__v": 1 } } ] }
     */
    all(req, res) {
        const companyId = req.params.companyId;
        Ticket_1.default.find({ companyId: companyId })
            .populate("customer")
            .populate("consultant")
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {GET} /tickets/byticketid/:ticketId Request by Object Id
     * @apiVersion  0.1.0
     * @apiName getById
     * @apiGroup Ticket
     *
     *
     * @apiParam {ObjectId} ticketId Must be provided as QueryParam
     *
     * @apiExample Example usage:
     * http://31.220.52.51:3000/api/v1/tickets/byticketid/5b6db7c05291313ddcc318b7
     *
     * @apiSampleRequest http://31.220.52.51:3000/api/v1/tickets/byticketid/5b6db7c05291313ddcc318b7
     *
     * @apiUse TicketResponseParams
     *
     * @apiSuccessExample {json} Success-Response User:
     * { "data": [ { "timestamp": "2018-08-10T16:37:59.838Z", "ranking": 0, "cost": 2000, "status": "Pendiente", "isPay": false, "_id": "5b6dbf67b9da8f0894dd2a05", "hours": 7, "description": "Solucionar problema con", "customer": { "timestamp": "2018-08-10T16:06:48.854Z", "totalHours": 7, "tickets": [ "5b6dbf67b9da8f0894dd2a05" ], "_id": "5b6db8185291313ddcc318b8", "logo": "http://31.220.52.51:3000/LOGO.png", "name": "Cliente 1", "adress": "Direccion 1", "phone": 22222, "email": "cliente@gmail.com", "workArea": "Industria de ...", "password": "12345", "companyId": "5b6db7c05291313ddcc318b7", "__v": 3 }, "companyId": "5b6db7c05291313ddcc318b7", "__v": 0, "consultant": { "timestamp": "2018-08-10T17:14:26.803Z", "rankingAverage": 0, "tickets": [], "_id": "5b6dc7f2b9da8f0894dd2a06", "name": "Consultor 2", "lastName": "Apellido", "password": "1234", "description": "Especialidad en", "companyId": "5b6db7c05291313ddcc318b7", "__v": 1 } } ] }
     */
    oneById(req, res) {
        const ticketId = req.params.ticketId;
        Ticket_1.default.findById(ticketId)
            .populate("customer")
            .populate("consultant")
            .then(data => {
            res.status(200).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
        /*User.findOne({ username }).select('lastName')
          .then((data) => {
            res.status(200).json({ data });
          })
          .catch((error) => {
            res.status(500).json({ error });
          });*/
    }
    /**
     * @api {POST} /tickets/newticket/ Request New
     * @apiVersion  0.1.0
     * @apiName post
     * @apiGroup Ticket
     *
     *
     * @apiParam {number} hours
     * @apiParam {string} description De que va a tratar la consultoria
     * @apiParam {ObjectId} customerId Cliente que levanta el ticket
     * @apiParam {ObjectId} [consultantId] Consultor asignado por la empresa
     * @apiParam {ObjectId} companyId
     * @apiParam {number} cost Costo del ticket asignado por la empresa
     *
     * @apiParamExample {json} Request-Example:
     * { "hours": 8, "description":"Solucionar problema con", "customerId":"5b6db8185291313ddcc318b8", "companyId":"5b6db7c05291313ddcc318b7", "cost": 2000 }
     *
     * @apiUse TicketResponseParams
     *
     * @apiSuccessExample {json} Success-Response Created Ticket:
     * { "data": { "timestamp": "2018-08-10T16:37:59.838Z", "ranking": 0, "cost": 2000, "status": "Pendiente", "isPay": false, "_id": "5b6dbf67b9da8f0894dd2a05", "hours": 8, "description": "Solucionar problema con", "customer": "5b6db8185291313ddcc318b8", "companyId": "5b6db7c05291313ddcc318b7", "__v": 0 } }
     */
    create(req, res) {
        const hours = req.body.hours;
        const description = req.body.description;
        const customer = req.body.customerId;
        const consultant = req.body.consultantId;
        const companyId = req.body.companyId;
        const cost = req.body.cost;
        const ticket = new Ticket_1.default({
            hours,
            description,
            consultant,
            customer,
            companyId,
            cost
        });
        ticket
            .save()
            .then(data => {
            if (customer) {
                CustumersLogic_1.CustmersLogic.Instance().addTicketToCustomer(data, customer);
            }
            if (consultant) {
                ConsultantsLogic_1.ConsultantsLogic.Instance().addTicketToConsultant(data, consultant);
            }
            res.status(201).json({ data });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {PUT} /tickets/:ticketId Request Update
     * @apiVersion  0.1.0
     * @apiName put
     * @apiGroup Ticket
     * @apiDescription
     * Se debe debe de asignar un NUEVO consultor o/y cliente con este end-point.
     * Esto se hace asi debido a que un ticket solo puede contener un consultor/cliente.
     * Se puede asignar ranking, status, pagado
     * Para cambiar de cliente y/o consultor ver "Change Customer/Consultant".
     *
     *
     * @apiParam {ObjectId} ticketId Must be placed as QueryParam
     * @apiParam {ObjectId} [customer]
     * @apiParam {ObjectId} [consultant]
     * @apiParam {number} [hours]
     * @apiParam {string} [description]
     * @apiParam {number} [cost]
     * @apiParam {number} [ranking]
     * @apiParam {string} [status] (Atendiendo. Cerrado. Pendiente)
     * @apiParam {boolean} [isPay]
     *
     * @apiExample Example usage:
     * http://31.220.52.51:3000/api/v1/tickets/5b6dbf67b9da8f0894dd2a05
     *
     * @apiParamExample {json} Request-Example:
     * { "consultant": "5b6db8805291313ddcc318b9", "customer": "_id" }
     *
     * @apiSuccessExample {json} Success-Response:
     * { "data": true }
     */
    update(req, res) {
        const _id = req.params.ticketId;
        Ticket_1.default.findByIdAndUpdate({ _id: _id }, req.body).then(() => {
            Ticket_1.default.findById(_id).then(ticket => {
                if (ticket.consultant) {
                    ConsultantsLogic_1.ConsultantsLogic.Instance().addTicketToConsultant(ticket, ticket.consultant);
                }
                if (ticket.customer) {
                    CustumersLogic_1.CustmersLogic.Instance().addTicketToCustomer(ticket, ticket.customer);
                }
            }).catch();
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {DELETE} /tickets/:_id Request  Deleted
     * @apiVersion  0.1.0
     * @apiName deleteByToken
     * @apiGroup Ticket
     *
     *
     * @apiParam {ObjectId} _id Must be placed as QueryParam
     *
     * @apiExample Example usage:
     * http://31.220.52.51:3000/api/v1/tickets/5b6dbf67b9da8f0894dd2a05
     *
     * @apiSuccessExample {json} Success-Response:
     * {"data":true}
     */
    delete(req, res) {
        const _id = req.params.ticketId;
        Ticket_1.default.findByIdAndRemove({ _id: _id })
            .then(() => {
            CustumersLogic_1.CustmersLogic.Instance().removeTicket(_id);
            ConsultantsLogic_1.ConsultantsLogic.Instance().removeTicket(_id);
            res.status(200).json({ data: true });
        })
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    /**
     * @api {POST} /tickets/changeticket/:ticketId  Change Customer/Consultant
     * @apiVersion  0.1.0
     * @apiName post Change Customer/Consultant
     * @apiGroup Ticket
     * @apiDescription
     * Es para cambiar de Consultor o de Cliente
     *
     * @apiParam {ObjectId} ticketId Must be placed as QueryParam
     * @apiParam {ObjectId} newCustomerId Nuevo Cliente
     * @apiParam {ObjectId} oldCustomerId Cliente anterior
     * @apiParam {ObjectId} newConsultantId Nuevo Consultor
     * @apiParam {ObjectId} oldConsultantId Consultor anterior
     *
     * @apiParamExample {json} Request-Example:
     * { "newConsultantId":"5b6dc7f2b9da8f0894dd2a06", "oldConsultantId" : "5b6db8805291313ddcc318b9" }
     *
     * @apiUse TicketResponseParams
     *
     * @apiSuccessExample {json} Success-Response Created Ticket:
     * { "data": true }
     */
    changeTicket(req, res) {
        const ticketId = req.params.ticketId;
        const newCustomer = req.body.newCustomerId;
        const oldCustomer = req.body.oldCustomerId;
        const newConsultant = req.body.newConsultantId;
        const oldConsultant = req.body.oldConsultantId;
        if (newCustomer && oldCustomer && !newConsultant && !oldConsultant) {
            Ticket_1.default.findByIdAndUpdate({ _id: ticketId }, { customer: newCustomer }).then(() => {
                Ticket_1.default.findById(ticketId).then(ticket => {
                    CustumersLogic_1.CustmersLogic.Instance().changeTicketToCustomer(ticket, newCustomer, oldCustomer);
                }).catch();
            });
        }
        if (newConsultant && oldConsultant && !newCustomer && !oldCustomer) {
            Ticket_1.default.findByIdAndUpdate({ _id: ticketId }, { consultant: newConsultant }).then(() => {
                Ticket_1.default.findById(ticketId).then(ticket => {
                    ConsultantsLogic_1.ConsultantsLogic.Instance().changeTicketToConsultant(ticket, newConsultant, oldConsultant);
                }).catch();
            });
        }
        if (newConsultant && oldConsultant && newCustomer && oldCustomer) {
            Ticket_1.default.findByIdAndUpdate({ _id: ticketId }, { consultant: newConsultant, customer: newCustomer }).then(() => {
                Ticket_1.default.findById(ticketId).then(ticket => {
                    ConsultantsLogic_1.ConsultantsLogic.Instance().changeTicketToConsultant(ticket, newConsultant, oldConsultant);
                    CustumersLogic_1.CustmersLogic.Instance().changeTicketToCustomer(ticket, newCustomer, oldCustomer);
                }).catch();
            });
        }
        res.status(200).json({ data: true });
    }
    // set up our routes
    routes() {
        this.router.get("/bycompanyid/:companyId", this.all);
        this.router.get("/byticketid/:ticketId", this.oneById);
        this.router.post("/newticket", this.create);
        this.router.post("/changeticket/:ticketId", this.changeTicket);
        this.router.put("/:ticketId", this.update);
        this.router.delete("/:ticketId", this.delete);
    }
}
exports.TicketsRouter = TicketsRouter;
//# sourceMappingURL=TicketsRouter.js.map