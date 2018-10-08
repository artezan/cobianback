import { model, Schema, Document } from "mongoose";
import { IOfert } from "./Ofert";
import { ICredit } from "./Credit";
import { ISchedule } from "./Schedule";
import { IStatusBuyerProperty } from "./StatusBuyerProperty";
const AdministratorSchema: Schema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  schedule: [
    {
      type: Schema.Types.ObjectId,
      ref: "Schedule",
      default: [],
    },
  ],
  goal: [
    {
      type: Schema.Types.ObjectId,
      ref: "Goal",
      default: [],
    },
  ],
});

export default model("Administrator", AdministratorSchema);

export interface IEvents {
  data?: {
    oferts?: IOfert;
    credits?: ICredit;
    schedules?: ISchedule;
    sbps?: IStatusBuyerProperty;
  };
  type?: string;
  time?: any;
}
