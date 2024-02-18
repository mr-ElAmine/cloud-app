import { Box, ChevronLeft, Plus } from "lucide-react";
import SidebarRoutes from "./sidebar-routes";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/use-media-query";
import ButtonNew from "../button-new";

export default function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: () => void | null;
}) {
  const desktop = "(min-width: 768px)";
  const isDesktop = useMediaQuery(desktop);

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      {isOpen ? (
        <Link
          className="w-full flex justify-center items-center p-2 gap-3"
          href="/dashboard"
        >
          <div className="flex items-center gap-2">
            <Box size={50} color="#000000" />

            <p className="font-bold text-lg">The Cube: Cloud</p>
          </div>
        </Link>
      ) : (
        <Link
          className="w-full flex justify-center items-center p-1.5"
          href="/dashboard"
        >
          <div className="flex items-center gap-2">
            <Box size={50} color="#000000" />
          </div>
        </Link>
      )}

      <div className="flex flex-col w-full h-full justify-between">
        <div className="flex flex-col w-full pt-5 gap-4 items-center">
          {isDesktop && <ButtonNew isOpen={isOpen} />}
          <SidebarRoutes isOpen={isOpen} />
        </div>

        {isDesktop && (
          <div
            className="border-t-2 flex items-center justify-center p-3 hover:bg-gray-200/60"
            onClick={() => setIsOpen()}
          >
            <div>
              <ChevronLeft />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
