import { model, Schema, Document } from "mongoose";
import { ITicket } from "./Ticket";
export interface ICustomer extends Document {
  timestamp: Date;
  logo: string;
  name: any;
  adress: string;
  tickets: ITicket[];
  totalHours: number;
  phone: number;
  password: string;
  email: string;
  workArea: string;
  companyId: string;
}
// tslint:disable object-literal-sort-keys
const CustomerSchema: Schema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  logo: {
    type: String,
  },
  name: {
    type: String,
    required: true
  },
  adress: {
    type: String,
  },
  totalHours: {
    type: Number,
    default: 0
  },
  phone: {
    type: Number
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  workArea: {
    type: String
  },
  tickets: [{
    type: Schema.Types.ObjectId,
    ref: "Ticket",
    default: []
  }],
  companyId: {
    type: Schema.Types.ObjectId,
    ref: "Company"
  }
});

export default model<ICustomer>("Customer", CustomerSchema);
