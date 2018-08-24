// import { model, Schema } from "mongoose";
import * as mongoose from "mongoose";

const booksSchema: mongoose.Schema = new mongoose.Schema({
  createAt: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    default: "",
    required: true,
    unique: true,
    lowercase: true
  },
  pages: {
    type: Number,
    default: 0,
    required: false
  }
});
export default mongoose.model<BooksInterface>("Books", booksSchema);

export interface BooksInterface extends mongoose.Document {
  createAt?: Date;
  name?: string;
  pages?: number;
}
