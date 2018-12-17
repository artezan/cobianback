import { Request, Response, Router } from "express";
import { ObjectId } from "../../node_modules/@types/bson";
import * as base64 from "base-64";
import Credit from "../models/Credit";

export class CreditRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  /**
   * @api {GET} /credit/ Request all
   * @apiVersion  0.1.0
   * @apiName getall
   * @apiGroup credit
   *
   */
  public all(req: Request, res: Response): void {
    const city = req.headers.city;

    Credit.find()
      .populate("buyer")
      .populate("property")
      .sort({ timestamp: -1 })
      .then(data => {
        if (city !== undefined) {
          const dataFilter = data.filter(cr => cr.buyer.city === city);
          res.status(200).json({ data: dataFilter });
        } else {
          res.status(200).json({ data });
        }
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {GET} /credit/bycreditid/:id Request by Object Id
   * @apiVersion  0.1.0
   * @apiName getById
   * @apiGroup credit
   *
   */

  public oneById(req: Request, res: Response): void {
    const id: string = req.params.id;

    Credit.findById(id)
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
   * @api {POST} /credit/ Request New
   * @apiVersion  0.1.0
   * @apiName post
   * @apiGroup credit
   *
   *
   * @apiParam {ObjectId} buyer
   * @apiParam {ObjectId} property
   * @apiParam {string} status Gris Verde Amarillo Rojo
   * @apiParam {string} notes Notas o Describir
   * @apiParam {string[]} files Archivos para el credito
   *
   * @apiParamExample {json} Request-Example:
   * { "buyer":"5b84586674acb1030cabb419", "property":"5b842b334f965c30a03c1951", "status":"Verde", "files":["documento1", "documento2"], "notes":"Describir credito" }
   *
   *
   *
   * @apiSuccessExample {json} Success-Response Created User:
   * { "data": { "timestamp": "2018-08-27T20:53:41.976Z", "files": [ "documento1", "documento2" ], "_id": "5b8464d565fb8a39b8ae3523", "buyer": "5b84586674acb1030cabb419", "property": "5b842b334f965c30a03c1951", "status": "Verde", "notes": "Describir credito", "__v": 0 } }
   */

  public create(req: Request, res: Response): void {
    const buyer: string = req.body.buyer;
    const property: string = req.body.property;
    const status: string = req.body.status;
    const files: string = req.body.files;
    const notes: string = req.body.notes;

    const credit = new Credit({
      buyer,
      property,
      status,
      files,
      notes,
    });

    credit
      .save()
      .then(data => {
        res.status(201).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {PUT} /credit/:_id Request Update
   * @apiVersion  0.1.0
   * @apiName put
   * @apiGroup credit
   */

  public update(req: Request, res: Response): void {
    const _id: string = req.params.id;
    req.body.timestamp = new Date();
    Credit.findByIdAndUpdate({ _id: _id }, req.body)
      .then(() => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {DELETE} /credit/:id Request  Deleted
   * @apiVersion  0.1.0
   * @apiName deleteByToken
   * @apiGroup credit
   */

  public delete(req: Request, res: Response): void {
    const _id: string = req.params.id;

    Credit.findByIdAndRemove({ _id: _id })
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
    this.router.get("/bycreditid/:id", this.oneById);
    // this.router.get("/bybuyerpassword/:base64", this.byPassword);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}
