import { Request, Response, Router } from "express";
import PreBuyer from "../models/PreBuyer";
import Chat from "../models/Chat";

export class PreBuyerRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public all(req: Request, res: Response): void {
    PreBuyer.find()
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

    PreBuyer.findById(id)
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
    const lastName: string = req.body.lastName;
    const password: string = req.body.password;
    const email: string = req.body.email;
    const phone: string = req.body.phone;
    const preBuild: string = req.body.preBuild;

    const preBuyer = new PreBuyer({
      name,
      lastName,
      password,
      email,
      preBuild,
      phone,
    });

    preBuyer
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
    PreBuyer.findByIdAndUpdate({ _id: _id }, req.body)
      .then(() => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const _id: string = req.params.id;
    await Chat.find({ buyer: _id }).remove();

    PreBuyer.findByIdAndRemove({ _id: _id })
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
