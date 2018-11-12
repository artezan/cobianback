import { Request, Response, Router } from "express";
import Chat from "../models/Chat";
import { IO } from "../app";
import { ObjectId } from "mongodb";

/**
 * @apiDefine AdviserResponseParams
 * @apiSuccess {Date} timestamp
 * @apiSuccess {ISchedule[]} schedule Calendario
 * @apiSuccess {number} hourStart Hora inicio servicio
 * @apiSuccess {number} hourEnd Hora fin de servicio
 * @apiSuccess {IBuyer[]} buyer Compradores asignados
 * @apiSuccess {IGoal[]} goal Objetivos planteados
 * @apiSuccess {INotification[]} notification Historial notificaciones
 * @apiSuccess {boolean} isRenter Si renta o vende
 * @apiSuccess {string} name
 * @apiSuccess {string} lastName
 * @apiSuccess {string} password
 * @apiSuccess {string} email
 * @apiSuccess {ObjectId} companyId
 */
export class ChatRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public all(req: Request, res: Response): void {
    Chat.find()
      .sort({ timestamp: -1 })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public oneById(req: Request, res: Response): void {
    const id: string = req.params.id;

    Chat.findById(id)
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public oneByProperty(req: Request, res: Response): void {
    const id: string = req.params.id;

    Chat.findOne({ property: id })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public byCity(req: Request, res: Response): void {
    const city: string = req.params.city;

    Chat.find({ city: city })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public create(req: Request, res: Response): void {
    const buyer: string = req.body.buyer;
    const property: string = req.body.property;
    const city: string = req.body.city;
    const messages: any = req.body.messages;

    const chat = new Chat({
      buyer,
      property,
      city,
      messages,
    });

    chat
      .save()
      .then(data => {
        res.status(201).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public addMessage(req: Request, res: Response): void {
    const _id: string = req.body._id;
    const newMessages = req.body.newMessages;
    Chat.findById({ _id: _id })
      .then(chat => {
        if (newMessages) {
          chat.messages.push(newMessages);
        }
        chat.save().then(data => {
          IO.emit("NEW_MESSAGE", { _id });
          res.status(200).json({ data });
        });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  public addRead(req: Request, res: Response): void {
    const _id: string = req.body._id;
    const messagesId: any[] = req.body.messagesId;
    const uid = req.body.uid;
    Chat.findById({ _id: _id })
      .then(chat => {
        messagesId.forEach(messageId => {
          chat.messages
            .find(
              (m: any) =>
                new ObjectId(m._id).toString() ===
                new ObjectId(messageId).toString(),
            )
            .readBy.push(uid);
        });
        chat.save().then(data => {
          res.status(200).json({ data });
        });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public delete(req: Request, res: Response): void {
    const _id: string = req.params.id;

    Chat.findByIdAndRemove({ _id: _id })
      .then(() => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  // Borrar cuando sea muy grande
  public async deleteAfter(req, res, next): Promise<void> {
    const _id: string = req.body._id;
    const chat = await Chat.findById(_id);
    const maxLen = 50;
    const msgLen = chat.messages.length;
    const charLen = JSON.stringify(chat).length;
    console.log("mensajes", msgLen);
    // borrar mensajes antiguos
    if (charLen >= 10000 || msgLen >= maxLen) {
      console.log("mensajes borrados", msgLen);
      console.log("mensajes borrados ch", charLen);
      chat.messages.splice(0, msgLen - maxLen);
      chat.save();
    }
    next();
  }

  // set up our routes
  public routes() {
    this.router.get("/", this.all);
    this.router.get("/bychatid/:id", this.oneById);
    this.router.get("/bypropertyid/:id", this.oneByProperty);
    this.router.get("/bychatcity/:city", this.byCity);
    this.router.post("/", this.create);
    this.router.post("/addmessage/", this.deleteAfter, this.addMessage);
    this.router.post("/addread/", this.addRead);
    this.router.delete("/:id", this.delete);
  }
}
