import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import * as base64 from "base-64";
import Schedule from "../models/Schedule";
import Buyer from "../models/Buyer";

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
      .sort({ timestamp: "asc" })
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
   *
   * @apiParam {string} title
   * @apiParam {string} address
   * @apiParam {string} description
   * @apiParam {ObjectId} property
   * @apiParam {ObjectId} buyer
   * @apiParam {ObjectId} adviser
   * @apiParam {ObjectId} seller
   * @apiParam {string} status
   * @apiParam {string} note
   * @apiParam {number} day
   * @apiParam {number} month
   * @apiParam {number} year
   * @apiParam {number} hour
   * @apiParam {number} minute
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
    const administrator: string = req.body.administrator;
    const personal: string = req.body.personal;
    const management: string = req.body.management;
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
      administrator,
      management,
      status,
      note,
      dateOfEvent,
      day,
      month,
      year,
      hour,
      minute,
      personal,
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
    req.body.timestamp = new Date();
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
  public check(req: Request, res: Response) {
    const property: string = req.body.property;
    const buyer: string = req.body.buyer;
    const adviser: string = req.body.adviser;
    const seller: string = req.body.seller;
    const personal: string = req.body.personal;
    const month: number = +req.body.month;
    const year: number = +req.body.year;
    const hour: number = +req.body.hour;
    const day = +req.body.day;
    const _id = req.body._id;
    let check: {
      buyerCan?: boolean;
      adviserCan?: boolean;
      propertyCan?: boolean;
    } = {};
    // const minute: string = req.body.minute;
    Schedule.find()
      .then(schedules => {
        const arrSchedules = schedules.filter(
          s => new ObjectId(s._id).toString() !== new ObjectId(_id).toString(),
        );
        const scheduleFind: any = arrSchedules.filter(
          s =>
            s.year === year &&
            s.month === month &&
            s.day === day &&
            s.hour === hour,
        );
        console.log(scheduleFind);
        if (scheduleFind.length > 0) {
          check.buyerCan = !!!scheduleFind.find(
            s =>
              new ObjectId(s.buyer).toString() ===
              new ObjectId(buyer).toString(),
          );
          check.adviserCan = !!!scheduleFind.find(
            s =>
              new ObjectId(s.adviser).toString() ===
              new ObjectId(adviser).toString(),
          );
          check.propertyCan = !!!scheduleFind.find(
            s =>
              new ObjectId(s.property).toString() ===
              new ObjectId(property).toString(),
          );
          /* check = {
            adviserCan: !(
              new ObjectId(scheduleFind.adviser).toString() ===
                new ObjectId(adviser).toString() ||
              (scheduleFind.personal &&
                new ObjectId(scheduleFind.personal).toString() ===
                  new ObjectId(adviser).toString())
            ),
            buyerCan: !(
              new ObjectId(scheduleFind.buyer).toString() ===
              new ObjectId(buyer).toString()
            ),
            propertyCan: !(
              new ObjectId(scheduleFind.property).toString() ===
              new ObjectId(property).toString()
            ),
          }; */
        } else {
          check = {
            adviserCan: true,
            buyerCan: true,
            propertyCan: true,
          };
        }
        console.log(check);
        res.status(200).json({ data: check });
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
    this.router.post("/checkschedule", this.check);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}
