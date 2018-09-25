import { Request, Response, Router } from "express";
import * as base64 from "base-64";
import Property from "../models/Property";
import { PropertyLogic } from "../logic/PropertyLogic";
import Buyer, { IBuyer } from "../models/Buyer";
import { ObjectId } from "mongodb";

/**
 * @apiDefine PropertyResponseParams
 * @apiSuccess {Date} timestamp
 * @apiSuccess {boolean} isRent Renta o Compra
 * @apiSuccess {ObjectId} _id
 * @apiSuccess {string} name
 * apiSuccess {string[]} typeOfProperty Tipos de Vivienda casa, departamento, terreno, nave industrial, etc., con la posibilidad de agregar alguna opción que no aparezca dentro del listado.
 * @apiSuccess {number} space Espacio de vivienda
 * @apiSuccess {number} numVisit num de Visitas
 * @apiSuccess {string[]} tag Etiquetas
 * @apiSuccess {string[]} files Documentos
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
 */
export class PropertyRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }
  /**
   * @api {GET} /property/ Request all
   * @apiVersion  0.1.0
   * @apiName get
   * @apiGroup property
   */
  public allNoBuy(req: Request, res: Response): void {
    Property.find()
      .sort({ timestamp: -1 })
      .then(data => {
        const filterData = data.filter(d => !d.isBuy);
        res.status(200).json({ data: filterData });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  public all(req: Request, res: Response): void {
    Property.find()
      .sort({ timestamp: -1 })
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {GET} /property/bypropertyid/:id Request by Object Id
   * @apiVersion  0.1.0
   * @apiName getById
   * @apiGroup property
   *
   *
   * @apiParam {ObjectId} propertyId Must be provided as QueryParam
   *
   * @apiSampleRequest /property/bypropertyid/5b842b334f965c30a03c1951
   *
   * @apiUse PropertyResponseParams
   *
   * @apiSuccessExample {json} Success-Response Consultant:
   * { "data": { "timestamp": "2018-08-27T16:47:47.968Z", "tag": [ "UPAEP" ], "files": [ "documento1", "documento2" ], "_id": "5b842b334f965c30a03c1951", "isRent": true, "name": "Depa 1", "typeOfProperty": "departamento", "space": 45, "dateToBuy": "18/11/2018", "zone": "La Paz", "minPrice": 2500, "maxPrice": 2500, "numRooms": 1, "numCars": 1, "isOld": false, "isClose": false, "numBathrooms": 2, "hasGarden": false, "isLowLevel": false, "hasElevator": false, "allServices": true, "wayToBuy": "otros", "__v": 0 } }
   */

  public oneById(req: Request, res: Response): void {
    const id: string = req.params.id;

    Property.findById(id)
      .then(data => {
        res.status(200).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {POST} /property/ Request New
   * @apiVersion  0.1.0
   * @apiName post
   * @apiGroup property
   *
   *
   * @apiParam {string} name
   * @apiParam {boolean} isRent Renta o Compra
   * @apiParam {string[]} typeOfProperty Tipos de Vivienda casa, departamento, terreno, nave industrial, etc., con la posibilidad de agregar alguna opción que no aparezca dentro del listado.
   * @apiParam {number} space Espacio de vivienda
   * @apiParam {number} numVisit num de Visitas
   * @apiParam {string[]} tag Etiquetas
   * @apiParam {string[]} files Documentos
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
   *
   * @apiParamExample {json} Request-Example:
   * { "isRent":true, "name":"Depa 1", "typeOfProperty":"departamento", "space":45, "tag":["UPAEP"], "files":["documento1","documento2"], "dateToBuy":"18/11/2018", "zone":"La Paz", "minPrice":2500, "maxPrice":2500, "numRooms":1, "numCars":1, "isOld":false, "isClose":false, "numBathrooms":2, "hasGarden":false, "isLowLevel":false, "hasElevator":false, "allServices":true, "wayToBuy":"otros" }
   *
   * @apiUse PropertyResponseParams
   *
   * @apiSuccessExample {json} Success-Response Created User:
   * { "data": { "timestamp": "2018-08-27T16:47:47.968Z", "tag": [ "UPAEP" ], "files": [ "documento1", "documento2" ], "_id": "5b842b334f965c30a03c1951", "isRent": true, "name": "Depa 1", "typeOfProperty": "departamento", "space": 45, "dateToBuy": "18/11/2018", "zone": "La Paz", "minPrice": 2500, "maxPrice": 2500, "numRooms": 1, "numCars": 1, "isOld": false, "isClose": false, "numBathrooms": 2, "hasGarden": false, "isLowLevel": false, "hasElevator": false, "allServices": true, "wayToBuy": "otros", "__v": 0 } }
   */

  public create(req: Request, res: Response): void {
    const isRent: boolean = req.body.isRent;
    const name: string = req.body.name;
    const typeOfProperty: string = req.body.typeOfProperty;
    const space: number = req.body.space;
    const tag: string[] = req.body.tag;
    const files: string[] = req.body.files;
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

    const property = new Property({
      isRent,
      name,
      typeOfProperty,
      space,
      tag,
      files,
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
    });

    property
      .save()
      .then(data => {
        res.status(201).json({ data });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {PUT} /property/:_id Request Update
   * @apiVersion  0.1.0
   * @apiName put
   * @apiGroup property
   *
   * @apiParam {ObjectId} propertyId Must be provided as QueryParam
   * @apiParam {string} name
   * @apiParam {boolean} isRent Renta o Compra
   * @apiParam {string[]} typeOfProperty Tipos de Vivienda casa, departamento, terreno, nave industrial, etc., con la posibilidad de agregar alguna opción que no aparezca dentro del listado.
   * @apiParam {number} space Espacio de vivienda
   * @apiParam {number} numVisit num de Visitas
   * @apiParam {string[]} tag Etiquetas
   * @apiParam {string[]} files Documentos
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
   *
   *
   * @apiParamExample {json} Request-Example:
   * { "files":["documento1","documento2", "documento3"] }
   *
   * @apiSuccessExample {json} Success-Response:
   * { "data": true }
   */

  public update(req: Request, res: Response): void {
    const _id: string = req.params.id;
    Property.findByIdAndUpdate({ _id: _id }, req.body)
      .then(() => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }
  /**
   * @api {DELETE} /property/:id Request  Deleted
   * @apiVersion  0.1.0
   * @apiName deleteByToken
   * @apiGroup property
   *
   * @apiParam {ObjectId} propertyId Must be provided as QueryParam
   *
   * @apiSuccessExample {json} Success-Response:
   * {"data":true}
   */

  public delete(req: Request, res: Response): void {
    const _id: string = req.params.id;

    Property.findByIdAndRemove({ _id: _id })
      .then(() => {
        res.status(200).json({ data: true });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  /**
   * @api  {POST} /property/matchsearchbybuyer/:id Request match search by buyer
   * @apiVersion  0.1.0
   * @apiName demomatch
   * @apiGroup property
   *
   * @apiParam {ObjectId} buyerId Must be provided as QueryParam
   * @apiParam {number} percentage  % Minimo de match
   * @apiParamExample {json} Request-Example:
   * { "percentage": 60 }
   * @apiSuccessExample {json} Success-Response:
   * {"data":true}
   */
  public async setPropiertiesToBuyer(
    req: Request,
    res: Response,
  ): Promise<void> {
    // id de buyer
    const _id: string = req.params.id;
    // percentage
    const percentage: number = req.body.percentage;

    const properties = await PropertyLogic.Instance().matchSearchByBuyerId(
      _id,
      percentage,
    );
    Buyer.findById(_id).then(buyer => {
      properties.forEach(p => {
        const isFinded = buyer.property.findIndex(
          (property: any) =>
            new ObjectId(property).toString() ===
            new ObjectId(p._id).toString(),
        );

        if (isFinded === -1) {
          buyer.property.push(p._id);
        }
      });
      buyer
        .save()
        .then(() => {
          res.status(200).json({ data: true });
        })
        .catch(error => {
          res.status(500).json({ error });
        });
    });
  }
  /**
   * @api {POST} /property/matchsearchbydemo/ Request demo match
   * @apiVersion  0.1.0
   * @apiName matchsearchbybuyer
   * @apiGroup property
   *
   *
   * @apiParam {number} percentage  % Minimo de match
   * @apiParam {string} typeOfProperty Tipos de Vivienda casa, departamento, terreno, nave industrial, etc., con la posibilidad de agregar alguna opción que no aparezca dentro del listado.
   * @apiParam {number} space Espacio de vivienda
   * @apiParam {string[]} tag Etiquetas
   * @apiParam {ISchedule[]} schedule Eventos programados
   * @apiParam {ICredit[]} credit Creditos
   * @apiParam {string[]} files Documentos
   * @apiParam {IProperty[]} property Lista de sugerencias
   * @apiParam {IProperty[]} propertySave Lista Propiedades guardadas o que le interesan
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
   * @apiParamExample {json} Request-Example:
   * { "typeOfProperty":"departamento", "space":40, "tag":["mascotas", "estudiante"], "isRenter":true, "dateToBuy":"20/12/2018", "zone":"La Paz", "minPrice":2000, "maxPrice":4000, "numRooms":1, "numCars":0, "isOld":false, "isClose":false, "numBathrooms":2, "hasGarden":false, "isLowLevel":false, "hasElevator":false, "allServices":true, "wayToBuy":"otro", "percentage": 60 }
   * @apiSuccessExample {json} Success-Response:
   * { "data": [ { "timestamp": "2018-08-27T16:47:47.968Z", "tag": [ "UPAEP" ], "files": [ "documento1", "documento2", "documento3" ], "_id": "5b842b334f965c30a03c1951", "isRent": true, "name": "Depa 1", "typeOfProperty": "departamento", "space": 45, "dateToBuy": "18/11/2018", "zone": "La Paz", "minPrice": 2500, "maxPrice": 2500, "numRooms": 1, "numCars": 1, "isOld": false, "isClose": false, "numBathrooms": 2, "hasGarden": false, "isLowLevel": false, "hasElevator": false, "allServices": true, "wayToBuy": "otros", "__v": 0 } ] }
   */
  public demoMatchSearch(req: Request, res: Response): void {
    // obj de tipo buyer
    const demoBuyer: any = {
      isRenter: req.body.isRenter,
      typeOfProperty: req.body.typeOfProperty,
      space: req.body.space,
      dateToBuy: req.body.dateToBuy,
      zone: req.body.zone,
      minPrice: req.body.minPrice,
      maxPrice: req.body.maxPrice,
      numRooms: req.body.numRooms,
      numCars: req.body.numCars,
      isOld: req.body.isOld,
      isClose: req.body.isClose,
      numBathrooms: req.body.numBathrooms,
      hasGarden: req.body.hasGarden,
      isLowLevel: req.body.isLowLevel,
      hasElevator: req.body.hasElevator,
      allServices: req.body.allServices,
      wayToBuy: req.body.wayToBuy,
      tag: req.body.tag,
    };
    // percentage
    const percentage: number = req.body.percentage;
    // resultado
    PropertyLogic.Instance()
      .resultOfProperty(demoBuyer, percentage)
      .then(result => {
        res.status(200).json({ data: result });
      })
      .catch(error => {
        res.status(500).json({ error });
      });
  }

  // set up our routes
  public routes() {
    this.router.get("/all", this.all);
    this.router.get("/", this.allNoBuy);
    this.router.get("/bypropertyid/:id", this.oneById);
    this.router.post("/matchsearchbybuyer/:id", this.setPropiertiesToBuyer);
    this.router.post("/matchsearchbydemo/", this.demoMatchSearch);
    this.router.post("/", this.create);
    this.router.put("/:id", this.update);
    this.router.delete("/:id", this.delete);
  }
}
