import { model, Schema, Document } from "mongoose";
export interface IProperty extends Document {
  /**
   * ya sea compra o renta.
   */
  isRent: boolean;
  timestamp: Date;
  name: string;
  address: string;
  /**
   * tipo de propiedad
   */
  typeOfProperty: string;
  /**
   * forma de compra
   */
  wayToBuy: string[];
  dateToBuy: string;
  /**
   * costo minimo
   */
  minPrice: number;
  /**
   * costo maximo
   */
  maxPrice: number;
  tag: string[];
  /**
   * num de Visitas
   */
  numVisit: number;
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
  address: {
    type: String,
  },
  /**
   * tipo de propiedad
   */
  typeOfProperty: {
    type: String,
  },
  /**
   * forma de compra
   */
  wayToBuy: [
    {
      type: String,
      default: [],
    },
  ],
  dateToBuy: {
    type: String,
  },
  /**
   * costo minimo
   */
  minPrice: {
    type: Number,
    default: 0,
  },
  /**
   * costo maximo
   */
  maxPrice: {
    type: Number,
    default: 0,
  },
  tag: [
    {
      type: String,
    },
  ],
  /**
   * num de Visitas
   */
  numVisit: {
    type: Number,
    default: 0,
  },
});

export default model<IProperty>("Property", PropertySchema);
