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
   * Datos Cuantitativos
   */
  dataNumber: number[];
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
  dateLimit: string;
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
  dateLimit: {
    type: String,
  },
  /**
   * Datos Cuantitativos
   */
  dataNumber: {
    type: Number,
    default: 0,
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
});

export default model<IGoal>("Goal", GoalSchema);
