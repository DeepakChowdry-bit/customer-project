import connect from "@/db/connect";
import Customer from "@/models/customer.model";
import { NextResponse } from "next/server";

connect()
    .then(() => console.log("Connected to MongoDB Successfully!"))
    .catch((error) => {
        console.log("Error Connecting MongoDB", error.message);
    })

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { name, mark, address, gst, visitday, amount, password } = reqBody;

        console.log(reqBody);

        const existingCustomer = await Customer.findOne({ gst });

        if (existingCustomer) {
            return NextResponse.json({ error: "GST number already exists" }, { status: 400 });
        }

        const newCustomer = new Customer({
            name,
            mark,
            address,
            gst,
            visitday,
            amount,
            password,
        });

        const savedCustomer = await newCustomer.save();

        console.log(savedCustomer);

        return NextResponse.json({ message: "Customer registered", success: true, savedCustomer });
    } catch (error) {
        console.error("Error saving customer:", error.message);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}