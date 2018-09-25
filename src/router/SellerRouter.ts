import { Request, Response, Router } from "express";
import { ObjectId } from "../../node_modules/@types/bson";
import * as base64 from "base-64";
import Seller from "../models/Seller";

/**
 * @apiDefine SellerResponseParams
 * @apiSuccess {Date} timestamp
 * @apiSuccess {IProperty[]} property Propiedades
 * @apiSuccess {ISchedule[]} schedule Eventos
 * @apiSuccess {ObjectId} _id
 * @apiSuccess {INotification[]} notification
 * @apiSuccess {string} name
 * @apiSuccess {string} lastName
 * @apiSuccess {string} password
 * @apiSuccess {boolean} isRenter
 */
export class SellerRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  /**
   * @api {GET} /seller/ Request all
   * @apiVersion  0.1.0
   * @apiName get
   * @apiGroup seller
   *
   *
   */
  public all(req: Request, res: Response): void {
    Seller.find()
      .populate("property")
      .populate("schedule")
      .populate("notification")
      .sort({ timestamp: -1 })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {GET} /seller/bysellerid/:Id Request by Object Id
   * @apiVersion  0.1.0
   * @apiName getById
   * @apiGroup seller
   *
   *
   */

  public oneById(req: Request, res: Response): void {
    const id: string = req.params.id;

    Seller.findById(id)
      .populate("property")
      .populate("schedule")
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

    Seller.find({ password: password, name: name })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {GET} /bysellercity/:city Request by Object City
   * @apiVersion  0.1.0
   * @apiName getByCity
   * @apiGroup seller
   *
   *
   */
  public byCity(req: Request, res: Response): void {
    const city: string = req.params.city;

    Seller.find({ city: city })
      .populate("schedule")
      .populate("buyer")
      .populate("goal")
      .populate("notification")
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {POST} /seller/ Request New
   * @apiVersion  0.1.0
   * @apiName post
   * @apiGroup seller
   *
   *
   * @apiParam {string} name
   * @apiParam {string} lastName
   * @apiParam {string} password
   * @apiParam { boolean} isRenter Renta o Vende
   *
   * @apiParamExample {json} Request-Example:
   * { "name": "Vendedor 1", "lastName": "Apellido", "password":"12345", "isRenter": true }
   *
   * @apiUse SellerResponseParams
   *
   * @apiSuccessExample {json} Success-Response Created User:
   * { "data": { "timestamp": "2018-08-27T22:34:35.839Z", "property": [], "schedule": [], "notification": [], "_id": "5b847c7bdba3a530b0aa264b", "name": "Vendedor 1", "lastName": "Apellido", "password": "12345", "isRenter": true, "__v": 0 } }
   */

  public create(req: Request, res: Response): void {
    const name: string = req.body.name;
    const lastName: string = req.body.lastName;
    const password: string = req.body.password;
    const isRenter: boolean = req.body.isRenter;
    const city: string = req.body.city;
    const property = req.body.property;

    const seller = new Seller({
      name,
      lastName,
      password,
      isRenter,
      city,
      property,
    });

    seller
      .save()
      .then(data => {
        res.status(201).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {PUT} /seller/:_id Request Update
   * @apiVersion  0.1.0
   * @apiName put
   * @apiGroup seller
   *
   */

  public update(req: Request, res: Response): void {
    const _id: string = req.params.id;
    Seller.findByIdAndUpdate({ _id: _id }, req.body)
      .then(() => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {DELETE} /seller/:id Request  Deleted
   * @apiVersion  0.1.0
   * @apiName deleteByToken
   * @apiGroup seller
   *
   */

  public delete(req: Request, res: Response): void {
    const _id: string = req.params.id;

    Seller.findByIdAndRemove({ _id: _id })
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
    this.router.get("/bysellerid/:id", this.oneById);
    this.router.get("/bysellercity/:city", this.byCity);
    this.router.get("/bysellerpassword/:base64", this.byPassword);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}
