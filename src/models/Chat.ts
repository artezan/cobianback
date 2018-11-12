import { model, Schema, Document } from "mongoose";

export interface IChat extends Document {
  // un clinete id
  buyer: string;
  //   una prop id
  property: string;
  // ciudad de la propiedad para filtrar a los gnerentes
  city: string;
  timestamp: Date;
  //   mensajes
  messages: [
    {
      content: string;
      createAt: string;
      // quien lo hizo
      uid: string;
      readBy: string[];
      typeOfUser;
    }
  ];
}

const ChatSchema: Schema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  property: {
    type: String,
    required: true,
  },
  buyer: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  messages: [
    {
      content: String,
      createAt: String,
      // quien lo hizo
      uid: String,
      readBy: [{ type: String, default: [] }],
      typeOfUser: String,
    },
  ],
});

export default model<IChat>("Chat", ChatSchema);
