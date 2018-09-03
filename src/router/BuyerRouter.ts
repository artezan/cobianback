import { Request, Response, Router } from "express";
import { ObjectId } from "../../node_modules/@types/bson";
import * as base64 from "base-64";
import Buyer from "../models/Buyer";

/**
 * @apiDefine BuyerResponseParams
 * @apiSuccess {Date} timestamp
 * @apiSuccess {number} name
 * @apiSuccess {ObjectId} _id
 * @apiSuccess {string} fatherLastName
 * @apiSuccess {string} motherLastName
 * @apiSuccess {string} password
 * @apiSuccess {string} email
 * @apiSuccess {number} phone
 * @apiSuccess {number} years
 * @apiSuccess {boolean} isMale Sexo
 * @apiSuccess {number} numOfFamily Número de miembros de familia
 * @apiSuccess {boolean} isSingle estado civil
 * @apiSuccess {string} typeOfProperty Tipo de Vivienda casa, departamento, terreno, nave industrial, etc., con la posibilidad de agregar alguna opción que no aparezca dentro del listado.
 * @apiSuccess {number} space Espacio de vivienda
 * @apiSuccess {string[]} tag Etiquetas
 * @apiSuccess {ISchedule[]} schedule Eventos programados
 * @apiSuccess {ICredit[]} credit Creditos
 * @apiSuccess {string[]} files Documentos
 * @apiSuccess {IProperty[]} property Lista de sugerencias
 * @apiSuccess {IAdviser[]} adviser Asesores Asignados
 * @apiSuccess {INotification[]} notification Notificaciones guardadas
 * @apiSuccess {boolean} isRenter Renta o Compra
 * @apiSuccess {string} dateToBuy Fecha posible compra/renta
 * @apiSuccess {string} zone Zona de compra/renta
 * @apiSuccess {number} minPrice Costo minimo
 * @apiSuccess {number} maxPrice Costo maximo
 * @apiSuccess {number} numRooms Numero de recamaras
 * @apiSuccess {number} numCars Numero de lugares de estacionamiento
 * @apiSuccess {boolean} isOld Nuevo o usado
 * @apiSuccess {boolean} isClose fraccionamiento cerrado o abierto
 * @apiSuccess {number} numBathrooms numero de banos
 * @apiSuccess {boolean} hasGarden jardin
 * @apiSuccess {boolean} isLowLevel Si se desea recámara en planta baja
 * @apiSuccess {boolean} hasElevator Elevador
 * @apiSuccess {boolean} allServices Con o sin servicios
 * @apiSuccess {boolean} wayToBuy Forma de compra FOVISSTE, IMSS, contado, PEMEX, Infonavit, aliados, otros
 * @apiSuccess {IOfert[]} ofert Ofertas asignadas
 * @apiSuccess {IStatusBuyerProperty[]} statusBuyerProperty Estado buyer/property
 *
 */
