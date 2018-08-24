import { model, Schema, Document } from "mongoose";
export interface INotification extends Document {
  timestamp: Date;
  title: string;
  content: string;
}
const NotificationSchema: Schema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

export default model("Notification", NotificationSchema);
