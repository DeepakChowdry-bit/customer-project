import mongoose from "mongoose";

const { Schema } = mongoose;

const historySchema = new Schema({
    customer: { type: Schema.Types.ObjectId, ref: 'customers', required: true },
    orders: [{
        order_value: { type: Number, required: true },
        bill_number: { type: String },
        order_date: { type: Date, required: true, default: Date.now },
    }],
    payments: [{
        payment_value: { type: Number, required: true },
        payment_date: { type: Date, required: true, default: Date.now },
    }],
    amounts: [{
        amount_value: { type: Number, required: true, },
    }]
});

const History = mongoose.models.history || mongoose.model("history", historySchema);

export default History;
