import * as base64  from "base-64";
import Company from "../models/Company";

export class CompaniesLogic {
  public static Instance = function(): CompaniesLogic {
    if (this._instance) {
      return this._instance;
    } else {
      return (this._instance = new this());
    }
  };
  // base64 nombre:pass
  public async checkCompany(base64Input): Promise<boolean> {
    const strDecode: string = base64.decode(base64Input);
    const name = strDecode.substring(0, strDecode.indexOf(":"));
    const password = strDecode.substring(
      strDecode.indexOf(":") + 1,
      strDecode.length,
    );
    // crea promise con respuesta si encuentra o no
    const promise = new Promise<boolean>((resolve, reject) => {
      // busca la info
      try {
        Company.find({ password: password, name: name })
          .then(data => {
            if (data.length > 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(error => {});
      } catch (error) {
        // error
      }
    });
    const result = await promise;
    return result;
  }
}
