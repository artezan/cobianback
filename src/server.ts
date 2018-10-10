import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as express from "express";
import * as helmet from "helmet";
import * as mongoose from "mongoose";
import * as logger from "morgan";
import * as path from "path";
import { AdministratorRouter } from "./router/AdministratorRouter";
import { AdviserRouter } from "./router/AdviserRouter";
import { BuyerRouter } from "./router/BuyerRouter";
import { NotificationRouter } from "./router/NotificationRouter";
import { GoalRouter } from "./router/GoalRouter";
import { ManagementRouter } from "./router/ManagementRouter";
import { CreditRouter } from "./router/CreditRouter";
import { OfertRouter } from "./router/OfertRouter";
import { OfficeRouter } from "./router/OfficeRouter";
import { PropertyRouter } from "./router/PropertyRouter";
import { ScheduleRouter } from "./router/ScheduleRouter";
import { SellerRouter } from "./router/SellerRouter";
import { StatusBuyerPropertyRouter } from "./router/StatusBuyerPropertyRouter";
import { UserSession } from "./router/UserSession";
import { BuildRouter } from "./router/BuildRouter";
import { MakerRouter } from "./router/MakerRouter";
import { SalesRouter } from "./router/SalesRouter";

class Server {
  public administratorRouter = new AdministratorRouter();
  public adviserRouter = new AdviserRouter();
  public buyerRouter = new BuyerRouter();
  public creditRouter = new CreditRouter();
  public goalRouter = new GoalRouter();
  public managementRouter = new ManagementRouter();
  public notificationRouter = new NotificationRouter();
  public ofertRouter = new OfertRouter();
  public officeRouter = new OfficeRouter();
  public propertyRouter = new PropertyRouter();
  public scheduleRouter = new ScheduleRouter();
  public sellerRouter = new SellerRouter();
  public statusBuyerPropertyRouter = new StatusBuyerPropertyRouter();
  public userSession = new UserSession();
  public buildRouter = new BuildRouter();
  public makerRouter = new MakerRouter();
  public saleRouter = new SalesRouter();

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
      "mongodb://vleeko:180292cesar@ds131942.mlab.com:31942/vleeko";
    // "mongodb://cesar:180292@ds117469.mlab.com:17469/cesar";
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
      res.header("Access-Control-Allow-Origin", "http://31.220.52.51:3002");
      // res.header("Access-Control-Allow-Origin", "*");
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
    this.app.use("/api/v1/administrator", this.administratorRouter.router);
    this.app.use("/api/v1/adviser", this.adviserRouter.router);
    this.app.use("/api/v1/buyer", this.buyerRouter.router);
    this.app.use("/api/v1/credit", this.creditRouter.router);
    this.app.use("/api/v1/goal", this.goalRouter.router);
    this.app.use("/api/v1/management", this.managementRouter.router);
    this.app.use("/api/v1/notification", this.notificationRouter.router);
    this.app.use("/api/v1/ofert", this.ofertRouter.router);
    this.app.use("/api/v1/office", this.officeRouter.router);
    this.app.use("/api/v1/property", this.propertyRouter.router);
    this.app.use("/api/v1/schedule", this.scheduleRouter.router);
    this.app.use("/api/v1/seller", this.sellerRouter.router);
    this.app.use("/api/v1/status", this.statusBuyerPropertyRouter.router);
    this.app.use("/api/v1/usersession", this.userSession.router);
    this.app.use("/api/v1/build", this.buildRouter.router);
    this.app.use("/api/v1/maker", this.makerRouter.router);
    this.app.use("/api/v1/sale", this.saleRouter.router);
  }
}

// export
export default new Server().app;
