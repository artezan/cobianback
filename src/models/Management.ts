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

export default model("Management", ManagementSchema);
