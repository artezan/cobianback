import { Request, Response, Router } from "express";
import { ObjectId } from "../../node_modules/@types/bson";
import * as base64 from "base-64";
import Goal from "../models/Goal";

export class GoalRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  /**
   * @api {GET} /goal/ Request all by company
   * @apiVersion  0.1.0
   * @apiName get
   * @apiGroup goal
   *
   */
  public all(req: Request, res: Response): void {
    const city = req.headers.city;

    Goal.find()
      .populate("adviser")
      .sort({ timestamp: -1 })
      .then(data => {
        if (city !== undefined) {
          const dataFilter = data.filter(ofert =>
            ofert.adviser.some(a => a.city === city),
          );
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
   * @api {GET} /goal/bygoalid/:id Request by Object Id
   * @apiVersion  0.1.0
   * @apiName getById
   * @apiGroup goal
   *
   */

  public oneById(req: Request, res: Response): void {
    const id: string = req.params.id;

    Goal.findById(id)
      .populate("adviser")
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {POST} /goal/ Request New
   * @apiVersion  0.1.0
   * @apiName post
   * @apiGroup goal
   *
   *
   * @apiParam {string} content Descripcion de meta
   * @apiParam {ObjetId[]} adviser Asesores
   * @apiParam {string} status
   * @apiParam {number} dataNumber Dato Cuantitativo
   * @apiParam {boolean} isByManagement Personal o equipo
   * @apiParam {string} title Titulo
   * @apiParam {string} dateLimit Fecha limite
   *
   * @apiParamExample {json} Request-Example:
   * { "adviser":"5b8082ba69a5a10b589abc75", "status":"sin completar", "dataNumber":2, "isByManagement":false, "title":"Objetivo1", "content": "Ventas por mes", "dateLimit": "20/11/2018" }
   *
   *
   * @apiSuccessExample {json} Success-Response Created User:
   * { "data": { "timestamp": "2018-08-27T21:11:44.455Z", "adviser": [ "5b8082ba69a5a10b589abc75" ], "dataNumber": 2, "isComplete": false, "_id": "5b8469105b769522d8806ff0", "content": "Ventas por mes", "status": "sin completar", "isByManagement": false, "title": "Objetivo1", "dateLimit": "20/11/2018", "__v": 0 } }
   */

  public create(req: Request, res: Response): void {
    const content: string = req.body.content;
    const adviser: string[] = req.body.adviser;
    const status: string = req.body.status;
    const title: boolean = req.body.title;
    const day: string = req.body.day;
    const month: string = req.body.month;
    const year: string = req.body.year;
    const isComplete: boolean = req.body.isComplete;
    const isByManagement: boolean = req.body.isByManagement;
    const goals: any = req.body.goals;
    const quantitative = req.body.quantitative;
    const typeOfGoal = req.body.typeOfGoal;

    const goal = new Goal({
      content,
      adviser,
      status,
      goals,
      isComplete,
      isByManagement,
      title,
      day,
      month,
      year,
      quantitative,
      typeOfGoal,
    });

    goal
      .save()
      .then(data => {
        res.status(201).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {PUT} /goal/:_id Request Update
   * @apiVersion  0.1.0
   * @apiName put
   * @apiGroup goal
   *
   */

  public update(req: Request, res: Response): void {
    const _id: string = req.params.id;
    // req.body.timestamp = new Date();
    Goal.findByIdAndUpdate({ _id: _id }, req.body)
      .then(() => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {DELETE} /goal/:id Request  Deleted
   * @apiVersion  0.1.0
   * @apiName deleteByToken
   * @apiGroup goal
   *
   */

  public delete(req: Request, res: Response): void {
    const _id: string = req.params.id;

    Goal.findByIdAndRemove({ _id: _id })
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
    this.router.get("/bygoalid/:id", this.oneById);
    // this.router.get("/bybuyerpassword/:base64", this.byPassword);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}
