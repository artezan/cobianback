import { model, Schema, Document } from "mongoose";
import { ICredit } from "./Credit";
export interface IProperty extends Document {
  /**
   * ya sea compra o renta.
   */
  isRent: boolean;
  timestamp: Date;
  name: string;
  /**
   * tipo de propiedad
   */
  typeOfProperty: string;
  /**
   * num de Visitas
   */
  numVisit: number;
  /**
   * Espacio de vivienda
   */
  space: number;
  /**
   * Etiquetas
   */
  tag: string[];
  /**
   * Documentos
   */
  files: string[];
  /**
   * Fecha posible
   */
  dateToBuy: Date;
  /**
   * Zona de compra/renta
   */
  zone: string;
  /**
   * Costo minimo
   */
  minPrice: number;
  /**
   * Costo maximo
   */
  maxPrice: number;
  /**
   * num recamaras
   */
  numRooms: number;
  /**
   * num de lugares para estacionaminto
   */
  numCars: number;
  /**
   * Nueva o usada
   */
  isOld: boolean;
  /**
   * un fraccionamiento cerrado
   */
  isClose: boolean;
  /**
   * numero de banos
   */
  numBathrooms: number;
  /**
   * jardin
   */
  hasGarden: boolean;
  /**
   * Si se desea recámara en planta baja
   */
  isLowLevel: boolean;
  /**
   * Elevador
   */
  hasElevator: boolean;
  /**
   * todos servicios
   */
  allServices: boolean;
  /**
   * Forma de compra FOVISSTE, IMSS, contado, PEMEX, Infonavit, aliados, otros
   */
  wayToBuy: string;
  /**
   * Fecha de apartado
   */
  dateToApart: Date;
  /**
   * esta comprada
   */
  isBuy: boolean;
  /**
   * numero de likes
   */
  numOfLikes: number;
}
const PropertySchema: Schema = new Schema({
  isRent: {
    type: Boolean,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
  },
  /**
   * tipo de propiedad
   */
  typeOfProperty: {
    type: String,
  },
  /**
   * num de Visitas
   */
  numVisit: {
    type: Number,
  },
  /**
   * Espacio de vivienda
   */
  space: {
    type: Number,
  },
  /**
   * Etiquetas
   */
  tag: [
    {
      type: String,
      default: [],
    },
  ],
  /**
   * Documentos
   */
  files: [
    {
      type: String,
      default: [],
    },
  ],
  /**
   * Fecha posible
   */
  dateToBuy: {
    type: String,
  },
  /**
   * Zona de compra/renta
   */
  zone: {
    type: String,
  },
  /**
   * Costo minimo
   */
  minPrice: {
    type: Number,
  },
  /**
   * Costo maximo
   */
  maxPrice: {
    type: Number,
  },
  /**
   * num recamaras
   */
  numRooms: {
    type: Number,
  },
  /**
   * num de lugares para estacionaminto
   */
  numCars: {
    type: Number,
  },
  /**
   * Nueva o usada
   */
  isOld: {
    type: Boolean,
  },
  /**
   * un fraccionamiento cerrado
   */
  isClose: {
    type: Boolean,
  },
  /**
   * numero de banos
   */
  numBathrooms: {
    type: Number,
  },
  /**
   * jardin
   */
  hasGarden: {
    type: Boolean,
  },
  /**
   * Si se desea recámara en planta baja
   */
  isLowLevel: {
    type: Boolean,
  },
  /**
   * Elevador
   */
  hasElevator: {
    type: Boolean,
  },
  /**
   * todos servicios
   */
  allServices: {
    type: Boolean,
  },
  /**
   * Forma de compra FOVISSTE, IMSS, contado, PEMEX, Infonavit, aliados, otros
   */
  wayToBuy: {
    type: String,
  },
  /**
   * fecha de apartado
   */
  dateToApart: {
    type: Date,
  },
  /**
   * comprada
   */
  isBuy: {
    type: Boolean,
  },
  numOfLikes: {
    type: Number,
    default: 0,
  },
});

export default model<IProperty>("Property", PropertySchema);
