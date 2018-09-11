import { model, Schema, Document } from "mongoose";
import { ISchedule } from "./Schedule";
import { IBuyer } from "./Buyer";
import { IGoal } from "./Goal";
import { INotification } from "./Notification";
export interface IAdviser extends Document {
  name: any;
  lastName: string;
  password: any;
  timestamp: Date;
  email: string;
  /**
   *  eventos programados
   */
  schedule: ISchedule[];
  /**
   * hora disponible inicio
   */
  hourStart: number;
  /**
   * hora disponible fin
   */
  hourEnd: number;
  /**
   * Compradores asignados
   */
  buyer: IBuyer[];
  /**
   * Metas
   */
  goal: IGoal[];
  /**
   * Notificaciones guardadas
   */
  notification: INotification[];
  /**
   * Si vende o renta
   */
  isRenter: boolean;
  /**
   * ciudad para filtar
   */
  city: string;
}
const AdviserSchema: Schema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  city: {
    type: String,
  },
  schedule: [
    {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
      default: [],
    },
  ],
  hourStart: {
    type: Number,
  },
  hourEnd: {
    type: Number,
  },
  isRenter: {
    type: Boolean,
  },
  buyer: [
    {
      type: Schema.Types.ObjectId,
      ref: "Buyer",
      default: [],
    },
  ],
  goal: [
    {
      type: Schema.Types.ObjectId,
      ref: "Goal",
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

export default model<IAdviser>("Adviser", AdviserSchema);
