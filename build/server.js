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
const TicketsRouter_1 = require("./router/TicketsRouter");
const CustomersRouter_1 = require("./router/CustomersRouter");
const ConsultantRouter_1 = require("./router/ConsultantRouter");
const CompaniesRouter_1 = require("./router/CompaniesRouter");
const PostsRouter_1 = require("./router/PostsRouter");
class Server {
    constructor() {
        this.ticketsRouter = new TicketsRouter_1.TicketsRouter();
        this.customersRouter = new CustomersRouter_1.CustomersRouter();
        this.consultantsRouter = new ConsultantRouter_1.ConsultantRouter();
        this.companiesRouter = new CompaniesRouter_1.CompaniesRouter();
        this.postsRouter = new PostsRouter_1.PostsRouter();
        this.app = express();
        this.config();
        this.routes();
    }
    // application config
    config() {
        const MONGO_URI = "mongodb://cesar:180292@ds117469.mlab.com:17469/cesar";
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
exports.default = new Server().app;
//# sourceMappingURL=server.js.map