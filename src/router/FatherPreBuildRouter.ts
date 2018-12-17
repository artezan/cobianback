import { Request, Response, Router } from "express";
import FatherPreBuild from "../models/FatherPreBuild";
import PreBuild from "../models/PreBuild";

export class FatherPreBuildRouter {
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
    FatherPreBuild.find(obj)
      .populate("preBuild")
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

    FatherPreBuild.findById(id)
      .populate("preBuild")
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public create(req: Request, res: Response): void {
    const name: string = req.body.name;
    const city: string = req.body.city;
    const preBuild: any[] = req.body.preBuild;
    const notes = req.body.notes;
    const numOfChild = req.body.numOfChild;

    const f = new FatherPreBuild({
      name,
      city,
      notes,
      preBuild,
      numOfChild,
    });

    f.save()
      .then(data => {
        res.status(201).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public update(req: Request, res: Response): void {
    const _id: string = req.params.id;
    FatherPreBuild.findByIdAndUpdate({ _id: _id }, req.body)
      .then(() => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const _id: string = req.params.id;
    await PreBuild.deleteMany({ preBuild: _id });
    FatherPreBuild.findByIdAndRemove({ _id: _id })
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
