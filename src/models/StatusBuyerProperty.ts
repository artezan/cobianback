import { model, Schema, Document } from "mongoose";
import { IProperty } from "./Property";
import { IBuyer } from "./Buyer";
import { IAdviser } from "./Adviser";
import { ISchedule } from "./Schedule";
import { INotification } from "./Notification";
export interface IStatusBuyerProperty extends Document {
  /**
   * Estado
   */
  status?: "verde" | "gris" | "amarillo" | "rojo" | "azul";
  buyer: IBuyer;
  property: IProperty;
  note: string;
  timestamp: Date;
}
const StatusBuyerPropertySchema: Schema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "Buyer",
  },
  property: {
    type: Schema.Types.ObjectId,
    ref: "Property",
  },
  note: {
    type: String,
  },
});

export default model<IStatusBuyerProperty>(
  "StatusBuyerProperty",
  StatusBuyerPropertySchema,
  "StatusBuyerProperty",
);
