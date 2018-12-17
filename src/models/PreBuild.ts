import { model, Schema, Document } from "mongoose";
export interface IPreBuild extends Document {
  name: any;
  timestamp: Date;
  preBuyer: string[];
  timeLine: [
    {
      dayToStart: number;
      monthToStart: number;
      yearToStart: number;
      dayToEnd: number;
      monthToEnd: number;
      yearToEnd: number;
      notes: string;
      namePhase: string;
      isComplete: boolean;
      imgUrls: string[];
      _id: any;
    }
  ];
  /**
   * ciudad para filtar
   */
  city: string;
  /**
   * notas
   */
  notes: string;
  imgUrls: string[];
  fatherPreBuild: string;
}
const PreBuildSchema: Schema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },

  preBuyer: [
    {
      type: Schema.Types.ObjectId,
      ref: "PreBuyer",
      default: [],
    },
  ],
  timeLine: [
    {
      dayToStart: Number,
      monthToStart: Number,
      yearToStart: Number,
      dayToEnd: Number,
      monthToEnd: Number,
      yearToEnd: Number,
      notes: String,
      namePhase: String,
      isComplete: Boolean,
      imgUrls: [String],
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
  notificationOneSignal: [{ type: String, default: [] }],
  imgUrls: [{ type: String, default: [] }],
  fatherPreBuild: {
    type: String,
  },
});

export default model("PreBuild", PreBuildSchema);
