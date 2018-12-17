import { model, Schema, Document } from "mongoose";
export interface IPost extends Document {
  timestamp: Date;
  title: string;
  content: string;
  status: string;
  tags: string[];
  uids: string[];
  city: string[];
}

const PostSchema: Schema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  city: [{ type: String, default: [] }],
  tags: [{ type: String, default: [] }],
  uids: [{ type: String, default: [] }],
});

export default model("Post", PostSchema);
