import { NextRequest, NextResponse } from "next/server";
import connect from "@/db/connect";
import Customer from "@/models/customer.model";

export async function GET(request, context) {
    const { id } = context.params;

    try {
        await connect();

        const customer = await Customer.findOne({ _id: new Object(id) });

        return NextResponse.json({
            message: "Customer profile found",
            success: true,
            data: customer
        });

    } catch (error) {
        console.error("Error fetching customer page:", error.message);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
