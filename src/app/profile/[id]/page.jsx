"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import OrderForm from "@/components/OrderForm";
import PaymentForm from "@/components/PaymentForm";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDate } from "date-fns";

const page = ({ params }) => {
  const [customer, setCustomer] = useState(null);

  const [customerOrders, setCustomerOrders] = useState([]);

  const [customerAmounts, setCustomerAmounts] = useState([]);

  const [customerPayments, setCustomerPayments] = useState([]);

  const fetchCustomerDetails = async () => {
    try {
      const response = await axios.get(`/api/customers/${params.id}`);
      const customerData = response.data.data; // Assuming your API returns data nested within a "data" property

      console.log(customerData);
      setCustomer(customerData);
    } catch (err) {
      console.error("Error fetching customer details:", err.message);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`/api/history/${params.id}`);
      console.log(response.data);
      const ordersData = response.data.history[0].orders;
      setCustomerOrders(ordersData);
    } catch (err) {
      console.error("Error fetching orders:", err.message);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await axios.get(`/api/history/${params.id}`);
      console.log(response.data);
      const paymentsData = response.data.history[0].payments;
      setCustomerPayments(paymentsData);
    } catch (err) {
      console.error("Error fetching orders:", err.message);
    }
  };

  const fetchAmounts = async () => {
    try {
      const response = await axios.get(`/api/history/${params.id}`);
      console.log(response.data);
      const amountsData = response.data.history[0].amounts;
      setCustomerAmounts(amountsData);
    } catch (err) {
      console.error("Error fetching orders:", err.message);
    }
  };

  useEffect(() => {
    fetchCustomerDetails();
    fetchOrders();
    fetchPayments();
    fetchAmounts();
  }, [params.id]);

  return (
    <>
      {customer ? ( // Conditional rendering to avoid null errors
        <div className="flex flex-col items-center justify-center py-24">
          <div className="flex flex-col items-center justify-center w-[90%] gap-4">
            <div className="flex flex-col md:flex-row gap-2 items-center justify-between w-full">
              <h3 className="text-2xl font-bold uppercase relative text-center">
                {customer.name}
              </h3>
              <div className="flex gap-6 items-center justify-center">
                <h4 className="capitalize">{customer.address}</h4>
                <p className="uppercase tracking-wide text-sm">
                  {customer.gst}
                </p>
              </div>
            </div>
            <div
              key={customer._id}
              className="p-4 flex justify-center shadow w-full"
            >
              <div className="flex w-11/12 items-center justify-center space-x-2">
                <PaymentForm
                  customer={customer}
                  initialCustomerId={params.id}
                  onSubmitSuccess={() => {}}
                />

                <div className="flex-1 text-center">
                  <div className="text-4xl font-bold tracking-tighter">
                    {customer.amount}
                  </div>
                  <div className="text-[0.70rem] mt-1 uppercase text-muted-foreground">
                    Balance amount
                  </div>
                </div>
                <OrderForm
                  customer={customer}
                  initialCustomerId={params.id}
                  onSubmitSuccess={() => {}}
                />
              </div>
            </div>

            <div className="w-full mt-4 border">
              {customerOrders.length > 0 || customerPayments.length > 0 ? (
                <div className="list-disc w-full flex">
                  <table className="w-3/5 border">
                    <thead className="w-full h-12">
                      <tr class="w-full border">
                        <th className="w-1/4">Date</th>
                        <th className="w-1/4">Value</th>
                      </tr>
                    </thead>

                    <tbody>
                      {/* Combine orders and payments considering payment before order */}
                      {[...customerPayments, ...customerOrders]
                        .reduce((acc, item) => {
                          const existingIndex = acc.findIndex(
                            (existingItem) => existingItem._id === item._id
                          );
                          if (existingIndex === -1) {
                            acc.push(item);
                          }
                          return acc;
                        }, [])
                        .map((item) => (
                          <tr key={item._id} className="w-full">
                            {/* ... render date based on order_date or payment_date */}
                            <td className="border h-10">
                              <p className="text-center">
                                {item.order_date
                                  ? formatDate(
                                      new Date(item.order_date),
                                      "dd-MM-yyyy"
                                    )
                                  : formatDate(
                                      new Date(item.payment_date),
                                      "dd-MM-yyyy"
                                    )}
                              </p>
                            </td>
                            <td className="border text-center">
                              {/* ... render value based on order_value or payment_value */}
                              {item.order_value ? (
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <p className="text-green-500 cursor-pointer">
                                        {item.order_value}
                                      </p>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p className="text-xs">
                                        Bill no : {item.bill_number}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              ) : (
                                <p className="text-red-500">
                                  {item.payment_value}
                                </p>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <table className="w-2/5 border">
                    <thead className="w-full h-12">
                      <tr class="w-full border">
                        <th className="w-1/4">Balance</th>
                      </tr>
                    </thead>
                    <tbody className="w-full border text-center">
                      {customerAmounts.map((amount) => (
                        <tr key={amount._id} className="w-full">
                          <td className="border">{amount.amount_value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center">No history yet</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading customer details...</p>
      )}
    </>
  );
};

export default page;
