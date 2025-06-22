"use client";

import Sidebar from "@/components/Sidebar";
import { dashboardNavbarData } from "@/constants";
import { Menu } from "lucide-react";
import type { User } from "next-auth";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function LayoutSidebar({ user }: { user: User | undefined }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Toggle menu"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="hover:text-hoverColor hoverEffect bg-primary/90 fixed bottom-0 z-50 max-h-fit min-w-full py-2 md:top-16"
      >
        <Menu className="mr-4 ml-auto" />
      </button>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        pathname={pathname}
        navbarData={dashboardNavbarData}
        user={user}
        side="left"
      />
    </>
  );
}
