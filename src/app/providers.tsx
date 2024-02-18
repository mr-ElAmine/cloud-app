"use client";
import React from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <AntdRegistry>{children}</AntdRegistry>
    </NextUIProvider>
  );
}
