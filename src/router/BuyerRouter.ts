import { Request, Response, Router } from "express";
import { ObjectId } from "../../node_modules/@types/bson";
import * as base64 from "base-64";
import Buyer from "../models/Buyer";

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
export class BuyerRouter {
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
    Buyer.find()
      .populate("schedule")
      .populate("credit")
      .populate("property")
      .populate("adviser")
      .populate("notification")
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

    Buyer.findById(id)
      .populate("schedule")
      .populate("credit")
      .populate("property")
      .populate("adviser")
      .populate("notification")
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  public byPassword(req: Request, res: Response): void {
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
    const name: string = req.body.name;
    const fatherLastName: string = req.body.fatherLastName;
    const motherLastName: string = req.body.motherLastName;
    const password: string = req.body.password;
    const email: string = req.body.email;
    const phone: number = req.body.phone;
    const years: number = req.body.years;
    const isMale: boolean = req.body.isMale;
    const numOfFamily: number = req.body.numOfFamily;
    const isSingle: boolean = req.body.isSingle;
    const typeOfProperty: string[] = req.body.typeOfProperty;
    const space: number = req.body.space;
    const tag: string[] = req.body.tag;
    const isRenter: boolean = req.body.isRenter;
    const dateToBuy: string = req.body.dateToBuy;
    const zone: string = req.body.zone;
    const minPrice: number = req.body.minPrice;
    const maxPrice: number = req.body.maxPrice;
    const numRooms: number = req.body.numRooms;
    const numCars: number = req.body.numCars;
    const isOld: boolean = req.body.isOld;
    const isClose: boolean = req.body.isClose;
    const numBathrooms: number = req.body.numBathrooms;
    const hasGarden: boolean = req.body.hasGarden;
    const isLowLevel: boolean = req.body.isLowLevel;
    const hasElevator: boolean = req.body.hasElevator;
    const allServices: boolean = req.body.allServices;

    const buyer = new Buyer({
      name,
      fatherLastName,
      motherLastName,
      password,
      email,
      phone,
      years,
      isMale,
      numOfFamily,
      isSingle,
      typeOfProperty,
      space,
      tag,
      isRenter,
      dateToBuy,
      zone,
      minPrice,
      maxPrice,
      numRooms,
      numCars,
      isOld,
      isClose,
      numBathrooms,
      hasGarden,
      isLowLevel,
      hasElevator,
      allServices,
    });

    buyer
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
    Buyer.findByIdAndUpdate({ _id: _id }, req.body)
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

    Buyer.findByIdAndRemove({ _id: _id })
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
    this.router.get("/bybuyerid/:id", this.oneById);
    this.router.get("/bybuyerpassword/:base64", this.byPassword);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}
