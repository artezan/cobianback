import { model, Schema, Document } from "mongoose";

const VerificationEmailSchema: Schema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: true
  },
  token: {
    type: String
  }
});

export default model("VerificationEmail", VerificationEmailSchema);
