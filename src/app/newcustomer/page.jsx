"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import Link from "next/link"

const page = () => {
    const router = useRouter();

    const [customer, setCustomer] = useState({
        name: "",
        mark: "",
        address: "",
        gst: "",
        visitday: "",
        amount: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!customer.name || !customer.mark || !customer.gst || !customer.address || !customer.visitday || !customer.amount || !customer.password) {
            newErrors.emptyfields = "All fields are required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const onRegister = async () => {
        console.log(customer)
        if (!validateForm()) return;

        try {
            const response = await axios.post("api/customers/new", customer);
            console.log("Customer registered", response.data);
            router.push("/");
        } catch (error) {
            console.log("Registeration of customer failed", error.message);
        }
        setCustomer({
            name: "",
            mark: "",
            address: "",
            gst: "",
            visitday: "",
            amount: "",
            password: "",
        });
    };

    const handlecustomerChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    return (
        <div className="flex items-center justify-center h-full py-24">
            <Card className="md:w-[40%] w-[95%] bg-zinc-100 dark:bg-background shadow-md border-[#999] dark:border-[#333]">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between text-lg">Add customer {errors.emptyfields && <span className="text-red-500 md:last:text-sm text-xs uppercase">{errors.emptyfields}</span>}</CardTitle>
                    <CardDescription>Add your new customer in one-click.</CardDescription>
                </CardHeader>
                <CardContent>
                    <customer>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col gap-2 space-y-1.5">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        name="name"
                                        placeholder="Customer name"
                                        className="rounded-sm border-[#888] dark:border-[#333] capitalize"
                                        value={customer.name}
                                        onChange={handlecustomerChange}
                                    />
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-1/2">
                                        <Label htmlFor="mark">Mark</Label>
                                        <Input
                                            name="mark"
                                            placeholder="Mark"
                                            className="rounded-sm border-[#888] dark:border-[#333] uppercase"
                                            value={customer.mark}
                                            onChange={handlecustomerChange}
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            name="address"
                                            placeholder="Address"
                                            className="rounded-sm border-[#888] dark:border-[#333] capitalize"
                                            value={customer.address}
                                            onChange={handlecustomerChange}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="gst">GST</Label>
                                    <Input
                                        name="gst"
                                        placeholder="29"
                                        className="uppercase rounded-sm border-[#888] dark:border-[#333]"
                                        value={customer.gst}
                                        onChange={handlecustomerChange}
                                    />
                                </div>

                            </div>
                            <div>
                                <Label htmlFor="visitday">Visit</Label>
                                <Input
                                    name="visitday"
                                    placeholder="Visiting Day"
                                    className="rounded-sm border-[#888] dark:border-[#333] capitalize"
                                    value={customer.visitday}
                                    onChange={handlecustomerChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="amount">Amount</Label>
                                <Input
                                    name="amount"
                                    placeholder="₹"
                                    className="rounded-sm border-[#888] dark:border-[#333]"
                                    value={customer.amount}
                                    onChange={handlecustomerChange}
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    type='password'
                                    name="password"
                                    placeholder=""
                                    className="rounded-sm border-[#888] dark:border-[#333]"
                                    value={customer.password}
                                    onChange={handlecustomerChange}
                                />
                            </div>
                        </div>
                    </customer>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Link href={'/'}>
                        <Button variant="outline" className="border-[#888] dark:border-[#333]">
                            Cancel
                        </Button>
                    </Link>
                    <Button onClick={onRegister}>Insert</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default page