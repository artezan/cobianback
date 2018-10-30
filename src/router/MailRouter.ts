import { Request, Response, Router } from "express";
import * as nodemailer from "nodemailer";
import * as multer from "multer";
import { MailOptions } from "nodemailer/lib/smtp-transport";
import VerificationEmail from "../models/VerificationEmail";
const uploadService = multer({ storage: multer.memoryStorage() });
const transporterGeneral = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "artezan.cabrera@gmail.com", // generated ethereal user
    pass: "180292CESARartezan", // generated ethereal password
  },
});

export class MailRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.routes();
  }
  public sendEmail(req: Request, res: Response) {
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
          user: "artezan.cabrera@gmail.com", // generated ethereal user
          pass: "180292CESARartezan", // generated ethereal password
        },
      });

      // setup email data with unicode symbols
      const mailOptions = {
        from: '"Fred Foo 👻" <artezan.cabrera@gmail.com>', // sender address
        to: "artezan_015@hotmail.com, artezan.cabrera@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b><p>👻😄</p>", // html body
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
  public sendFilesEmail(req, res: Response) {
    const file = req.file;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: "artezan.cabrera@gmail.com", // generated ethereal user
        pass: "180292CESARartezan", // generated ethereal password
      },
    });
    // setup email data with unicode symbols
    const mailOptions: MailOptions = {
      from: '"Fred Foo 👻" <artezan.cabrera@gmail.com>', // sender address
      to: "artezan_015@hotmail.com, artezan.cabrera@gmail.com", // list of receivers
      subject: "Archivo 📁", // Subject line
      text: "Archivo Ajunto", // plain text body
      html: "<b>Hello world file</b><p>✌</p>", // html body
      attachments: [{ filename: file.originalname, content: file.buffer }],
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).json({ data: false });
        return console.log(error);
      }
      // Preview only available when sending through an Ethereal account
      res.status(200).json({ data: true });
    });
  }
  public async addEmail(req, res): Promise<void> {
    const email: string = req.body.email;
    const token = Math.floor(1000 + Math.random() * 9000);

    const isOnDB = await VerificationEmail.findOne({ email: email }).remove();

    const newEmail = new VerificationEmail({
      email,
      token,
    });
    newEmail
      .save()
      .then(data => {
        // setup email data with unicode symbols
        const mailOptions: MailOptions = {
          from: '"CobianApp" <artezan.cabrera@gmail.com>', // sender address
          to: email,
          subject: "Verificar Cuenta", // Subject line
          text: "Este es su código de verificación:", // plain text body
          html: `<p>Este es su código de verificación: </p><b>${token}</b>`, // html body
        };
        // send mail with defined transport object
        transporterGeneral.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error");

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
  }
  public verifyEmail(req, res) {
    const email: string = req.body.email;
    const token: string = req.body.token;
    VerificationEmail.findOne({ email: email, token: token })
      .then(async data => {
        if (data) {
          await VerificationEmail.findOne({ email: email }).remove();
          res.status(200).json({ data: true });
        } else {
          res.status(200).json({ data: false });
        }
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  public routes() {
    this.router.get("/", this.sendEmail);
    // this.router.post("/", uploadService.single("file"), this.sendFilesEmail);
    this.router.post("/add", this.addEmail);
    this.router.post("/find", this.verifyEmail);
  }
}
