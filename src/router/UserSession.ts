import { Request, Response, Router } from "express";
import { ObjectId } from "../../node_modules/@types/bson";
import * as base64 from "base-64";
import StatusBuyerProperty from "../models/StatusBuyerProperty";
import Seller from "../models/Seller";
import Buyer from "../models/Buyer";
import Administrator from "../models/Administrator";
import Adviser from "../models/Adviser";
import Management from "../models/Management";

export class UserSession {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  public async byPassword(req: Request, res: Response): Promise<void> {
    const strDecode: string = base64.decode(req.params.base64);
    const name = strDecode.substring(0, strDecode.indexOf(":"));
    const password = strDecode.substring(
      strDecode.indexOf(":") + 1,
      strDecode.length,
    );
    // crea promise con respuesta si encuentra o no
    const promise = new Promise<string>((resolve, reject) => {
      // busca la info
      try {
        //   admin
        Administrator.find({ password: password, name: name })
          .then(data => {
            if (data.length > 0) {
              resolve("administrator");
            } else {
              //   buyer
              Buyer.find({ password: password, name: name })
                .then(data => {
                  if (data.length > 0) {
                    resolve("buyer");
                  } else {
                    Seller.find({ password: password, name: name })
                      .then(data => {
                        if (data.length > 0) {
                          resolve("seller");
                        } else {
                          Adviser.find({ password: password, name: name })
                            .then(data => {
                              if (data.length > 0) {
                                resolve("adviser");
                              } else {
                                // resolve("error");
                                Management.find({
                                  password: password,
                                  name: name,
                                })
                                  .then(data => {
                                    if (data.length > 0) {
                                      resolve("management");
                                    } else {
                                      resolve("error");
                                    }
                                  })
                                  .catch(error => {});
                              }
                            })
                            .catch(error => {});
                        }
                      })
                      .catch(error => {});
                  }
                })
                .catch(error => {});
            }
          })
          .catch(error => {});
      } catch (error) {
        console.log("error");
      }
    });
    const data = await promise;

    if (data === "error") {
      res.status(200).json({ data: "error" });
    } else {
      res.status(200).json({ data });
    }
  }
  // set up our routes
  public routes() {
    this.router.get("/:base64", this.byPassword);
  }
}
