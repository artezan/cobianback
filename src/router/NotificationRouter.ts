import { Request, Response, Router } from "express";
import { ObjectId } from "mongodb";
import * as base64 from "base-64";
import Notification, { INotification } from "../models/Notification";
import { IO } from "../app";

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
    const message: string = req.body.message;
    const senderId: string = req.body.senderId;
    const receiversId = req.body.receiversId;
    const tags = req.body.tags;
    const status = req.body.status;
    const type = req.body.type;

    const notification = new Notification({
      title,
      message,
      senderId,
      receiversId,
      tags,
      status,
      type,
    });

    notification
      .save()
      .then(data => {
        // emit
        IO.emit("NEW_NOTIFICATION", data);
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
    const id: string = req.params.id;
    Notification.findByIdAndUpdate(id, req.body)
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
  public deleteAfter(req, res, next): void {
    // dias antes para borrar
    const prevTime = 60 * 86400000;
    const schedule = new Date(new Date().getTime() - prevTime);
    Notification.find({ timestamp: { $lt: schedule } }).remove();
    /*  .then(data => {
        console.log("a");
        res.status(200).json({ data: data });
      })
      .catch(error => {
        res.status(500).json({ error });
      }); */
    next();
  }
  public searchByIdOrTags(req: Request, res: Response): void {
    const id = req.body.id;
    const pageNumber = req.body.pageNumber;
    const nPerPage = req.body.nPerPage;
    const tags = req.body.tags;
    Notification.find({
      $or: [{ senderId: id }, { receiversId: id }, { tags }],
    })
      .sort({ timestamp: -1 })
      .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
      .limit(nPerPage)
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  public searchByNotRead(req: Request, res: Response): void {
    const id = req.body.id;
    const tags = req.body.tags;
    console.log(id);
    Notification.find({
      $or: [{ senderId: id }, { receiversId: id }, { tags }],
    })
      .sort({ timestamp: -1 })
      .limit(20)
      .then((data: any) => {
        const read = data.filter(n => {
          return (
            n.readBy &&
            !n.readBy.find(
              r =>
                new ObjectId(r.readerId).toString() ===
                new ObjectId(id).toString(),
            )
          );
        });

        res.status(200).json({ data: read });
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
    this.router.post("/search", this.deleteAfter, this.searchByIdOrTags);
    this.router.post("/noread", this.searchByNotRead);
    this.router.put("/:id", this.update);
    // this.router.delete("/:id", this.delete);
    // this.router.delete("/clean", this.deleteAfter);
  }
}
