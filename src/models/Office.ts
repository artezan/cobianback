import { model, Schema, Document } from "mongoose";
const OfficeSchema: Schema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
  },
});

export default model("Office", OfficeSchema);
