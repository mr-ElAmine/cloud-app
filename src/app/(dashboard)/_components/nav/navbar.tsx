"use client ";
import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";
import { Box } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="p-3 border-b h-full w-full flex items-center justify-between bg-white shadow-sm">
      <MobileSidebar />
      <div className="w-full md:hidden justify-center flex">
        <Link href="/dashboard">
          <Box size={50} color="#000000" />
        </Link>
      </div>
      <div className="flex gap-x-2 ml-auto">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
