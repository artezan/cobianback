import { Request, Response, Router } from "express";
import PreBuild from "../models/PreBuild";

export class PreBuildRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public all(req: Request, res: Response): void {
    PreBuild.find()
      .populate("preBuyer")
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

    PreBuild.findById(id)
      .populate("preBuyer")
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public create(req: Request, res: Response): void {
    const name: string = req.body.name;
    const timeLine: string = req.body.timeLine;
    const city: string = req.body.city;
    const preBuyer: any[] = req.body.preBuyer;
    const notes = req.body.notes;

    const preBuild = new PreBuild({
      name,
      timeLine,
      preBuyer,
      city,
      notes
    });

    preBuild
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
    PreBuild.findByIdAndUpdate({ _id: _id }, req.body)
      .then(() => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public delete(req: Request, res: Response): void {
    const _id: string = req.params.id;

    PreBuild.findByIdAndRemove({ _id: _id })
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
    this.router.get("/:id", this.oneById);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}
