"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const AdministratorRouter_1 = require("./router/AdministratorRouter");
const AdviserRouter_1 = require("./router/AdviserRouter");
const BuyerRouter_1 = require("./router/BuyerRouter");
const NotificationRouter_1 = require("./router/NotificationRouter");
const GoalRouter_1 = require("./router/GoalRouter");
const ManagementRouter_1 = require("./router/ManagementRouter");
const CreditRouter_1 = require("./router/CreditRouter");
const OfertRouter_1 = require("./router/OfertRouter");
const OfficeRouter_1 = require("./router/OfficeRouter");
const PropertyRouter_1 = require("./router/PropertyRouter");
const ScheduleRouter_1 = require("./router/ScheduleRouter");
const SellerRouter_1 = require("./router/SellerRouter");
const StatusBuyerPropertyRouter_1 = require("./router/StatusBuyerPropertyRouter");
const UserSession_1 = require("./router/UserSession");
const BuildRouter_1 = require("./router/BuildRouter");
const MakerRouter_1 = require("./router/MakerRouter");
const SalesRouter_1 = require("./router/SalesRouter");
const MailRouter_1 = require("./router/MailRouter");
const ChatRouter_1 = require("./router/ChatRouter");
class Server {
    constructor() {
        this.administratorRouter = new AdministratorRouter_1.AdministratorRouter();
        this.adviserRouter = new AdviserRouter_1.AdviserRouter();
        this.buyerRouter = new BuyerRouter_1.BuyerRouter();
        this.creditRouter = new CreditRouter_1.CreditRouter();
        this.goalRouter = new GoalRouter_1.GoalRouter();
        this.managementRouter = new ManagementRouter_1.ManagementRouter();
        this.notificationRouter = new NotificationRouter_1.NotificationRouter();
        this.ofertRouter = new OfertRouter_1.OfertRouter();
        this.officeRouter = new OfficeRouter_1.OfficeRouter();
        this.propertyRouter = new PropertyRouter_1.PropertyRouter();
        this.scheduleRouter = new ScheduleRouter_1.ScheduleRouter();
        this.sellerRouter = new SellerRouter_1.SellerRouter();
        this.statusBuyerPropertyRouter = new StatusBuyerPropertyRouter_1.StatusBuyerPropertyRouter();
        this.userSession = new UserSession_1.UserSession();
        this.buildRouter = new BuildRouter_1.BuildRouter();
        this.makerRouter = new MakerRouter_1.MakerRouter();
        this.saleRouter = new SalesRouter_1.SalesRouter();
        this.mailRouter = new MailRouter_1.MailRouter();
        this.chatRouter = new ChatRouter_1.ChatRouter();
        this.app = express();
        this.config();
        this.routes();
        /* console.log("CPU", os.cpus());
        console.log(os.totalmem());
        console.log(os.freemem()); */
    }
    // application config
    config() {
        const MONGO_URI = "mongodb://vleeko:180292cesar@ds131942.mlab.com:31942/vleeko";
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
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            // tslint:disable-next-line:max-line-length
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
            res.header("Access-Control-Allow-Credentials", "true");
            next();
        });
    }
    // application routes
    routes() {
        const router = express.Router();
        // JWT auth
        /*  this.app.use(
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
    }
}
// export
exports.default = new Server().app;
//# sourceMappingURL=server.js.map