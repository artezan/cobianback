import { Request, Response, Router } from "express";
import { ObjectId } from "../../node_modules/@types/bson";
import * as base64 from "base-64";
import StatusBuyerProperty from "../models/StatusBuyerProperty";
import Seller from "../models/Seller";
import Buyer from "../models/Buyer";
import Administrator from "../models/Administrator";
import Adviser from "../models/Adviser";
import Management from "../models/Management";
import Maker from "../models/Maker";
import Office from "../models/Office";
import * as jwt from "jsonwebtoken";
import { config } from "../config";

export class UserSession {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  public async byPassword(req: Request, res: Response): Promise<void> {
    const strDecode: string = base64.decode(req.body.base64);
    const email = strDecode.substring(0, strDecode.indexOf(":"));
    const password = strDecode.substring(
      strDecode.indexOf(":") + 1,
      strDecode.length,
    );
    // crea promise con respuesta si encuentra o no
    const promise = new Promise<any>((resolve, reject) => {
      // busca la info
      try {
        //   admin
        Administrator.find({ password: password, email: email })
          .then(data => {
            if (data.length > 0) {
              resolve({ data: data, type: "administrator" });
            } else {
              //   buyer
              Buyer.find({ password: password, email: email })
                .then(data => {
                  if (data.length > 0) {
                    resolve({ data: data, type: "buyer" });
                  } else {
                    Seller.find({ password: password, email: email })
                      .then(data => {
                        if (data.length > 0) {
                          resolve({ data: data, type: "seller" });
                        } else {
                          Adviser.find({ password: password, email: email })
                            .then(data => {
                              if (data.length > 0) {
                                resolve({ data: data, type: "adviser" });
                              } else {
                                // resolve("error");
                                Management.find({
                                  password: password,
                                  email: email,
                                })
                                  .then(data => {
                                    if (data.length > 0) {
                                      resolve({
                                        data: data,
                                        type: "management",
                                      });
                                    } else {
                                      Maker.find({
                                        password: password,
                                        email: email,
                                      })
                                        .then(data => {
                                          if (data.length > 0) {
                                            resolve({
                                              data: data,
                                              type: "maker",
                                            });
                                          } else {
                                            Office.find({
                                              password: password,
                                              email: email,
                                            })
                                              .then(data => {
                                                if (data.length > 0) {
                                                  resolve({
                                                    data: data,
                                                    type: "office",
                                                  });
                                                } else {
                                                  resolve("error");
                                                }
                                              })
                                              .catch(error => { });
                                          }
                                        })
                                        .catch(error => { });
                                    }
                                  })
                                  .catch(error => { });
                              }
                            })
                            .catch(error => { });
                        }
                      })
                      .catch(error => { });
                  }
                })
                .catch(error => { });
            }
          })
          .catch(error => { });
      } catch (error) {
        console.log("error");
      }
    });
    const data = await promise;

    if (data === "error") {
      res.status(200).json({ data: "error" });
    } else {
      /* const token = jwt.sign({ sub: data.data.password }, "sss");
      const result = {
        data: data.data,
        type: data.type,
        token: token,
      }; */
      // res.status(200).json({ data: result });
      res.status(200).json({ data });
    }
  }
  // set up our routes
  public routes() {
    this.router.post("/", this.byPassword);
  }
}
