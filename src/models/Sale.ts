import { model, Schema, Document } from "mongoose";
import { IProperty } from "./Property";
import { IBuyer } from "./Buyer";
import { IAdviser } from "./Adviser";
import { ISeller } from "./Seller";
export interface ISale extends Document {
  /**
   * Fecha de la venta
   */
  timestamp: Date;
  /**
   *  propiedad
   */
  property: IProperty;
  /**
   * Comprador
   */
  buyer: IBuyer;
  /**
   *  Asesor
   */
  adviser: IAdviser;
  /**
   *  vendedor
   */
  seller: ISeller;
  /**
   * Notas
   */
  note: string;
  /**
   * admin
   */
  price: number;
  /**
   * is renta
   */
  isRent: boolean;
}
const ScheduleSchema: Schema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  /**
   *  propiedad
   */
  property: {
    type: Schema.Types.ObjectId,
    ref: "Property",
  },
  /**
   * Comprador
   */
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "Buyer",
  },
  /**
   *  Asesor
   */
  adviser: {
    type: Schema.Types.ObjectId,
    ref: "Adviser",
  },
  /**
   *  Vendedor
   */
  seller: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
  },
  /**
   * Notas
   */
  note: {
    type: String,
  },
  price: {
    type: Number,
  },
  isRent: {
    type: Boolean,
  },
});

export default model<ISale>("Sale", ScheduleSchema);
