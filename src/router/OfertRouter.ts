import { Request, Response, Router } from "express";
import { ObjectId } from "../../node_modules/@types/bson";
import * as base64 from "base-64";
import Ofert from "../models/Ofert";

export class OfertRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  /**
   * @api {GET} /ofert/Request all
   * @apiVersion  0.1.0
   * @apiName get
   * @apiGroup ofert
   *
   */
  public all(req: Request, res: Response): void {
    Ofert.find()
      .populate("buyer")
      .populate("property")
      .sort({ timestamp: -1 })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {GET} /ofert/:id Request by Object Id
   * @apiVersion  0.1.0
   * @apiName getById
   * @apiGroup ofert
   *
   */

  public oneById(req: Request, res: Response): void {
    const id: string = req.params.id;

    Ofert.findById(id)
      .populate("buyer")
      .populate("property")
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {POST} /ofert/ Request New
   * @apiVersion  0.1.0
   * @apiName post
   * @apiGroup ofert
   *
   *
   * @apiParam {ObjectId} buyer
   * @apiParam {ObjectId} property
   * @apiParam {string} status aceptadas, rechazadas o sigue en negociación.
   * @apiParam {string} notes Notas extra
   * @apiParam {number} ofertPrice Oferta
   * @apiParam {string[]} files Documentos
   *
   * @apiParamExample {json} Request-Example:
   * { "name":"Consultor 1", "lastName":"Apellido", "password":"1234", "description":"Especialidad en", "companyId":"5b6db7c05291313ddcc318b7" }
   *
   *
   * @apiSuccessExample {json} Success-Response Created User:
   * { "data": { "timestamp": "2018-08-10T16:08:32.439Z", "rankingAverage": 0, "tickets": [], "_id": "5b6db8805291313ddcc318b9", "name": "Consultor 1", "lastName": "Apellido", "password": "1234", "description": "Especialidad en", "companyId": "5b6db7c05291313ddcc318b7", "__v": 0 } }
   */

  public create(req: Request, res: Response): void {
    const buyer: string = req.body.buyer;
    const property: string = req.body.property;
    const status: string = req.body.status;
    const notes: string = req.body.notes;
    const ofertPrice: number = req.body.ofertPrice;
    const files: string = req.body.files;

    const ofert = new Ofert({
      buyer,
      property,
      status,
      notes,
      ofertPrice,
      files,
    });

    ofert
      .save()
      .then(data => {
        res.status(201).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {PUT} /ofert/:_id Request Update
   * @apiVersion  0.1.0
   * @apiName put
   * @apiGroup ofert
   */

  public update(req: Request, res: Response): void {
    const _id: string = req.params.id;
    req.body.timestamp = new Date();
    Ofert.findByIdAndUpdate({ _id: _id }, req.body)
      .then(() => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {DELETE} /ofert/:id Request  Deleted
   * @apiVersion  0.1.0
   * @apiName deleteByToken
   * @apiGroup ofert
   *
   */

  public delete(req: Request, res: Response): void {
    const _id: string = req.params.id;

    Ofert.findByIdAndRemove({ _id: _id })
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
    this.router.get("/byofertid/:id", this.oneById);
    // this.router.get("/bybuyerpassword/:base64", this.byPassword);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}
