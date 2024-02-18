"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { Box } from "lucide-react";
import { usePathname } from "next/navigation";

interface PageData {
  name: string;
  route: string;
}

export default function NavBar() {
  const { isSignedIn } = useUser();
  const currentPath = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const RoutesItems: PageData[] = [
    {
      name: "Home",
      route: "/",
    },
    {
      name: "Contact",
      route: "https://portfolio-app-3j2f.vercel.app/",
    },
  ];

  if (isSignedIn) {
    RoutesItems.push({
      name: "Dashboard",
      route: "/dashboard",
    });
  }

  return (
    <Navbar
      maxWidth="full"
      position="sticky"
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="p-2"
    >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent justify="start">
          <NavbarBrand className="flex justify-center sm:justify-start">
            <Link href={!isSignedIn ? "/" : "/dashboard"}>
              <Box size={50} color="#000000" />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {RoutesItems.map((Route: PageData, index) => (
            <div key={`${Route}-${index}`}>
              <NavbarItem isActive={currentPath === Route.route ? true : false}>
                <Link
                  color="foreground"
                  href={Route.route}
                  size="lg"
                  underline={currentPath === Route.route ? "always" : "hover"}
                >
                  {Route.name}
                </Link>
              </NavbarItem>
            </div>
          ))}
        </NavbarContent>
        {isSignedIn ? (
          <NavbarContent justify="end">
            <UserButton afterSignOutUrl="/"/>
          </NavbarContent>
        ) : (
          <NavbarContent justify="end">
            <NavbarItem className="hidden sm:flex">
              <Button
                as={Link}
                href="/sign-in/"
                radius="sm"
                size="md"
                variant="ghost"
              >
                Login
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                href="/sign-up/"
                variant="flat"
                radius="sm"
                size="md"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </NavbarContent>
        )}

        <NavbarMenu className="border">
          {RoutesItems.map((Route: PageData, index) => (
            <div key={`${Route}-${index}`}>
              <NavbarMenuItem>
                <Button
                  as={Link}
                  className="w-full"
                  href={Route.route}
                  size="md"
                  variant={currentPath === Route.route ? "faded" : "solid"}
                >
                  {Route.name}
                </Button>
              </NavbarMenuItem>
            </div>
          ))}
          {!isSignedIn && (
            <NavbarItem>
              <Button
                as={Link}
                href="/sign-in/"
                radius="sm"
                size="md"
                variant="flat"
                className="w-full"
              >
                Login
              </Button>
            </NavbarItem>
          )}
        </NavbarMenu>
    </Navbar>
  );
}
