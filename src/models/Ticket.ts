import { model, Schema, Document } from "mongoose";
import { IConsultant } from "./Consultant";
import { ICustomer } from "./Customer";
export interface ITicket extends Document {
    hours: number;
    description: string;
    customer: ICustomer;
    ranking: number;
    consultant: IConsultant;
    timestamp: Date;
    status: string;
    companyId: string;
    cost: number;
    isPay: boolean;

}
const TicketSchema: Schema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now
    },
    hours: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "Customer"
    },
    consultant: {
        type: Schema.Types.ObjectId,
        ref: "Consultant"
    },
    ranking: {
        type: Number,
        default: 0
    },
    cost: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "Pendiente"
    },
    isPay: {
        type: Boolean,
        default: false
    },
    companyId: {
        type: Schema.Types.ObjectId,
        ref: "Company"
    }
});

export default model<ITicket>("Ticket", TicketSchema);
