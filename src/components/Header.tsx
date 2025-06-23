"use client";

import Container from "./Container";
import Link from "next/link";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { Logo } from "./Logo";
import { usePathname } from "next/navigation";
import { navbarData } from "@/constants";
import { signOut, useSession } from "next-auth/react";
import type { User } from "next-auth";
import { Button } from "./ui/button";

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user as User;
  const pathname = usePathname() || "";

  return (
    <header className="text-primary sticky top-0 z-50 min-w-full border-b">
      <Container className="bg-accent/15 dark:bg-accent/90 flex min-w-full items-center justify-between py-2 backdrop-blur-md sm:py-4">
        <Logo />
        <div className="hidden items-center gap-7 text-sm font-medium tracking-wide uppercase md:inline-flex">
          {navbarData?.map((item) => (
            <Link
              key={item?.title}
              href={item?.href}
              className={`hover:text-hoverColor hoverEffect group relative overflow-x-hidden ${
                pathname === item?.href && "text-hoverColor"
              }`}
            >
              {item?.title}
              <span
                className={`bg-hoverColor hoverEffect absolute bottom-0 left-0 inline-block h-px w-full group-hover:translate-x-0 ${
                  pathname === item?.href
                    ? "translate-x-0"
                    : "-translate-x-[105%]"
                }`}
              />
            </Link>
          ))}
          <Link href={"/contact"} rel="noopener noreferrer">
            <Button variant={"active"}>Hire me</Button>
          </Link>
          {user && (
            <>
              <Link
                href={"/dashboard/blogs"}
                className="bg-lightSky/10 hover:border-hoverColor hover:bg-hoverColor hoverEffect border-lightSky/100 rounded-md border px-4 py-2 text-sm hover:text-black"
              >
                Dashboard
              </Link>
              <button
                onClick={async () => await signOut({ redirectTo: "/" })}
                className="hoverEffect rounded-md bg-red-500 px-4 py-2 text-sm hover:bg-red-700"
              >
                Sign out
              </button>
            </>
          )}
        </div>
        <button
          aria-label="Toggle menu"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hover:text-hoverColor hoverEffect relative inline-flex md:hidden"
        >
          <Menu />
        </button>
      </Container>
      <div className="md:hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          pathname={pathname}
          navbarData={navbarData}
          user={user}
        />
      </div>
    </header>
  );
}
