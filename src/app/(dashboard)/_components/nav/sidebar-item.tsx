"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface PageData {
  icon: React.ReactNode;
  name: string;
  route: string;
  isOpen: boolean;
}

export default function SidebarItem({ icon, name, route, isOpen }: PageData) {
  const currentPath = usePathname();

  return (
    <Link
      href={route}
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-gray-200/60",
        currentPath === route &&
          "text-gray-700 bg-gray-300/50 hover:bg-gray-200/60 hover:text-gray-700"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        {icon}
        {isOpen && <p>{name}</p>}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-gray-700 h-full transition-all",
          currentPath === route && "opacity-100"
        )}
      ></div>
    </Link>
  );
}
