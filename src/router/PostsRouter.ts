import { Request, Response, Router } from "express";
import Ticket from "../models/Ticket";
import { CustmersLogic } from "../logic/CustumersLogic";
import { ConsultantsLogic } from "../logic/ConsultantsLogic";
import Post from "../models/Post";
import { IO } from "../app";
/**
 * @apiDefine PostResponseParams
 * @apiSuccess {Date} timestamp
 * @apiSuccess {ObjectId} _id
 * @apiSuccess {string} title Titulo
 * @apiSuccess {string} content Contenido
 * @apiSuccess {customer[]} customer
 * @apiSuccess {consultant[]} consultant
 * @apiSuccess {tickets[]} tickets
 * @apiSuccess {boolean} isByCustomer
 */
export class PostsRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  /**
   * @api {GET} /posts/byticketid/ Request all
   * @apiVersion  0.1.0
   * @apiName get
   * @apiGroup Post
   *
   *
   * @apiSampleRequest /posts/byticketid/
   *
   * @apiSuccessExample {json} Success-Response a JSON-Array<Post>:
   * { "data": [ { "timestamp": "2018-08-10T17:35:51.812Z", "_id": "5b6dccf7548e41383c4174ae", "title": "Consultoria  de Algo", "content": "Se requiere una consulta para lograr un objetivo", "customer": { "timestamp": "2018-08-10T16:06:48.854Z", "totalHours": 7, "tickets": [ "5b6dbf67b9da8f0894dd2a05" ], "_id": "5b6db8185291313ddcc318b8", "logo": "http://31.220.52.51:3000/LOGO.png", "name": "Cliente 1", "adress": "Direccion 1", "phone": 22222, "email": "cliente@gmail.com", "workArea": "Industria de ...", "password": "12345", "companyId": "5b6db7c05291313ddcc318b7", "__v": 3 }, "ticket": { "timestamp": "2018-08-10T16:37:59.838Z", "ranking": 0, "cost": 2000, "status": "Pendiente", "isPay": false, "_id": "5b6dbf67b9da8f0894dd2a05", "hours": 7, "description": "Solucionar problema con", "customer": "5b6db8185291313ddcc318b8", "companyId": "5b6db7c05291313ddcc318b7", "__v": 0, "consultant": "5b6dc7f2b9da8f0894dd2a06" }, "isByCustomer": true, "__v": 0 }, { "timestamp": "2018-08-10T17:41:32.883Z", "_id": "5b6dce4c548e41383c4174af", "content": "Claro yo lo puedo ayudar a lograr sus objetivos", "consultant": { "timestamp": "2018-08-10T17:14:26.803Z", "rankingAverage": 0, "tickets": [], "_id": "5b6dc7f2b9da8f0894dd2a06", "name": "Consultor 2", "lastName": "Apellido", "password": "1234", "description": "Especialidad en", "companyId": "5b6db7c05291313ddcc318b7", "__v": 1 }, "ticket": { "timestamp": "2018-08-10T16:37:59.838Z", "ranking": 0, "cost": 2000, "status": "Pendiente", "isPay": false, "_id": "5b6dbf67b9da8f0894dd2a05", "hours": 7, "description": "Solucionar problema con", "customer": "5b6db8185291313ddcc318b8", "companyId": "5b6db7c05291313ddcc318b7", "__v": 0, "consultant": "5b6dc7f2b9da8f0894dd2a06" }, "isByCustomer": false, "__v": 0 } ] }
   */
  public all(req: Request, res: Response): void {
    const ticketId: string = req.params.ticketId;
    Post.find({ ticket: ticketId })
      .populate("customer")
      .populate("consultant")
      .populate("ticket")
      .sort({ timestamp: "asc" })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public oneById(req: Request, res: Response): void {
    const ticketId: string = req.params.ticketId;

    Ticket.findById(ticketId)
      .populate("customer")
      .populate("consultant")
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });

    /*User.findOne({ username }).select('lastName')
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });*/
  }
  /**
   * @api {POST} /posts/ Request New
   * @apiVersion  0.1.0
   * @apiName post
   * @apiGroup Post
   * @apiDescription
   * Se debe asignar un Cliente id o un Consultor id
   *
   *
   * @apiParam {string} title Titulo del Comentario
   * @apiParam {string} content Contenido o problema
   * @apiParam {ObjectId} [customerId]
   * @apiParam {ObjectId} [consultantId]
   * @apiParam {ObjectId} ticketId
   * @apiParam {boolean} isByCustomer
   *
   * @apiParamExample {json} Request-Example:
   * { "title":"Consultoria  de Algo", "content":"Se requiere una consulta para lograr un objetivo", "customerId":"5b6db8185291313ddcc318b8", "ticketId":"5b6dbf67b9da8f0894dd2a05", "isByCustomer": true }
   *
   * @apiUse PostResponseParams
   *
   * @apiSuccessExample {json} Success-Response Created Post:
   * { "data": { "timestamp": "2018-08-10T17:35:51.812Z", "_id": "5b6dccf7548e41383c4174ae", "title": "Consultoria  de Algo", "content": "Se requiere una consulta para lograr un objetivo", "customer": "5b6db8185291313ddcc318b8", "ticket": "5b6dbf67b9da8f0894dd2a05", "isByCustomer": true, "__v": 0 } }
   */

  public create(req: Request, res: Response): void {

    const title: string = req.body.title;
    const content: string = req.body.content;
    const customer: string = req.body.customerId;
    const consultant: string = req.body.consultantId;
    const ticket: string = req.body.ticketId;
    const isByCustomer: boolean = req.body.isByCustomer;


    const post = new Post({
      title,
      content,
      customer,
      consultant,
      ticket,
      isByCustomer
    });
    post
      .save()
      .then(data => {
        // emit
        IO.emit("NEW_POST", data);
        res.status(201).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {PUT} /posts/:postId Request Update
   * @apiVersion  0.1.0
   * @apiName put
   * @apiGroup Post
   *
   * @apiParam {ObjectId} postId Must be placed as QueryParam
   * @apiParam {string} title Titulo del Comentario
   * @apiParam {string} content Contenido o problema
   * @apiParam {ObjectId} [customerId]
   * @apiParam {ObjectId} [consultantId]
   * @apiParam {ObjectId} ticketId
   * @apiParam {boolean} isByCustome
   *
   * @apiExample Example usage:
   * http://31.220.52.51:3000/api/v1/posts/5b6dccf7548e41383c4174ae
   *
   * @apiParamExample {json} Request-Example:
   * { "content": "Se requiere una consultoria para lograr un objetivo" }
   *
   * @apiSuccessExample {json} Success-Response:
   * { "data": true }
   */

  public update(req: Request, res: Response): void {
    const _id: string = req.params.postId;

    Post.findByIdAndUpdate({ _id: _id }, req.body)
      .then(() => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {DELETE} /posts/:_id Request  Deleted
   * @apiVersion  0.1.0
   * @apiName deleteByToken
   * @apiGroup Post
   *
   *
   * @apiParam {ObjectId} _id Must be placed as QueryParam
   *
   * @apiExample Example usage:
   * http://31.220.52.51:3000/api/v1/posts/5b6dccf7548e41383c4174ae
   *
   * @apiSuccessExample {json} Success-Response:
   * {"data":true}
   */

  public delete(req: Request, res: Response): void {
    const _id: string = req.params.postId;

    Post.findByIdAndRemove({ _id: _id })
      .then(() => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  // set up our routes
  public routes() {
    this.router.get("/byticketid/:ticketId", this.all);
    this.router.post("/", this.create);
    this.router.put("/:postId", this.update);
    this.router.delete("/:postId", this.delete);
  }
}
