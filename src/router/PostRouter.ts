import { Request, Response, Router } from "express";
import Post from "../models/Post";
/**
 * @apiDefine AdministratorResponseParams
 * @apiSuccess {string} name
 * @apiSuccess {ObjectId} _id
 * @apiSuccess {Date} timestamp
 */
export class PostRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public all(req: Request, res: Response): void {
    const city = req.headers.city;
    const obj = {};
    if (city !== undefined) {
      obj["city"] = city;
    }
    Post.find(obj)
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public oneById(req: Request, res: Response): void {
    const id: string = req.params.id;

    Post.findById(id)
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public createPost(req: Request, res: Response): void {
    const title: string = req.body.title;
    const content: string = req.body.content;
    const status: string = req.body.status;
    const tags: string[] = req.body.tags;
    const uids: string[] = req.body.uids;
    const city: string = req.body.city;

    const p = new Post({
      title,
      content,
      status,
      tags,
      uids,
      city,
    });
    p.save()
      .then(data => {
        res.status(201).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public update(req: Request, res: Response): void {
    const _id: string = req.params.id;

    Post.findByIdAndUpdate({ _id: _id }, req.body)
      .then(data => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public delete(req: Request, res: Response): void {
    const _id: string = req.params.id;

    Post.findByIdAndRemove({ _id: _id })
      .then(() => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  public searchByIdOrTags(req: Request, res: Response): void {
    const city = req.headers.city;
    const id = req.body.id;
    const tags = req.body.tags;
    Post.find({
      $or: [{ uids: id }, { tags }],
    })
      .sort({ timestamp: -1 })
      .then(data => {
        if (city !== undefined) {
          const dataFilter = data.filter((post: any) =>
            post.city.some(c => c === city),
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

  // set up our routes
  public routes() {
    this.router.get("/", this.all);
    this.router.get("/:id", this.oneById);
    this.router.post("/", this.createPost);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
    this.router.post("/search", this.searchByIdOrTags);
  }
}
