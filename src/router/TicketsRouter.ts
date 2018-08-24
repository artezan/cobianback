import { Request, Response, Router } from "express";
import { ObjectId } from "../../node_modules/@types/bson";
import Ticket, { ITicket } from "../models/Ticket";
import { CustmersLogic } from "../logic/CustumersLogic";
import { ConsultantsLogic } from "../logic/ConsultantsLogic";
import Consultant from "../models/Consultant";
import Customer from "../models/Customer";
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
export class TicketsRouter {
  public router: Router;

  constructor() {
    this.router = Router();
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
  public all(req: Request, res: Response): void {
    const companyId: string = req.params.companyId;
    Ticket.find({ companyId: companyId })
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

  public oneById(req: Request, res: Response): void {
    const ticketId: string = req.params.ticketId;

    Ticket.findById(ticketId)
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

  public create(req: Request, res: Response): void {
    const hours: number = req.body.hours;
    const description: string = req.body.description;
    const customer: string = req.body.customerId;
    const consultant: string = req.body.consultantId;
    const companyId: string = req.body.companyId;
    const cost: number = req.body.cost;


    const ticket = new Ticket({
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
          CustmersLogic.Instance().addTicketToCustomer(data, customer);
        }
        if (consultant) {
          ConsultantsLogic.Instance().addTicketToConsultant(data, consultant);
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

  public update(req: Request, res: Response): void {
    const _id: string = req.params.ticketId;
    Ticket.findByIdAndUpdate({ _id: _id }, req.body).then(() => {
      Ticket.findById(_id).then(ticket => {
        if (ticket.consultant) {
          ConsultantsLogic.Instance().addTicketToConsultant(ticket, ticket.consultant);
        }
        if (ticket.customer) {
          CustmersLogic.Instance().addTicketToCustomer(ticket, ticket.customer);
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

  public delete(req: Request, res: Response): void {
    const _id: string = req.params.ticketId;

    Ticket.findByIdAndRemove({ _id: _id })
      .then(() => {
        CustmersLogic.Instance().removeTicket(_id);
        ConsultantsLogic.Instance().removeTicket(_id);
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
  public changeTicket(req: Request, res: Response): void {
    const ticketId: string = req.params.ticketId;
    const newCustomer: string = req.body.newCustomerId;
    const oldCustomer: string = req.body.oldCustomerId;
    const newConsultant: string = req.body.newConsultantId;
    const oldConsultant: string = req.body.oldConsultantId;
    if (newCustomer && oldCustomer && !newConsultant && !oldConsultant) {
      Ticket.findByIdAndUpdate({ _id: ticketId }, { customer: newCustomer }).then(() => {
        Ticket.findById(ticketId).then(ticket => {
          CustmersLogic.Instance().changeTicketToCustomer(ticket, newCustomer, oldCustomer);
        }).catch();

      });
    }
    if (newConsultant && oldConsultant && !newCustomer && !oldCustomer) {
      Ticket.findByIdAndUpdate({ _id: ticketId }, { consultant: newConsultant }).then(() => {
        Ticket.findById(ticketId).then(ticket => {
          ConsultantsLogic.Instance().changeTicketToConsultant(ticket, newConsultant, oldConsultant);
        }).catch();

      });
    }
    if (newConsultant && oldConsultant && newCustomer && oldCustomer) {
      Ticket.findByIdAndUpdate({ _id: ticketId }, { consultant: newConsultant, customer: newCustomer  }).then(() => {
        Ticket.findById(ticketId).then(ticket => {
          ConsultantsLogic.Instance().changeTicketToConsultant(ticket, newConsultant, oldConsultant);
          CustmersLogic.Instance().changeTicketToCustomer(ticket, newCustomer, oldCustomer);
        }).catch();

      });
    }
    res.status(200).json({ data: true });
  }

  // set up our routes
  public routes() {
    this.router.get("/bycompanyid/:companyId", this.all);
    this.router.get("/byticketid/:ticketId", this.oneById);
    this.router.post("/newticket", this.create);
    this.router.post("/changeticket/:ticketId", this.changeTicket);
    this.router.put("/:ticketId", this.update);
    this.router.delete("/:ticketId", this.delete);
  }
}
