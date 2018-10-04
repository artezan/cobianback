import { model, Schema, Document } from "mongoose";
import { IBuyer } from "./Buyer";
import { IProperty } from "./Property";
export interface ICredit extends Document {
  /**
   * Comprador
   */
  buyer: IBuyer;
  /**
   * Propiedad
   */
  property: IProperty;
  /**
   * status Gris Verde Amarillo Rojo
   */
  status: string;
  timestamp: Date;
  /**
   * Documentos para el credito
   */
  files: string[];
  /**
   * Notas
   */
  notes: string;
  /**
   * is aceptado
   */
  isAccept: boolean;
  /**
   * notification one signal
   */
  notificationOneSignal: string[];
}
const CreditSchema: Schema = new Schema({
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "Buyer",
  },
  /**
   * Propiedad
   */
  property: {
    type: Schema.Types.ObjectId,
    ref: "Property",
  },
  /**
   * status Gris Verde Amarillo Rojo
   */
  status: {
    type: String,
  },
  notes: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  /**
   * Documentos para el credito
   */
  files: [
    {
      type: String,
      default: [],
    },
  ],
  isAccept: {
    type: Boolean,
  },
  notificationOneSignal: [{ type: String, default: [] }],
});

export default model<ICredit>("Credit", CreditSchema);
