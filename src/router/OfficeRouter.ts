import { Request, Response, Router } from "express";
import { ObjectId } from "../../node_modules/@types/bson";
import * as base64 from "base-64";
import Office from "../models/Office";

export class OfficeRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  /**
   * @api {GET} /office/Request all
   * @apiVersion  0.1.0
   * @apiName get
   * @apiGroup office
   */
  public all(req: Request, res: Response): void {
    Office.find()
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {GET} /office/byofficeid/:id Request by Object Id
   * @apiVersion  0.1.0
   * @apiName getById
   * @apiGroup office
   *
   */

  public oneById(req: Request, res: Response): void {
    const id: string = req.params.id;

    Office.findById(id)
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

    Office.find({ password: password, name: name })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {POST} /office/ Request New
   * @apiVersion  0.1.0
   * @apiName post
   * @apiGroup office
   *
   *
   * @apiParam {string} name
   * @apiParam {string} password
   *
   */

  public create(req: Request, res: Response): void {
    const name: string = req.body.name;
    const password: string = req.body.password;

    const office = new Office({
      name,
      password,
    });

    office
      .save()
      .then(data => {
        res.status(201).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {PUT} /office/:_id Request Update
   * @apiVersion  0.1.0
   * @apiName put
   * @apiGroup office
   *
   */

  public update(req: Request, res: Response): void {
    const _id: string = req.params.id;
    Office.findByIdAndUpdate({ _id: _id }, req.body)
      .then(() => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {DELETE} /office/:id Request  Deleted
   * @apiVersion  0.1.0
   * @apiName deleteByToken
   * @apiGroup office
   *
   */

  public delete(req: Request, res: Response): void {
    const _id: string = req.params.id;

    Office.findByIdAndRemove({ _id: _id })
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
    this.router.get("/byofficeid/:id", this.oneById);
    this.router.get("/byofficepassword/:base64", this.byPassword);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}
