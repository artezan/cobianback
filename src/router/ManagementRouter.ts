import { Request, Response, Router } from "express";
import { ObjectId } from "../../node_modules/@types/bson";
import * as base64 from "base-64";
import Management from "../models/Management";

export class ManagementRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  /**
   * @api {GET} /management// Request all
   * @apiVersion  0.1.0
   * @apiName get
   * @apiGroup management
   *
   */
  public all(req: Request, res: Response): void {
    Management.find()
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {GET} /management/bymanagementid/:id Request by Object Id
   * @apiVersion  0.1.0
   * @apiName getById
   * @apiGroup management
   *
   */

  public oneById(req: Request, res: Response): void {
    const id: string = req.params.id;

    Management.findById(id)
      .populate("adviser")
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {GET} /management/bymanagementpassword/:b64 Request by Object Id
   * @apiVersion  0.1.0
   * @apiName getById
   * @apiGroup management
   *
   */
  public byPassword(req: Request, res: Response): void {
    const strDecode: string = base64.decode(req.params.base64);
    const name = strDecode.substring(0, strDecode.indexOf(":"));
    const password = strDecode.substring(
      strDecode.indexOf(":") + 1,
      strDecode.length,
    );

    Management.find({ password: password, name: name })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {POST} /management/ Request New
   * @apiVersion  0.1.0
   * @apiName post
   * @apiGroup management
   *
   *
   * @apiParam {string} name
   * @apiParam {string} password
   *
   */

  public create(req: Request, res: Response): void {
    const name: string = req.body.name;
    const password: string = req.body.password;

    const management = new Management({ name, password });

    management
      .save()
      .then(data => {
        res.status(201).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {PUT} /management/:_id Request Update
   * @apiVersion  0.1.0
   * @apiName put
   * @apiGroup management
   *
   */

  public update(req: Request, res: Response): void {
    const _id: string = req.params.id;
    Management.findByIdAndUpdate({ _id: _id }, req.body)
      .then(() => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {DELETE} /management/:id Request  Deleted
   * @apiVersion  0.1.0
   * @apiName deleteByToken
   * @apiGroup management
   *
   */

  public delete(req: Request, res: Response): void {
    const _id: string = req.params.id;

    Management.findByIdAndRemove({ _id: _id })
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
    this.router.get("/bymanagementid/:id", this.oneById);
    this.router.get("/bymanagementpassword/:base64", this.byPassword);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}
