import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Sidebar from "./sidebar";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function MobileSidebar() {
  const desktop = "(min-width: 768px)";
  const isDesktop = useMediaQuery(desktop);
  
  if (isDesktop) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transitionx">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <Sidebar isOpen={true} setIsOpen={() => {}} />
      </SheetContent>
    </Sheet>
  );
}
