import { model, Schema, Document } from "mongoose";
import { IAdviser } from "./Adviser";
import { ISchedule } from "./Schedule";
import { ICredit } from "./Credit";
import { IProperty } from "./Property";
import { INotification } from "./Notification";
export interface IBuyer extends Document {
  name: string;
  fatherLastName: string;
  motherLastName: string;
  password: any;
  timestamp: Date;
  email: string;
  phone: number;
  /**
   * Edad
   */
  years: number;
  /**
   * Sexo
   */
  isMale: boolean;
  /**
   * Número de miembros de familia
   */
  numOfFamily: number;
  /**
   * estado civil
   */
  isSingle: boolean;
  /**
   * Tipos de Vivienda
   */
  typeOfProperty: string[];
  /**
   * Espacio de vivienda
   */
  space: number;
  /**
   * Etiquetas
   */
  tag: string[];
  /**
   *  eventos programados
   */
  schedule: ISchedule[];
  /**
   * Creditos
   */
  credit: ICredit[];
  /**
   * Documentos
   */
  files: string[];
  /**
   * Lista de sugerencias
   */
  property: IProperty[];
  /**
   * Asesores
   */
  adviser: IAdviser[];
  /**
   * Notificaciones guardadas
   */
  notification: INotification[];
}
const BuyerSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  fatherLastName: {
    type: String,
    required: true,
  },
  motherLastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  /**
   * Edad
   */
  years: {
    type: Number,
  },
  /**
   * Sexo
   */
  isMale: {
    type: Boolean,
  },
  /**
   * Número de miembros de familia
   */
  numOfFamily: {
    type: Number,
  },
  /**
   * estado civil
   */
  isSingle: {
    type: Boolean,
  },
  /**
   * Tipos de Vivienda
   */
  typeOfProperty: [
    {
      type: String,
      default: [],
    },
  ],
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
   *  eventos programados
   */
  schedule: [
    {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
      default: [],
    },
  ],
  /**
   * Creditos
   */
  credit: [
    {
      type: Schema.Types.ObjectId,
      ref: "Credit",
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
   * Lista de sugerencias
   */
  property: [
    {
      type: Schema.Types.ObjectId,
      ref: "Property",
      default: [],
    },
  ],
  /**
   * Asesores
   */
  adviser: [
    {
      type: Schema.Types.ObjectId,
      ref: "Adviser",
      default: [],
    },
  ],
  notification: [
    {
      type: Schema.Types.ObjectId,
      ref: "Notification",
      default: [],
    },
  ],
});

export default model<IBuyer>("Buyer", BuyerSchema);
