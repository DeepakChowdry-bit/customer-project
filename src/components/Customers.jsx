// src/app/Customers/page.jsx
"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Minus, Plus } from "lucide-react";
// import { Bar, BarChart, ResponsiveContainer } from "recharts"

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { MdPersonAddAlt1 } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
const CustomersPage = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState("");

  const [date, setDate] = useState()

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true); // Set loading state to true
      setError(null); // Clear any previous errors

      try {
        const response = await axios.get("api/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setError(error); // Set error state for rendering
      } finally {
        setIsLoading(false); // Set loading state to false after fetching (success or failure)
      }
    };

    fetchCustomers();
  }, []);

  const handleDayFilterChange = (day) => {
    setSelectedDay(day);
  };

  const filteredCustomers = customers.filter((customer) => {
    // Filter based on selected day or show all if no day selected
    return selectedDay === "" || customer.visitday === selectedDay;
  });

  return (
    <div className="flex flex-col items-center justify-center py-14 w-full">
      <div className="flex flex-wrap items-center justify-center md:w-10/12 w-[95%]">
        <div className="flex flex-col gap-6 justify-start items-center w-full">
          <div className="text-2xl font-bold mb-4 flex items-center justify-between w-[95%] md:w-full">
            <h3 className="uppercase text-lg">Customers</h3>
            <Button className="w-12 h-12 rounded-full">
              <Link href={"/newcustomer"}><MdPersonAddAlt1 className="text-xl" /></Link>
            </Button>
          </div>

          {/* Filter dropdown */}
          <div className="flex w-[95%] md:w-full items-center gap-2 mb-4">
            <Button
              variant="outline"
              className={
                selectedDay === ""
                  ? "bg-gray-200 text-gray-600 text-xs h-8 px-2"
                  : " text-xs h-8 px-2"
              }
              onClick={() => handleDayFilterChange("")} // All days filter
            >
              All Days
            </Button>
            <Button
              variant="outline"
              className={
                selectedDay === "Tuesday"
                  ? "bg-orange-200 text-orange-600  text-xs h-8 px-2"
                  : " text-xs h-8 px-2"
              }
              onClick={() => handleDayFilterChange("Tuesday")}
            >
              Tuesday
            </Button>
            <Button
              variant="outline"
              className={
                selectedDay === "Saturday"
                  ? "bg-blue-200 text-blue-600  text-xs h-8 px-2"
                  : " text-xs h-8 px-2"
              }
              onClick={() => handleDayFilterChange("Saturday")}
            >
              Saturday
            </Button>
            <Button
              variant="outline"
              className={
                selectedDay === "Sunday"
                  ? "bg-green-200 text-green-600  text-xs h-8 px-2"
                  : " text-xs h-8 px-2"
              }
              onClick={() => handleDayFilterChange("Sunday")}
            >
              Sunday
            </Button>
          </div>

          {isLoading && <p>Loading customers...</p>}
          {error && (
            <p className="text-red-500 flex w-[95%] md:w-full items-center gap-2 mb-4">
              Error fetching customers: {error.message}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-3 w-[95%] md:px-1 md:w-full">
            {filteredCustomers.length === 0 && !isLoading && (
              <h3>No customers yet</h3>
            )}
            {filteredCustomers.map((customer) => (
              <div
                className="border  p-3 rounded-sm flex flex-col gap-3 justify-center w-full md:w-80 lg:w-64 border-zinc-300 dark:border-[#333] shadow"
                key={customer._id}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex justify-between items-center my-1">
                      <dfn className="uppercase text-left font-semibold tracking-widest">
                        {customer.mark}
                      </dfn>

                      <p
                        className={`text-[10px] px-[6px] py-[2px] rounded font-medium
                                        ${customer.visitday === "Tuesday"
                            ? "bg-orange-200 text-orange-600"
                            : ""
                          }
                                        ${customer.visitday === "Saturday"
                            ? "bg-blue-200 text-blue-600"
                            : ""
                          }
                                        ${customer.visitday === "Sunday"
                            ? "bg-green-200 text-green-600"
                            : ""
                          }`}
                      >
                        {customer.visitday}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">{customer.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="flex items-center justify-between text-xs">
                  <p className="uppercase tracking-wide">
                    {customer.address}
                  </p>

                  <h3 className="uppercase text- tracking-wider">
                    {customer.gst}
                  </h3>
                </div>
                <div className="flex items-center justify-end">
                  <Drawer>
                    <DrawerTrigger asChild>
                      <Button
                        variant="outline"
                        className="border-[#888] dark:border-[#333] text-xs p-2 h-10"
                      >
                        Manage
                      </Button>
                    </DrawerTrigger>
                    <DrawerContent className="py-4">
                      <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader className="flex gap-3 flex-col items-center h-28 justify-center pt-5">
                          <DrawerTitle className='text-center'>{customer.name}</DrawerTitle>
                          <DrawerDescription className="flex flex-col items-center w-11/12 text-sm">
                            <h3 className="uppercase tracking-wide font-medium">
                              {customer.address}
                            </h3>
                          </DrawerDescription>
                        </DrawerHeader>
                        <div key={customer._id} className="p-4 flex justify-center">
                          <div className="flex w-10/12 items-center justify-center space-x-2">
                            <div className="flex-1 text-center">
                              <div className="text-4xl font-bold tracking-tighter">
                                {customer.amount}
                              </div>
                              <div className="text-[0.70rem] mt-1 uppercase text-muted-foreground">
                                Balance amount
                              </div>
                            </div>
                          </div>
                        </div>
                        <DrawerFooter>
                          <Link href={`/profile/${customer._id}`} className="w-full">
                            <Button className='h-12 w-full'>Edit</Button>
                          </Link>
                          <DrawerClose asChild>
                            <Button variant="outline" className="border border-[#777] h-12">Close</Button>
                          </DrawerClose>
                        </DrawerFooter>
                      </div>
                    </DrawerContent>
                  </Drawer>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
};

export default CustomersPage;
