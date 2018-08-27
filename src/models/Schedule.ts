import { model, Schema, Document } from "mongoose";
import { IProperty } from "./Property";
import { IBuyer } from "./Buyer";
import { IAdviser } from "./Adviser";
import { ISeller } from "./Seller";
export interface ISchedule extends Document {
  /**
   * Fecha del Evento
   */
  dateOfEvent: string;
  timestamp: Date;
  /**
   * Titulo del evento
   */
  title: string;
  /**
   * Direccion
   */
  address: string;
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
   *  Asesor
   */
  seller: ISeller;
  /**
   * Estado
   */
  status: string;
  /**
   * Notas
   */
  note: string;
}
const ScheduleSchema: Schema = new Schema({
  dateOfEvent: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  /**
   * Titulo del evento
   */
  title: {
    type: String,
  },
  /**
   * Direccion
   */
  address: {
    type: String,
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
   * Estado
   */
  status: {
    type: String,
  },
  /**
   * Notas
   */
  note: {
    type: String,
  },
});

export default model<ISchedule>("Schedule", ScheduleSchema);
