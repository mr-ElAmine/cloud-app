"use client";
import { Layout, Link2, Star, Trash2 } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { documentId } from "@/lib/lists-actions";
import { useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

interface PageData {
  icon: React.ReactNode;
  name: string;
  route: string;
}

export default function SidebarRoutes({ isOpen }: { isOpen: boolean }) {
  const { userId } = useAuth();
  const params = useParams<{ documentId: string | string[] }>();
  const documentIds = documentId(params, userId!);
  const location = window.location.pathname;

  const RoutesItemDashboard: PageData[] = [
    {
      icon: <Layout size={22} />,
      name: "Dashboard",
      route: documentIds ? `/dashboard/${documentIds}` : "/dashboard",
    },
    {
      icon: <Star size={22} />,
      name: "Starred",
      route: documentIds ? `/starred/${documentIds}` : "/starred",
    },
  ];

  const RoutesItems = RoutesItemDashboard;
  return (
    <div className="flex flex-col w-full">
      {RoutesItems.map((Route) => (
        <SidebarItem
          key={Route.route}
          icon={Route.icon}
          name={Route.name}
          route={Route.route}
          isOpen={isOpen}
        />
      ))}
    </div>
  );
}
