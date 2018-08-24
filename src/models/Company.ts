import { model, Schema, Document } from "mongoose";
interface ICompany extends Document {
    name: any;
    password: any;
    timestamp: Date;
}
const CompanySchema: Schema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

export default model<ICompany>("Company", CompanySchema);
