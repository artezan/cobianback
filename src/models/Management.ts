import { model, Schema, Document } from "mongoose";
const ManagementSchema: Schema = new Schema({
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
  city: {
    type: String,
  },
});

export default model("Management", ManagementSchema);
