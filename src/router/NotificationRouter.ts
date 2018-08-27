import { Request, Response, Router } from "express";
import { ObjectId } from "../../node_modules/@types/bson";
import * as base64 from "base-64";
import Notification from "../models/Notification";

export class NotificationRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  /**
   * @api {GET} /notification/ Request all
   * @apiVersion  0.1.0
   * @apiName get
   * @apiGroup notification
   *
   */
  public all(req: Request, res: Response): void {
    Notification.find()
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public oneById(req: Request, res: Response): void {
    const id: string = req.params.id;

    Notification.findById(id)
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {POST} /notification/ Request New
   * @apiVersion  0.1.0
   * @apiName post
   * @apiGroup notification
   *
   */

  public create(req: Request, res: Response): void {
    const title: string = req.body.title;
    const content: string = req.body.content;

    const notification = new Notification({
      title,
      content,
    });

    notification
      .save()
      .then(data => {
        res.status(201).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {PUT} /notification/:_id Request Update
   * @apiVersion  0.1.0
   * @apiName put
   * @apiGroup notification
   */

  public update(req: Request, res: Response): void {
    const _id: string = req.params.id;
    Notification.findByIdAndUpdate({ _id: _id }, req.body)
      .then(() => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {DELETE} /notification/:id Request  Deleted
   * @apiVersion  0.1.0
   * @apiName deleteByToken
   * @apiGroup notification
   *
   */

  public delete(req: Request, res: Response): void {
    const _id: string = req.params.id;

    Notification.findByIdAndRemove({ _id: _id })
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
    this.router.get("/bynotificationid/:id", this.oneById);
    // this.router.get("/bybuyerpassword/:base64", this.byPassword);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}
