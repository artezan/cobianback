import { model, Schema, Document } from "mongoose";
export interface INotification extends Document {
  timestamp: Date;
  title: string;
  // debe de ir quien lo envio y que hizo
  message: string;
  // el que lo envia
  senderId: string;
  // el/los que recibe
  receiversId: string[];
  // los involucrados
  tags: [

      | "administrator"
      | "buyer"
      | "seller"
      | "adviser"
      | "management"
      | "maker"
      | "office"
  ];
  // quien ya lo vio
  readBy: [{ readerId: string; readAt: Date }];
  // color
  status: "verde" | "gris" | "amarillo" | "rojo" | "azul";
  // icono
  type: string;
}
const NotificationSchema: Schema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
  },
  message: {
    type: String,
  },
  senderId: {
    type: Schema.Types.ObjectId,
  },
  receiversId: [
    {
      type: Schema.Types.ObjectId,
    },
  ],
  tags: {
    type: [String],
  },
  readBy: [
    {
      readerId: { type: Schema.Types.ObjectId },
      readAt: { type: Date, default: Date.now },
    },
  ],
  status: {
    type: String,
  },
  type: {
    type: String,
  },
});

export default model("Notification", NotificationSchema);
