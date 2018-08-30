import { Request, Response, Router } from "express";
import { ObjectId } from "../../node_modules/@types/bson";
import * as base64 from "base-64";
import Schedule from "../models/Schedule";

export class ScheduleRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  /**
   * @api {GET} /schedule/:id Request all by company
   * @apiVersion  0.1.0
   * @apiName get
   * @apiGroup schedule
   *
   */
  public all(req: Request, res: Response): void {
    Schedule.find()
      .populate("property")
      .populate("buyer")
      .populate("adviser")
      .populate("seller")
      .sort({ dateOfEvent: "asc" })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {GET} /schedule/byscheduleid/:id Request by Object Id
   * @apiVersion  0.1.0
   * @apiName getById
   * @apiGroup schedule
   *
   */

  public oneById(req: Request, res: Response): void {
    const id: string = req.params.id;

    Schedule.findById(id)
      .populate("property")
      .populate("buyer")
      .populate("adviser")
      .populate("seller")
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {POST} /schedule/ Request New
   * @apiVersion  0.1.0
   * @apiName post
   * @apiGroup schedule
   *
   *
   * @apiParam {string} dateOfEvent Fecha del evento dd/mm/aaaa
   * @apiParam {string} title
   * @apiParam {string} address
   * @apiParam {string} description
   * @apiParam {ObjectId} property
   * @apiParam {ObjectId} buyer
   * @apiParam {ObjectId} adviser
   * @apiParam {ObjectId} seller
   * @apiParam {string} status
   * @apiParam {string} note
   *
   * @apiParamExample {json} Request-Example:
   * { "dateOfEvent":"20/18/2018", "title":"Evento2", "address":"La paz", "property":"5b842b334f965c30a03c1951", "buyer":"5b84586674acb1030cabb419", "adviser":"5b8082ba69a5a10b589abc75", "status":"Pendiente", "note":"Ver Propiedad segunda visita" }
   *
   *
   * @apiSuccessExample {json} Success-Response Created User:
   * { "data": { "timestamp": "2018-08-27T21:57:08.771Z", "_id": "5b8473b42a3ac4214ce7590b", "title": "Evento2", "address": "La paz", "property": "5b842b334f965c30a03c1951", "buyer": "5b84586674acb1030cabb419", "adviser": "5b8082ba69a5a10b589abc75", "status": "Pendiente", "note": "Ver Propiedad segunda visita", "dateOfEvent": "20/18/2018", "__v": 0 } }
   */

  public create(req: Request, res: Response): void {
    const dateOfEvent: string = req.body.dateOfEvent;
    const title: string = req.body.title;
    const address: string = req.body.address;
    const property: string = req.body.property;
    const buyer: string = req.body.buyer;
    const adviser: string = req.body.adviser;
    const seller: string = req.body.seller;
    const status: string = req.body.status;
    const note: string = req.body.note;
    const day: string = req.body.day;
    const month: string = req.body.month;
    const year: string = req.body.year;
    const hour: string = req.body.hour;
    const minute: string = req.body.minute;
    const schedule = new Schedule({
      title,
      address,
      property,
      buyer,
      adviser,
      seller,
      status,
      note,
      dateOfEvent,
      day,
      month,
      year,
      hour,
      minute,
    });

    schedule
      .save()
      .then(data => {
        res.status(201).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {PUT} /schedule/:_id Request Update
   * @apiVersion  0.1.0
   * @apiName put
   * @apiGroup schedule
   *
   */

  public update(req: Request, res: Response): void {
    const _id: string = req.params.id;
    Schedule.findByIdAndUpdate({ _id: _id }, req.body)
      .then(() => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {DELETE} /schedule/:id Request  Deleted
   * @apiVersion  0.1.0
   * @apiName deleteByToken
   * @apiGroup schedule
   *
   */

  public delete(req: Request, res: Response): void {
    const _id: string = req.params.id;

    Schedule.findByIdAndRemove({ _id: _id })
      .then(() => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  // set up our routes
  public routes() {
    this.router.get("/", this.all);
    this.router.get("/byscheduleid/:id", this.oneById);
    // this.router.get("/bybuyerpassword/:base64", this.byPassword);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}
