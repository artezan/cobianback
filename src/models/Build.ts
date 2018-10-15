import { model, Schema, Document } from "mongoose";
import { IMaker } from "./Maker";

export interface IBuild extends Document {
  name: string;
  timestamp: Date;
  /**
   *  conograma
   */
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
   * constructores
   */
  maker: IMaker[];
  /**
   * notas
   */
  notes: string;
  /**
   * ciudad para filtar
   */
  city: string;
}
const BuildSchema: Schema = new Schema({
  name: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  /**
   *  conograma
   */
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
      imagesData: [
        {
          url: String,
          notes: String,
          date: String,
        },
      ],
    },
  ],
  /**
   * constructores
   */
  maker: [
    {
      type: Schema.Types.ObjectId,
      ref: "Maker",
      default: [],
    },
  ],
  /**
   * notas
   */
  notes: {
    type: String,
  },
  /**
   * ciudad para filtar
   */
  city: {
    type: String,
  },
  notificationOneSignal: [{ type: String, default: [] }],
});

export default model<IBuild>("Build", BuildSchema);