export class BuyerRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  /**
   * @api {GET} /buyer/ Request all
   * @apiVersion  0.1.0
   * @apiName get
   * @apiGroup buyer
   *
   *
   * @apiSampleRequest /buyer/
   *
   * @apiSuccessExample {json} Success-Response a JSON-Array<consultant>:
   * { "data": { "timestamp": "2018-08-27T20:00:38.939Z", "typeOfProperty": "departamento", "tag": [ "mascotas", "estudiante" ], "schedule": [ { "timestamp": "2018-08-27T21:57:08.771Z", "_id": "5b8473b42a3ac4214ce7590b", "title": "Evento2", "address": "La paz", "property": "5b842b334f965c30a03c1951", "buyer": "5b84586674acb1030cabb419", "adviser": "5b8082ba69a5a10b589abc75", "status": "Pendiente", "note": "Ver Propiedad segunda visita", "dateOfEvent": "20/18/2018", "__v": 0 } ], "statusBuyerProperty": [ { "timestamp": "2018-08-27T22:18:13.525Z", "_id": "5b8478a5258cea39b839cbf7", "status": "negociacion", "buyer": "5b84586674acb1030cabb419", "property": "5b842b334f965c30a03c1951", "note": "En proceso", "__v": 0 } ], "credit": [], "files": [], "property": [ { "timestamp": "2018-08-27T16:47:47.968Z", "tag": [ "UPAEP" ], "files": [ "documento1", "documento2", "documento3" ], "_id": "5b842b334f965c30a03c1951", "isRent": true, "name": "Depa 1", "typeOfProperty": "departamento", "space": 45, "dateToBuy": "18/11/2018", "zone": "La Paz", "minPrice": 2500, "maxPrice": 2500, "numRooms": 1, "numCars": 1, "isOld": false, "isClose": false, "numBathrooms": 2, "hasGarden": false, "isLowLevel": false, "hasElevator": false, "allServices": true, "wayToBuy": "otros", "__v": 0 } ], "propertySave": [], "adviser": [ { "timestamp": "2018-08-24T22:12:10.843Z", "schedule": [], "buyer": [], "goal": [], "notification": [], "_id": "5b8082ba69a5a10b589abc75", "name": "asesor", "lastName": "apellido", "password": "cobian2018", "email": "asesor@correo.com", "hourStart": 9, "hourEnd": 18, "isRenter": true, "__v": 0 } ], "notification": [ { "timestamp": "2018-08-27T21:23:47.038Z", "_id": "5b846be3ca86762eb84e7ac3", "title": "Notificacion 1", "content": "Nueva Propiedad Agregada", "__v": 0 } ], "ofert": [ { "timestamp": "2018-08-27T21:34:43.860Z", "files": [], "_id": "5b846e73829f5e1f94efc48a", "buyer": "5b84586674acb1030cabb419", "property": "5b842b334f965c30a03c1951", "status": "negociacion", "notes": "Oferta para ...", "ofertPrice": 3000, "__v": 0 } ], "_id": "5b84586674acb1030cabb419", "name": "Comprador 1", "fatherLastName": "Apellido", "motherLastName": "Apellido", "password": "12345", "email": "comprador@gmail.com", "phone": 2222, "years": 21, "isMale": true, "numOfFamily": 1, "isSingle": true, "space": 40, "isRenter": true, "dateToBuy": "20/12/2018", "zone": "La Paz", "minPrice": 2000, "maxPrice": 4000, "numRooms": 1, "numCars": 0, "isOld": false, "isClose": false, "numBathrooms": 2, "hasGarden": false, "isLowLevel": false, "hasElevator": false, "allServices": true, "wayToBuy": "otro", "__v": 0 } }
   */
  public all(req: Request, res: Response): void {
    Buyer.find()
      .populate({
        path: "schedule",
        populate: [{ path: "adviser" }, { path: "property" }],
      })
      .populate("credit")
      .populate("property")
      .populate("adviser")
      .populate("notification")
      .populate("ofert")
      .populate({
        path: "statusBuyerProperty",
        populate: [{ path: "buyer" }, { path: "property" }],
      })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {GET} /buyer/bybuyerid/:Id Request by Object Id
   * @apiVersion  0.1.0
   * @apiName getById
   * @apiGroup buyer
   *
   *
   * @apiParam {ObjectId} consultantId Must be provided as QueryParam
   *
   * @apiSampleRequest /buyer/bybuyerid/5b80863a23b3ba24ac8320ce
   *
   *
   * @apiSuccessExample {json} Success-Response Consultant:
   * { "data": { "timestamp": "2018-08-24T22:27:06.678Z", "typeOfProperty": [ "departamento" ], "tag": [ "amueblado", "no compartido", "estudiantes" ], "schedule": [], "credit": [], "files": [], "property": [], "adviser": [], "notification": [], "_id": "5b80863a23b3ba24ac8320ce", "name": "Comprador1", "fatherLastName": "Paterno", "motherLastName": "Materno", "password": "cobian2018", "email": "comprador@gmail.com", "phone": 22323, "years": 21, "isMale": true, "numOfFamily": 1, "isSingle": true, "space": 50, "__v": 0 } }
   */

  public oneById(req: Request, res: Response): void {
    const id: string = req.params.id;

    Buyer.findById(id)
      .populate({
        path: "schedule",
        populate: [{ path: "adviser" }, { path: "property" }],
      })
      .populate("credit")
      .populate("property")
      .populate("adviser")
      .populate("notification")
      .populate("ofert")
      .populate({
        path: "statusBuyerProperty",
        populate: [{ path: "buyer" }, { path: "property" }],
      })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {GET} /buyer/bybuyerpassword/:base64 Request by Pass
   * @apiVersion  0.1.0
   * @apiName getByPass
   * @apiGroup buyer
   *
   *
   * @apiParam {B64} name:pass Must be provided as QueryParam
   */
  public byPassword(req: Request, res: Response): void {
    const strDecode: string = base64.decode(req.params.base64);
    const name = strDecode.substring(0, strDecode.indexOf(":"));
    const password = strDecode.substring(
      strDecode.indexOf(":") + 1,
      strDecode.length,
    );

    Buyer.find({ password: password, name: name })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {GET} /bybuyercity/:city Request by Object City
   * @apiVersion  0.1.0
   * @apiName getByCity
   * @apiGroup buyer
   *
   *
   */
  public byCity(req: Request, res: Response): void {
    const city: string = req.params.city;

    Buyer.find({ city: city })
      .populate("schedule")
      .populate("buyer")
      .populate("goal")
      .populate("notification")
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {POST} /buyer/ Request New
   * @apiVersion  0.1.0
   * @apiName post
   * @apiGroup buyer
   *
   *
   * @apiParam {number} name
   * @apiParam {string} fatherLastName
   * @apiParam {string} motherLastName
   * @apiParam {string} password
   * @apiParam {string} email
   * @apiParam {number} phone
   * @apiParam {number} years
   * @apiParam {boolean} isMale Sexo
   * @apiParam {number} numOfFamily Número de miembros de familia
   * @apiParam {boolean} isSingle estado civil
   * @apiParam {string} typeOfProperty Tipos de Vivienda casa, departamento, terreno, nave industrial, etc., con la posibilidad de agregar alguna opción que no aparezca dentro del listado.
   * @apiParam {number} space Espacio de vivienda
   * @apiParam {string[]} tag Etiquetas
   * @apiParam {boolean} isRenter Renta o Compra
   * @apiParam {string} dateToBuy Fecha posible compra/renta
   * @apiParam {string} zone Zona de compra/renta
   * @apiParam {number} minPrice Costo minimo
   * @apiParam {number} maxPrice Costo maximo
   * @apiParam {number} numRooms Numero de recamaras
   * @apiParam {number} numCars Numero de lugares de estacionamiento
   * @apiParam {boolean} isOld Nuevo o usado
   * @apiParam {boolean} isClose fraccionamiento cerrado o abierto
   * @apiParam {number} numBathrooms numero de banos
   * @apiParam {boolean} hasGarden jardin
   * @apiParam {boolean} isLowLevel Si se desea recámara en planta baja
   * @apiParam {boolean} hasElevator Elevador
   * @apiParam {boolean} allServices Con o sin servicios
   * @apiParam {string} wayToBuy Forma de compra FOVISSTE, IMSS, contado, PEMEX, Infonavit, aliados, otros
   * @apiParam {IOfert[]} ofert Ofertas
   * @apiParam {IStatusBuyerProperty[]} statusBuyerProperty
   *
   * @apiParamExample {json} Request-Example:
   * { "name":"Comprador 1", "fatherLastName":"Apellido", "motherLastName":"Apellido", "password":"12345", "email":"comprador@gmail.com", "phone":"2222", "years":"21", "isMale": true, "numOfFamily":1, "isSingle":true, "typeOfProperty":"departamento", "space":40, "tag":["mascotas", "estudiante"], "isRenter":true, "dateToBuy":"20/12/2018", "zone":"La Paz", "minPrice":2000, "maxPrice":4000, "numRooms":1, "numCars":0, "isOld":false, "isClose":false, "numBathrooms":2, "hasGarden":false, "isLowLevel":false, "hasElevator":false, "allServices":true, "wayToBuy":"otro" }
   *
   * @apiUse BuyerResponseParams
   *
   * @apiSuccessExample {json} Success-Response Created User:
   * { "data": { "timestamp": "2018-08-27T15:54:47.089Z", "typeOfProperty": [ "departamento" ], "tag": [ "mascotas", "estudiante" ], "schedule": [], "credit": [], "files": [], "property": [], "adviser": [], "notification": [], "_id": "5b841ec705695f07c06c14f4", "name": "Comprador 1", "fatherLastName": "Apellido", "motherLastName": "Apellido", "password": "12345", "email": "comprador@gmail.com", "phone": 2222, "years": 21, "isMale": true, "numOfFamily": 1, "isSingle": true, "space": 40, "isRenter": true, "dateToBuy": "20/12/2018", "zone": "La Paz", "minPrice": 2000, "maxPrice": 4000, "numRooms": 1, "numCars": 0, "isOld": false, "isClose": false, "numBathrooms": 2, "hasGarden": false, "isLowLevel": false, "hasElevator": false, "allServices": true, "wayToBuy": "otro", "__v": 0 } }
   */

  public create(req: Request, res: Response): void {
    const name: string = req.body.name;
    const fatherLastName: string = req.body.fatherLastName;
    const motherLastName: string = req.body.motherLastName;
    const password: string = req.body.password;
    const email: string = req.body.email;
    const phone: number = req.body.phone;
    const years: number = req.body.years;
    const isMale: boolean = req.body.isMale;
    const numOfFamily: number = req.body.numOfFamily;
    const isSingle: boolean = req.body.isSingle;
    const typeOfProperty: string = req.body.typeOfProperty;
    const space: number = req.body.space;
    const tag: string[] = req.body.tag;
    const isRenter: boolean = req.body.isRenter;
    const dateToBuy: string = req.body.dateToBuy;
    const zone: string = req.body.zone;
    const minPrice: number = req.body.minPrice;
    const maxPrice: number = req.body.maxPrice;
    const numRooms: number = req.body.numRooms;
    const numCars: number = req.body.numCars;
    const isOld: boolean = req.body.isOld;
    const isClose: boolean = req.body.isClose;
    const numBathrooms: number = req.body.numBathrooms;
    const hasGarden: boolean = req.body.hasGarden;
    const isLowLevel: boolean = req.body.isLowLevel;
    const hasElevator: boolean = req.body.hasElevator;
    const allServices: boolean = req.body.allServices;
    const wayToBuy: boolean = req.body.wayToBuy;
    const city: string = req.body.city;

    const buyer = new Buyer({
      name,
      fatherLastName,
      motherLastName,
      password,
      email,
      phone,
      years,
      isMale,
      numOfFamily,
      isSingle,
      typeOfProperty,
      space,
      tag,
      isRenter,
      dateToBuy,
      zone,
      minPrice,
      maxPrice,
      numRooms,
      numCars,
      isOld,
      isClose,
      numBathrooms,
      hasGarden,
      isLowLevel,
      hasElevator,
      allServices,
      wayToBuy,
      city,
    });

    buyer
      .save()
      .then(data => {
        res.status(201).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {PUT} /buyer/:_id Request Update
   * @apiVersion  0.1.0
   * @apiName put
   * @apiGroup buyer
   *
   * @apiParam {Date} timestamp
   * @apiParam {number} name
   * @apiParam {ObjectId} _id
   * @apiParam {string} fatherLastName
   * @apiParam {string} motherLastName
   * @apiParam {string} password
   * @apiParam {string} email
   * @apiParam {number} phone
   * @apiParam {number} years
   * @apiParam {boolean} isMale Sexo
   * @apiParam {number} numOfFamily Número de miembros de familia
   * @apiParam {boolean} isSingle estado civil
   * @apiParam {string} typeOfProperty Tipos de Vivienda casa, departamento, terreno, nave industrial, etc., con la posibilidad de agregar alguna opción que no aparezca dentro del listado.
   * @apiParam {number} space Espacio de vivienda
   * @apiParam {string[]} tag Etiquetas
   * @apiParam {ISchedule[]} schedule Eventos programados
   * @apiParam {ICredit[]} credit Creditos
   * @apiParam {string[]} files Documentos
   * @apiParam {IProperty[]} property Lista de sugerencias
   * @apiParam {IAdviser[]} adviser Asesores Asignados
   * @apiParam {INotification[]} notification Notificaciones guardadas
   * @apiParam {boolean} isRenter Renta o Compra
   * @apiParam {string} dateToBuy Fecha posible compra/renta
   * @apiParam {string} zone Zona de compra/renta
   * @apiParam {number} minPrice Costo minimo
   * @apiParam {number} maxPrice Costo maximo
   * @apiParam {number} numRooms Numero de recamaras
   * @apiParam {number} numCars Numero de lugares de estacionamiento
   * @apiParam {boolean} isOld Nuevo o usado
   * @apiParam {boolean} isClose fraccionamiento cerrado o abierto
   * @apiParam {number} numBathrooms numero de banos
   * @apiParam {boolean} hasGarden jardin
   * @apiParam {boolean} isLowLevel Si se desea recámara en planta baja
   * @apiParam {boolean} hasElevator Elevador
   * @apiParam {boolean} allServices Con o sin servicios
   * @apiParam {boolean} wayToBuy Forma de compra FOVISSTE, IMSS, contado, PEMEX, Infonavit, aliados, otros
   * @apiParam {IOfert[]} ofert Ofertas
   * @apiParam {IStatusBuyerProperty[]} statusBuyerProperty
   *
   *
   * @apiParamExample {json} Request-Example:
   * { "tag": ["Estudiante", "mascotas", "UPAEP"], "adviser": ["5b8082ba69a5a10b589abc75", "5b8082db69a5a10b589abc76"] }
   *
   * @apiSuccessExample {json} Success-Response:
   * { "data": true }
   */

  public update(req: Request, res: Response): void {
    const _id: string = req.params.id;
    Buyer.findByIdAndUpdate({ _id: _id }, req.body)
      .then(() => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {DELETE} /buyer/:Id Request  Deleted
   * @apiVersion  0.1.0
   * @apiName deleteByToken
   * @apiGroup buyer
   *
   *
   * @apiParam {ObjectId} buyerId Must be placed as QueryParam
   */

  public delete(req: Request, res: Response): void {
    const _id: string = req.params.id;

    Buyer.findByIdAndRemove({ _id: _id })
      .then(() => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  // set up our routes
  public routes() {
    this.router.get("/", this.all);
    this.router.get("/bybuyerid/:id", this.oneById);
    this.router.get("/bybuyercity/:city", this.byCity);
    this.router.get("/bybuyerpassword/:base64", this.byPassword);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}
