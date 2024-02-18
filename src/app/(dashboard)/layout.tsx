"use client";
import { useUser } from "@clerk/nextjs";
import { Spin } from "antd";
import { Loader2 } from "lucide-react";
import Sidebar from "./_components/nav/sidebar";
import Navbar from "./_components/nav/navbar";
import { useState } from "react";
import ButtonNew from "./_components/button-new";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const desktop = "(min-width: 768px)";
  const isDesktop = useMediaQuery(desktop);
  const { isLoaded } = useUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (!isLoaded) {
    return (
      <>
        <div className="h-screen w-screen flex justify-center items-center">
          <Spin
            indicator={
              <Loader2
                color="#000000"
                strokeWidth={2}
                style={{ fontSize: 50 }}
                className="animate-spin"
              />
            }
          />
        </div>
      </>
    );
  }
  
  return (
    <section className="h-screen">
      <div
        className={`${
          isOpen ? "md:pl-56" : "md:pl-20"
        } h-[60px] fixed inset-y-0 w-full z-50`}
      >
        <Navbar />
      </div>
      <div
        className={`${
          isOpen ? "w-56" : "w-20"
        } hidden md:flex h-full flex-col fixed inset-y-0 z-50`}
      >
        <Sidebar isOpen={isOpen} setIsOpen={toggleSidebar} />
      </div>
      <main
        className={`${isOpen ? "md:pl-56" : "md:pl-20"} pt-[60px] h-screen`}
      >
        <div className="p-3 h-full">
          <div className="flex min-[200px]:flex-row flex-col gap-3">
            {isDesktop === false && <ButtonNew isOpen={true} />}
          </div>

          {children}
        </div>
      </main>
    </section>
  );
}
