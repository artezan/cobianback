import { model, Schema, Document } from "mongoose";
const SubManagementSchema: Schema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  phone: {
    type: Number,
  },
  email: {
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

export default model("SubManagement", SubManagementSchema);
