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
import { MailRouter } from "./router/MailRouter";
import { config } from "./config";
import * as expressJwt from "express-jwt";
import { ChatRouter } from "./router/ChatRouter";
import { PreBuyerRouter } from "./router/PreBuyerRouter";
import { PreBuildRouter } from "./router/PreBuildRouter";

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
  public mailRouter = new MailRouter();
  public chatRouter = new ChatRouter();
  public preBuyerRouter = new PreBuyerRouter();
  public preBuildRouter = new PreBuildRouter();

  // set app to be of type express.Application
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    /* console.log("CPU", os.cpus());
    console.log(os.totalmem());
    console.log(os.freemem()); */
  }

  // application config
  public config(): void {
    const MONGO_URI: string =
      "mongodb://vleeko:180292cesar@ds131942.mlab.com:31942/vleeko";
    // "mongodb://cesar:180292@ds117469.mlab.com:17469/cesar";
    // "mongodb://31.220.58.194:27017/db1";
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
    // JWT auth
    /* this.app.use(
      expressJwt({ secret: "sss" }).unless({
        path: [
          // public routes that don't require authentication
          "/api/v1/usersession/",
          "/api/v1/buyer/checkbuyer/",
          "/api/v1/buyer/",
          "/api/v1/administrator/",
          "/api/v1/mail/add/",
          "/api/v1/mail/find/",
        ],
      }),
    ); */
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
    this.app.use("/api/v1/mail", this.mailRouter.router);
    this.app.use("/api/v1/chat", this.chatRouter.router);
    this.app.use("/api/v1/prebuyer", this.preBuyerRouter.router);
    this.app.use("/api/v1/prebuild", this.preBuildRouter.router);
  }
}

// export
export default new Server().app;
