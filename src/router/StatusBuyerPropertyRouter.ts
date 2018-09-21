import { Request, Response, Router } from "express";
import { ObjectId } from "../../node_modules/@types/bson";
import * as base64 from "base-64";
import StatusBuyerProperty from "../models/StatusBuyerProperty";
import { StatusBuyerPropertyLogic } from "../logic/StatusBuyerProperty";

export class StatusBuyerPropertyRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  /**
   * @api {GET} /status/bycompanyid/:companyId Request all by company
   * @apiVersion  0.1.0
   * @apiName get
   * @apiGroup status
   */
  public all(req: Request, res: Response): void {
    StatusBuyerProperty.find()
      .populate("property")
      .populate({
        path: "buyer",
        populate: [{ path: "credit" }, { path: "ofert" }],
      })
      .sort({ timestamp: -1 })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {GET} /status/bystatusid/:id Request by Object Id
   * @apiVersion  0.1.0
   * @apiName getById
   * @apiGroup status
   *
   *
   */

  public oneById(req: Request, res: Response): void {
    const id: string = req.params.id;

    StatusBuyerProperty.findById(id)
      .populate({
        path: "buyer",
        populate: [{ path: "credit" }, { path: "ofert" }],
      })
      .populate("property")
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {POST} /status/ Request New
   * @apiVersion  0.1.0
   * @apiName post
   * @apiGroup status
   *
   *
   * @apiParam {string} status Estado (Negociación,Oferta,Propuesta de crédito  )
   * @apiParam {ObjectId} buyer
   * @apiParam {ObjectId} property
   * @apiParam {string} note
   *
   * @apiParamExample {json} Request-Example:
   * { "status":"negociacion", "buyer":"5b84586674acb1030cabb419", "property":"5b842b334f965c30a03c1951", "note":"En proceso" }
   *
   *
   * @apiSuccessExample {json} Success-Response Created User:
   * { "data": { "timestamp": "2018-08-27T22:18:13.525Z", "_id": "5b8478a5258cea39b839cbf7", "status": "negociacion", "buyer": "5b84586674acb1030cabb419", "property": "5b842b334f965c30a03c1951", "note": "En proceso", "__v": 0 } }
   */

  public create(req: Request, res: Response): void {
    const status: string = req.body.status;
    const buyer: string = req.body.buyer;
    const property: string = req.body.property;
    const note: string = req.body.note;

    const statusBuyerProperty = new StatusBuyerProperty({
      status,
      buyer,
      property,
      note,
    });

    statusBuyerProperty
      .save()
      .then(data => {
        res.status(201).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {PUT} /status/:_id Request Update
   * @apiVersion  0.1.0
   * @apiName put
   * @apiGroup status
   *
   */

  public update(req: Request, res: Response): void {
    const _id: string = req.params.id;
    req.body.timestamp = new Date();
    StatusBuyerProperty.findByIdAndUpdate({ _id: _id }, req.body)
      .then(() => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {DELETE} /status/:id Request  Deleted
   * @apiVersion  0.1.0
   * @apiName deleteByToken
   * @apiGroup status
   *
   */

  public delete(req: Request, res: Response): void {
    const _id: string = req.params.id;

    StatusBuyerProperty.findByIdAndRemove({ _id: _id })
      .then(() => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {POST} /status/upgradelevelbyid/:id Request  UpgradeLevel
   * @apiVersion  0.1.0
   * @apiName UpgradeLevel
   * @apiGroup status
   *
   * @apiParam {ObjectId} id
   * @apiParam {string} status gris, verde, amarillo, rojo
   */

  public upgradeLevel(req: Request, res: Response): void {
    const _id: string = req.params.id;
    const status: string = req.body.status;

    StatusBuyerProperty.findById({ _id: _id })
      .then(s => {
        const isUpdate = StatusBuyerPropertyLogic.Instance().isUpgradeStatus(
          status,
          s.status,
        );
        if (isUpdate) {
          const timestamp = new Date();
          StatusBuyerProperty.findByIdAndUpdate(
            { _id: _id },
            { status: status, timestamp: timestamp },
          )
            .then(() => {
              res.status(200).json({ data: true });
            })
            .catch(error => {
              res.status(500).json({ error });
            });
        } else {
          res.status(200).json({ data: false });
        }
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {POST} /status/bybuyerpropid/ Request by Object Id
   * @apiVersion  0.1.0
   * @apiName getById
   * @apiGroup status
   *
   *
   */

  public oneByPropBuyer(req: Request, res: Response): void {
    const buyer: string = req.body.buyer;
    const property: string = req.body.property;

    StatusBuyerProperty.findOne({
      buyer,
      property,
    })
      .populate("buyer")
      .populate("property")
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  // set up our routes
  public routes() {
    this.router.get("/", this.all);
    this.router.get("/bystatusid/:id", this.oneById);
    this.router.post("/bybuyerpropid", this.oneByPropBuyer);
    // this.router.get("/bybuyerpassword/:base64", this.byPassword);
    this.router.post("/", this.create);
    this.router.post("/upgradelevelbyid/:id", this.upgradeLevel);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}
