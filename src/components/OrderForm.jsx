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



const OrderForm = ({ customer, initialCustomerId, onSubmitSuccess }) => {
    const [orderData, setOrderData] = useState({
        order_value: "",
        bill_number: "",
        order_date: new Date().toISOString().slice(0, 10), // Set default to today's date
        customer: initialCustomerId,
    });

    const handleChange = (event) => {
        setOrderData({ ...orderData, [event.target.name]: event.target.value });
    };

    const addOrder = async () => {
        const updatedAmount = parseFloat(customer.amount) + parseFloat(orderData.order_value);
        try {
            await axios.put(`/api/customers/updateamount/${customer._id}`, { newAmount: updatedAmount });
        } catch (err) {
            console.error('Error adding order:', err.message);
        }
    };

    const handleSubmit = async () => {
        const updatedAmount = parseFloat(customer.amount) + parseFloat(orderData.order_value);
        try {
            const response = await axios.post('/api/history/new', {
                ...orderData,
                amounthis: updatedAmount, // Use amounthis if necessary (consider naming convention)
            });
            console.log("Order created successfully:", response.data);
            onSubmitSuccess && onSubmitSuccess(); // Call optional callback if provided
        } catch (error) {
            console.error('Error creating order:', error.message);
        }
        addOrder();
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
                        <Plus className="h-6 w-6" />
                        <span className="sr-only">Increase</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="md:w-[425px] w-[90%] rounded">
                    <DialogHeader>
                        <DialogTitle>Update balance</DialogTitle>
                        <DialogDescription>
                            Add Orders
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 pt-4">
                        <div className="grid grid-cols-1 items-center gap-2">
                            <Label htmlFor="name" className="">
                                Order value :
                            </Label>
                            <Input
                                type='number'
                                name='order_value'
                                value={orderData.order_value}
                                onChange={handleChange}
                                id="amount"
                                className="col-span-3"

                            />
                        </div>
                    </div>
                    <div className="grid gap-4 pt-1">
                        <div className="grid grid-cols-1 items-center gap-2">
                            <Label htmlFor="name" className="">
                                Reciept no :
                            </Label>
                            <Input
                                name='bill_number'
                                value={orderData.bill_number}
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
                                name='order_date'
                                value={orderData.order_date}
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

export default OrderForm