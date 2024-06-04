import connect from "@/db/connect";
import History from "@/models/history.model";
import { NextResponse } from "next/server";

export async function GET(request, context) {
    const { id } = context.params;

    if (!id) {
        return NextResponse.json({
            message: "Missing user ID",
            success: false,
        });
    }

    try {
        await connect();

        const history = await History.find({ customer: id });

        if (!history.length) {
            return NextResponse.json({
                message: "No history found for this customer",
                success: false,
            });
        }

        return NextResponse.json({
            message: "History fetched successfully",
            success: true,
            history,
        });
    } catch (err) {
        console.error("Error fetching history:", err.message);
        return NextResponse.json({
            message: "Error fetching history",
            success: false,
        });
    }
}
