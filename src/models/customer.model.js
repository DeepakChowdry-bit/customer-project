import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,               
    },
    mark: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    gst: {
        type: String,
        required: true,
        unique: true,
    },
    amount:{
        type: String,
    },
    visitday: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }

})

const Customer = mongoose.models.customers || mongoose.model("customers", customerSchema);

export default Customer;  

