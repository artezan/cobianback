import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as mongoose from "mongoose";
import * as logger from "morgan";
import * as path from "path";
import { TicketsRouter } from "./router/TicketsRouter";
import { CustomersRouter } from "./router/CustomersRouter";
import { ConsultantRouter } from "./router/ConsultantRouter";
import { CompaniesRouter } from "./router/CompaniesRouter";
import { PostsRouter } from "./router/PostsRouter";
import { CustmersLogic } from "./logic/CustumersLogic";
import { ConsultantsLogic } from "./logic/ConsultantsLogic";
import { CompaniesLogic } from "./logic/CompaniesLogic";

class Server {
  public ticketsRouter = new TicketsRouter();
  public customersRouter = new CustomersRouter();
  public consultantsRouter = new ConsultantRouter();
  public companiesRouter = new CompaniesRouter();
  public postsRouter = new PostsRouter();

  // set app to be of type express.Application
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  // application config
  public config(): void {
    const MONGO_URI: string =
      "mongodb://cesar:180292@ds117469.mlab.com:17469/cesar";
      // "mongodb://31.220.52.51:27017/db2";
    mongoose.connect(MONGO_URI || process.env.MONGODB_URI);

    // express middleware
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(logger("dev"));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.static("doc"));
    // imagenes subidas
    this.app.use(express.static(path.join(__dirname, "/public")));

    // cors
    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "http://localhost:8080");
      res.header("Access-Control-Allow-Origin", "http://localhost:8100");
      res.header("Access-Control-Allow-Origin", "http://localhost:4200");
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS",
      );
      // tslint:disable-next-line:max-line-length
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials",
      );
      res.header("Access-Control-Allow-Credentials", "true");
      next();
    });
  }

  // application routes
  public routes(): void {
    const router: express.Router = express.Router();
    // seguridad por credenciales
  /*   this.app.use(async (req, res, next) => {
      console.log(req.headers.authorization);
      // pide en el header user y authorization
      if (!req.headers.authorization && !req.headers.user) {
        return res.status(403).json({ error: "No credentials sent!" });
      } else {
        // cliente
        if (req.headers.user === "customer") {
          const isFind = await CustmersLogic.Instance().checkCustomer(
            req.headers.authorization,
          );
          if (!isFind) {
            return res.status(403).json({ error: "No credentials match!" });
          } // consultor
        } else if (req.headers.user === "consultant") {
          const isFind = await ConsultantsLogic.Instance().checkConsultant(
            req.headers.authorization,
          );
          if (!isFind) {
            return res.status(403).json({ error: "No credentials match!" });
          } // company
        } else if (req.headers.user === "company") {
          const isFind = await CompaniesLogic.Instance().checkCompany(
            req.headers.authorization,
          );
          if (!isFind) {
            return res.status(403).json({ error: "No credentials match!" });
          } // no user
        } else {
          return res.status(403).json({ error: "No credentials match!" });
        }
      }
      next();
    }); */
    this.app.use("/", router);
    this.app.use("/api/v1/companies", this.companiesRouter.router);
    this.app.use("/api/v1/consultants", this.consultantsRouter.router);
    this.app.use("/api/v1/customers", this.customersRouter.router);
    this.app.use("/api/v1/tickets", this.ticketsRouter.router);
    this.app.use("/api/v1/posts", this.postsRouter.router);
  }
}

// export
export default new Server().app;
