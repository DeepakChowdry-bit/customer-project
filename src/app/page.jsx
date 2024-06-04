import Customers from "@/components/Customers";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-6 items-center justify-center py-8">
        <Customers />
      </div>
    </>
  );
}
