import { Request, Response, Router } from "express";
import { ObjectId } from "../../node_modules/@types/bson";
import * as base64 from "base-64";
import Administrator from "../models/Administrator";
/**
 * @apiDefine AdministratorResponseParams
 * @apiSuccess {string} name
 * @apiSuccess {ObjectId} _id
 * @apiSuccess {Date} timestamp
 */
export class AdministratorRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  /**
   * @api {GET} /administrator/ Request all
   * @apiVersion  0.1.0
   * @apiName get
   * @apiGroup administrator
   *
   *
   * @apiSampleRequest /administrator/
   *
   * @apiSuccessExample {json} Success-Response a JSON-Array<administrator>:
   * { "data": { "timestamp": "2018-08-27T14:49:37.217Z", "_id": "5b840f8116b1cf2accc95ae4", "name": "admin2", "password": "cobian2018", "__v": 0 } }
   */
  public all(req: Request, res: Response): void {
    Administrator.find()
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {GET} /administrator/:b64 Request by Object Id
   * @apiVersion  0.1.0
   * @apiName getByNameAndPassword
   * @apiGroup administrator
   *
   *
   * @apiParam {ObjectId} b64(name:password) Must be provided as QueryParam
   *
   *
   * @apiSampleRequest /administrator/
   *
   * @apiUse AdministratorResponseParams
   *
   * @apiSuccessExample {json} Success-Response Company:
   * { "data": { "timestamp": "2018-08-27T14:49:37.217Z", "_id": "5b840f8116b1cf2accc95ae4", "name": "admin2", "password": "cobian2018", "__v": 0 } }
   */
  public oneById(req: Request, res: Response): void {
    const strDecode: string = base64.decode(req.params.nameAdministrator);
    const name = strDecode.substring(0, strDecode.indexOf(":"));
    const password = strDecode.substring(
      strDecode.indexOf(":") + 1,
      strDecode.length,
    );

    Administrator.find({ password: password, name: name })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {POST} /administrator/ Request New
   * @apiVersion  0.1.0
   * @apiName post
   * @apiGroup administrator
   *
   *
   * @apiParam {string} name
   * @apiParam {string} password
   *
   * @apiParamExample {json} Request-Example:
   * { "name":"admin2", "password":"cobian2018" }
   *
   * @apiUse AdministratorResponseParams
   *
   * @apiSuccessExample {json} Success-Response Created Company:
   * { "data": { "timestamp": "2018-08-27T14:49:37.217Z", "_id": "5b840f8116b1cf2accc95ae4", "name": "admin2", "password": "cobian2018", "__v": 0 } }
   */

  public createAdmin(req: Request, res: Response): void {
    const name: string = req.body.name;
    const password: string = req.body.password;

    const admin = new Administrator({
      name,
      password,
    });
    admin
      .save()
      .then(data => {
        res.status(201).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public update(req: Request, res: Response): void {
    const _id: string = req.params.id;

    Administrator.findByIdAndUpdate({ _id: _id }, req.body)
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public delete(req: Request, res: Response): void {
    const _id: string = req.params.id;

    Administrator.findByIdAndRemove({ _id: _id })
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
    this.router.get("/:nameAdministrator", this.oneById);
    this.router.post("/", this.createAdmin);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}
