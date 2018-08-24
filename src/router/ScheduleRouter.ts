import { Request, Response, Router } from "express";
import { ObjectId } from "../../node_modules/@types/bson";
import * as base64 from "base-64";
import Schedule from "../models/Schedule";

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
export class ScheduleRouter {
  public router: Router;

  constructor() {
    this.router = Router();
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

  public create(req: Request, res: Response): void {
    const dateOfEventStr: string = req.body.dateOfEvent;
    const title: string = req.body.title;
    const address: string = req.body.address;
    const property: string = req.body.property;
    const buyer: string = req.body.buyer;
    const adviser: string = req.body.adviser;
    const seller: string = req.body.seller;
    const status: string = req.body.status;
    const note: string = req.body.note;
    // trasforma a fecha
    const dateOfEvent = new Date(dateOfEventStr);

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
