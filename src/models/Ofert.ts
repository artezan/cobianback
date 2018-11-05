import { model, Schema, Document } from "mongoose";
import { IBuyer } from "./Buyer";
import { IProperty } from "./Property";
export interface IOfert extends Document {
  /**
   * Comprador
   */
  buyer: IBuyer;
  /**
   * Propiedad
   */
  property: IProperty;
  /**
   * aceptadas, rechazadas o sigue en negociación.
   */
  status: string;
  timestamp: Date;
  /**
   * Notas extra
   */
  notes: string;
  ofertPrice: number;

  files: string[];
  /**
   * is aceptado
   */
  isAccept: boolean;
  /**
   * notif id
   */
  notificationOneSignal: string[];
  /**
   * apartado
   */
  apartOfert: number;
  /**
   * Forma de compra FOVISSTE, IMSS, contado, PEMEX, Infonavit, aliados, otros
   */
  wayToBuy: string;
}
const OfertSchema: Schema = new Schema({
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "Buyer"
  },
  /**
   * Propiedad
   */
  property: {
    type: Schema.Types.ObjectId,
    ref: "Property"
  },
  /**
   * aceptadas, rechazadas o sigue en negociación.
   */
  status: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  notes: {
    type: String
  },
  wayToBuy: {
    type: String
  },
  ofertPrice: {
    type: Number
  },
  apartOfert: {
    type: Number
  },
  files: [
    {
      type: String,
      default: []
    }
  ],
  isAccept: {
    type: Boolean
  },
  notificationOneSignal: [{ type: String, default: [] }]
});

export default model<IOfert>("Ofert", OfertSchema);
