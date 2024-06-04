import connect from "@/db/connect";
import Customer from "@/models/customer.model";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Connect to MongoDB only once per request
        await connect();

        // Handle GET requests specifically
        const customers = await Customer.find({});

        return NextResponse.json(customers, { status: 200 });
    } catch (error) {
        console.error("Error fetching customers:", error.message);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }

}

