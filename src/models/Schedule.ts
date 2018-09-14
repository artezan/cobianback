import { model, Schema, Document } from "mongoose";
import { IProperty } from "./Property";
import { IBuyer } from "./Buyer";
import { IAdviser } from "./Adviser";
import { ISeller } from "./Seller";
export interface ISchedule extends Document {
  /**
   * Fecha del Evento
   */
  day: number;
  month: number;
  year: number;
  hour: number;
  minute: number;
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
  /**
   * admin
   */
  administrator: string[];
}
const ScheduleSchema: Schema = new Schema({
  day: {
    type: Number,
  },
  month: {
    type: Number,
  },
  year: {
    type: Number,
  },
  hour: {
    type: Number,
  },
  minute: {
    type: Number,
    default: 0,
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
   *  admin
   */
  administrator: {
    type: Schema.Types.ObjectId,
    ref: "Administrator",
  },
  /**
   *  Management
   */
  management: {
    type: Schema.Types.ObjectId,
    ref: "Management",
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
