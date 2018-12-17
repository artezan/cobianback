import { model, Schema, Document } from "mongoose";
import { IPreBuild } from "./PreBuild";
export interface IFatherPre extends Document {
  preBuild: IPreBuild[];
  name: string;
  timestamp: Date;
  city: string;
  notes: string;
}

const FatherPreBuildSchema: Schema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },

  preBuild: [
    {
      type: Schema.Types.ObjectId,
      ref: "PreBuild",
      default: [],
    },
  ],
  /**
   * notas
   */
  notes: {
    type: String,
  },
  city: {
    type: String,
  },
  numOfChild: {
    type: Number,
  },
});

export default model("FatherPreBuild", FatherPreBuildSchema);
