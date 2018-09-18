import { model, Schema, Document } from "mongoose";
import { IBuild } from "./Build";

export interface IMaker extends Document {
  name: string;
  lastName: string;
  email: string;
  phone: number;
  timestamp: Date;
  password: string;
  /**
   *  Obra
   */
  build: IBuild;

  /**
   * ciudad para filtar
   */
  city: string;
}
const MakerSchema: Schema = new Schema({
  name: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: Number,
  },
  /**
   *  Obra
   */
  build: {
    type: Schema.Types.ObjectId,
    ref: "Build",
  },

  /**
   * ciudad para filtar
   */
  city: {
    type: String,
  },
  password: {
    type: String,
  },
});

export default model<IMaker>("Maker", MakerSchema);
