import { model, Schema, Document } from "mongoose";
import { IProperty } from "./Property";
import { IBuyer } from "./Buyer";
import { IAdviser } from "./Adviser";
import { ISchedule } from "./Schedule";
import { INotification } from "./Notification";
export interface ISeller extends Document {
  /**
   * Nombre
   */
  name: string;
  lastName: string;
  /**
   * Propiedades
   */
  property: IProperty[];
  /**
   * Calendario
   */
  schedule: ISchedule[];
  /**
   * Notificaciones guardadas
   */
  notification: INotification[];
  password: string;
  timestamp: Date;
}
const SellerSchema: Schema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  lastName: {
    type: String,
  },
  /**
   * Propiedades
   */
  property: [
    {
      type: Schema.Types.ObjectId,
      ref: "Property",
      default: [],
    },
  ],
  /**
   * Calendario
   */
  schedule: [
    {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
      default: [],
    },
  ],
  /**
   * Notificaciones guardadas
   */
  notification: [
    {
      type: Schema.Types.ObjectId,
      ref: "Notification",
      default: [],
    },
  ],
});

export default model<ISeller>("Seller", SellerSchema);
