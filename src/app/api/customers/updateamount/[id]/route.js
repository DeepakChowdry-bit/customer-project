import connect from "@/db/connect";
import Customer from "@/models/customer.model";
import { NextResponse } from "next/server";

export async function PUT(request, context) {
    const { id } = context.params

    if (!id) {
        return NextResponse.json({
            message: "Missing user ID",
            success: false,
        });
    }

    try {
        await connect();

        const reqBody = await request.json()
        const { newAmount } = reqBody;


        const updatedCustomer = await Customer.findByIdAndUpdate(id, {
            amount: newAmount,
        }, { new: true, runValidators: true });

        if (!updatedCustomer) {
            return NextResponse.json({
                message: "User not found",
                success: false,
            });
        }

        return NextResponse.json({
            message: "Profile updated successfully",
            success: true,
            data: updatedCustomer
        });
    } catch (err) {
        console.error("Error updating profile:", err.message);
        return NextResponse.json({ message: "Error updating profile", success: false });
    }
}
