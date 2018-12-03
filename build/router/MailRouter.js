"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const VerificationEmail_1 = require("../models/VerificationEmail");
const theme1_1 = require("../_helpers/html-templates/theme1");
const theme2_1 = require("../_helpers/html-templates/theme2");
const theme3_1 = require("../_helpers/html-templates/theme3");
const base64 = require("base-64");
const uploadService = multer({ storage: multer.memoryStorage() });
const transporterGeneral = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: "artezan.cabrera@gmail.com",
        pass: "180292CESARartezan",
    },
});
class MailRouter {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    sendEmail(req, res) {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        nodemailer.createTestAccount((err, account) => {
            // create reusable transporter object using the default SMTP transport
            /*    const transporter = nodemailer.createTransport({
              host: "smtp.ethereal.email",
              port: 587,
              secure: false, // true for 465, false for other ports
              auth: {
                user: account.user, // generated ethereal user
                pass: account.pass // generated ethereal password
              }
            });
       */
            // cear acceso https://myaccount.google.com/lesssecureapps?pli=1
            const transporter = nodemailer.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                port: 465,
                auth: {
                    user: "artezan.cabrera@gmail.com",
                    pass: "180292CESARartezan",
                },
            });
            // setup email data with unicode symbols
            const mailOptions = {
                from: '"Fred Foo 👻" <artezan.cabrera@gmail.com>',
                to: "artezan_015@hotmail.com, artezan.cabrera@gmail.com",
                subject: "Hello ✔",
                text: "Hello world?",
                html: "<b>Hello world?</b><p>👻😄</p>",
            };
            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(500).json({ data: false });
                    return console.log(error);
                }
                console.log("Message sent: %s", info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                res.status(200).json({ data: true });
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        });
    }
    sendEmailToReset(req, res) {
        const email = req.body.email;
        const name = req.body.name;
        const password = base64.decode(req.body.base64);
        // cear acceso https://myaccount.google.com/lesssecureapps?pli=1
        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: "artezan.cabrera@gmail.com",
                pass: "180292CESARartezan",
            },
        });
        // setup email data with unicode symbols
        const mailOptions = {
            from: "Inmobiliaria Cobian <artezan.cabrera@gmail.com>",
            to: email,
            subject: "Recuperar Contraseña",
            html: `<p>Hola ${name} </p> <p>Esta es tu nueva contraseña <b>${password}</b> (la puedes cambiar en la app)</p>`,
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({ data: false });
                return console.log(error);
            }
            res.status(200).json({ data: true });
        });
    }
    sendFilesEmail(req, res) {
        const files = req.files;
        const mailsToSend = req.body.mails;
        const names = req.body.names;
        const msg = req.body.msg;
        const template = req.body.template;
        const arrFiles = files.map(file => {
            return {
                filename: file.originalname,
                content: file.buffer,
            };
        });
        // setear mails y html
        const arrNames = names.split(",");
        const arrToSend = mailsToSend.split(",").map((email, i) => {
            let themePicked = "";
            if (template === "theme1") {
                themePicked = theme1_1.Theme1.Instance().templateHTML(arrNames[i], msg);
            }
            else if (template === "theme2") {
                themePicked = theme2_1.Theme2.Instance().templateHTML(arrNames[i], msg);
            }
            else if (template === "theme3") {
                themePicked = theme3_1.Theme3.Instance().templateHTML(arrNames[i], msg);
            }
            return {
                themePicked,
                email,
            };
        });
        arrToSend.forEach(dataSend => {
            // setup email data with unicode symbols
            const mailOptions = {
                from: "Inmobiliaria Cobian <artezan.cabrera@gmail.com>",
                to: dataSend.email,
                subject: "Archivo Adjunto 📁",
                html: dataSend.themePicked,
                attachments: arrFiles,
            };
            // send mail with defined transport object
            transporterGeneral.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(500).json({ data: false });
                    return console.log(error);
                }
                // Preview only available when sending through an Ethereal account
                res.status(200).json({ data: true });
            });
        });
    }
    sendMsgEmail(req, res) {
        const mailsToSend = req.body.mails;
        const names = req.body.names;
        const msg = req.body.msg;
        const template = req.body.template;
        // setear mails y html
        const arrNames = names.split(",");
        const arrToSend = mailsToSend.split(",").map((email, i) => {
            let themePicked = "";
            if (template === "theme1") {
                themePicked = theme1_1.Theme1.Instance().templateHTML(arrNames[i], msg);
            }
            else if (template === "theme2") {
                themePicked = theme2_1.Theme2.Instance().templateHTML(arrNames[i], msg);
            }
            else if (template === "theme3") {
                themePicked = theme3_1.Theme3.Instance().templateHTML(arrNames[i], msg);
            }
            return {
                themePicked,
                email,
            };
        });
        arrToSend.forEach(dataSend => {
            // setup email data with unicode symbols
            const mailOptions = {
                from: "Inmobiliaria Cobian <artezan.cabrera@gmail.com>",
                to: dataSend.email,
                subject: "Aviso de Inmobiliaria Cobian ",
                html: dataSend.themePicked,
            };
            // send mail with defined transport object
            transporterGeneral.sendMail(mailOptions, (error, info) => {
                if (error) {
                    res.status(500).json({ data: false });
                    return console.log(error);
                }
                // Preview only available when sending through an Ethereal account
                res.status(200).json({ data: true });
            });
        });
    }
    addEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const token = Math.floor(1000 + Math.random() * 9000);
            const isOnDB = yield VerificationEmail_1.default.findOne({ email: email }).remove();
            const newEmail = new VerificationEmail_1.default({
                email,
                token,
            });
            newEmail
                .save()
                .then(data => {
                // setup email data with unicode symbols
                const mailOptions = {
                    from: '"CobianApp" <artezan.cabrera@gmail.com>',
                    to: email,
                    subject: "Verificar Cuenta",
                    text: "Este es su código de verificación:",
                    html: `<p>Este es su código de verificación: </p><b>${token}</b>`,
                };
                // send mail with defined transport object
                transporterGeneral.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        res.status(500).json({ data: false });
                        return console.log(error);
                    }
                    // Preview only available when sending through an Ethereal account
                    res.status(200).json({ data: true });
                });
            })
                .catch(error => {
                res.status(500).json({ error });
            });
        });
    }
    verifyEmail(req, res) {
        const email = req.body.email;
        const token = req.body.token;
        VerificationEmail_1.default.findOne({ email: email, token: token })
            .then((data) => __awaiter(this, void 0, void 0, function* () {
            if (data) {
                yield VerificationEmail_1.default.findOne({ email: email }).remove();
                res.status(200).json({ data: true });
            }
            else {
                res.status(200).json({ data: false });
            }
        }))
            .catch(error => {
            res.status(500).json({ error });
        });
    }
    routes() {
        this.router.get("/", this.sendEmail);
        this.router.post("/resetpass", this.sendEmailToReset);
        this.router.post("/files", uploadService.array("file"), this.sendFilesEmail);
        this.router.post("/msg", uploadService.array("file"), this.sendMsgEmail);
        this.router.post("/add", this.addEmail);
        this.router.post("/find", this.verifyEmail);
    }
}
exports.MailRouter = MailRouter;
//# sourceMappingURL=MailRouter.js.map