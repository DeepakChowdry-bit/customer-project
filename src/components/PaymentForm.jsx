"use client"
import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Minus, Plus } from "lucide-react";

const PaymentForm = ({ customer, initialCustomerId, onSubmitSuccess }) => {
    const [paymentData, setPaymentData] = useState({
        payment_value: "",
        payment_date: new Date().toISOString().slice(0, 10), // Set default to today's date
        customer: initialCustomerId,
    });

    const handleChange = (event) => {
        setPaymentData({ ...paymentData, [event.target.name]: event.target.value });
    };

    const deductPayment = async () => {
        const updatedAmount = parseFloat(customer.amount) - parseFloat(paymentData.payment_value);
        try {
            await axios.put(`/api/customers/updateamount/${customer._id}`, { newAmount: updatedAmount });
        } catch (err) {
            console.error('Error adding order:', err.message);
        }
    };

    const handleSubmit = async () => {
        const updatedAmount = parseFloat(customer.amount) - parseFloat(paymentData.payment_value);
        try {
            const response = await axios.post('/api/history/newpay', {
                ...paymentData,
                amounthis: updatedAmount, // Use amounthis if necessary (consider naming convention)
            });
            console.log("Payment made successfully:", response.data);
            onSubmitSuccess && onSubmitSuccess(); // Call optional callback if provided
        } catch (error) {
            console.error('Error making payment:', error.message);
        }
        deductPayment();
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-12 w-12 shrink-0 rounded-full"
                    >
                        <Minus className="h-6 w-6" />
                        <span className="sr-only">Increase</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="md:w-[425px] w-[90%] rounded">
                    <DialogHeader>
                        <DialogTitle>Update balance</DialogTitle>
                        <DialogDescription>
                            Deduct Payments
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 pt-4">
                        <div className="grid grid-cols-1 items-center gap-2">
                            <Label htmlFor="name" className="">
                                Payment value :
                            </Label>
                            <Input
                                type='number'
                                name='payment_value'
                                value={paymentData.payment_value}
                                onChange={handleChange}
                                id="amount"
                                className="col-span-3"

                            />
                        </div>
                    </div>
                    <div className="grid gap-4 pt-1 pb-4">
                        <div className="grid grid-cols-1 items-center gap-2">
                            <Label htmlFor="name" className="">
                                Date :
                            </Label>
                            <Input
                                type='date'
                                name='payment_date'
                                value={paymentData.payment_date}
                                onChange={handleChange}
                                id="amount"
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSubmit}>Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </>
    )
}

export default PaymentForm