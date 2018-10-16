import { model, Schema, Document } from "mongoose";
import { IBuyer } from "./Buyer";
import { IAdviser } from "./Adviser";
export interface IGoal extends Document {
  /**
   * Descripcion de meta
   */
  content: string;
  /**
   * Asesores
   */
  adviser: IAdviser[];
  /**
   * Estado de la meta
   */
  status: string;
  /**
   * Cumplido o no
   */
  isComplete: boolean;
  /**
   * Por Gerencia
   */
  isByManagement: boolean;
  /**
   * titulo
   */
  title: string;
  timestamp: Date;
  day: number;
  month: number;
  year: number;
  goals: [
    {
      nameGoal: string;
      isComplete: boolean;
    }
  ];
  typeOfGoal:
    | "goals"
    | "salesTotal"
    | "costOfSales"
    | "rentTotal"
    | "costOfRent"
    | "rentSalesTotal"
    | "rentSalesCost";
  quantitative: number;
}
const GoalSchema: Schema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
  },
  /**
   * Asesores
   */
  adviser: [
    {
      type: Schema.Types.ObjectId,
      ref: "Adviser",
      default: [],
    },
  ],
  /**
   * Estado de la meta
   */
  status: {
    type: String,
  },
  title: {
    type: String,
  },
  day: {
    type: Number,
  },
  month: {
    type: Number,
  },
  year: {
    type: Number,
  },

  /**
   * Cumplido o no
   */
  isComplete: {
    type: Boolean,
    default: false,
  },
  isByManagement: {
    type: Boolean,
  },
  goals: [
    {
      nameGoal: String,
      isComplete: Boolean,
    },
  ],
  notificationOneSignal: [{ type: String, default: [] }],
  typeOfGoal: {
    type: String,
    default: "goals",
  },
  quantitative: {
    type: Number,
    default: 0,
  },
});

export default model<IGoal>("Goal", GoalSchema);
