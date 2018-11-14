import { model, Schema, Document } from "mongoose";
export interface IPreBuyer extends Document {
  name: any;
  lastName: string;
  password: any;
  timestamp: Date;
  email: string;
  preBuild: string[];
  phone: number;
}
const PreBuyerSchema: Schema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  lastName: {
    type: String
  },
  phone: {
    type: Number
  },
  preBuild: [
    {
      type: Schema.Types.ObjectId,
      ref: "PreBuild",
      default: []
    }
  ]
});

export default model<IPreBuyer>("PreBuyer", PreBuyerSchema);
