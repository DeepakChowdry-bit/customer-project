import connect from "@/db/connect";
import History from "@/models/history.model";
import { NextResponse } from "next/server";

connect()
  .then(() => console.log("Connected to MongoDB Successfully!"))
  .catch((error) => {
    console.error("Error Connecting MongoDB", error.message);
  });

export async function POST(request) {
  try {
    const reqBody = await request.json();

    const { customer, order_value, bill_number, order_date, amounthis } = reqBody;

    console.log(reqBody)

    // Find the order document for the customer
    const existingHistory = await History.findOne({ customer });

    if (!existingHistory) {
      // If no order exists for the customer, create a new document with the first order
      const newHistory = new History({
        customer,
        orders: [{ order_value, bill_number, order_date }],
        amounts: [{ amount_value: amounthis }]
      });
      const savedHistory = await newHistory.save();
      return NextResponse.json({
        message: "First order registered for customer",
        success: true,
        savedHistory,
      });
    }

    // If order document exists, add the new order to the orders array
    existingHistory.orders.push({ order_value, bill_number, order_date });
    existingHistory.amounts.push({ amount_value: amounthis });
    const savedHistory = await existingHistory.save();

    return NextResponse.json({
      message: "Order added to customer's order history",
      success: true,
      savedHistory,
    });
  } catch (error) {
    console.error("Error saving order:", error.message);
    return NextResponse.json({
      error: "Internal server error",
    }, { status: 500 });
  }
}
