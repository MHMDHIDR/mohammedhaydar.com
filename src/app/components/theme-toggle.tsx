"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ThemeToggle({
  isDropDown = false,
}: {
  isDropDown?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Or a loader, or whatever fallback you prefer
  }
  if (isDropDown) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="font-base inline-flex items-center justify-center rounded-md text-sm whitespace-nowrap transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50">
            <Sun
              className={cn(
                "h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90",
              )}
            />
            <Moon
              className={cn(
                "absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0",
              )}
            />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setTheme("light")}
          >
            Light
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setTheme("dark")}
          >
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setTheme("system")}
          >
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <>
      <div className="flex flex-row items-center space-x-2 rounded-full border p-1">
        <Button
          className={cn(
            theme === "light"
              ? "rounded-full bg-neutral-200"
              : "bg-transparent",
            "size-7 p-1",
          )}
          onClick={() => setTheme("light")}
        >
          <Sun
            size={18}
            className="stroke-accent dark:stroke-accent-foreground stroke-1"
          />
        </Button>

        <Button
          className={cn(
            theme === "system"
              ? "rounded-full bg-neutral-200 dark:bg-neutral-700"
              : "bg-transparent",
            "size-7 p-1",
          )}
          onClick={() => setTheme("system")}
        >
          <Monitor
            size={18}
            className="stroke-accent dark:stroke-accent-foreground stroke -1"
          />
        </Button>

        <Button
          className={cn(
            theme === "dark" ? "rounded-full bg-neutral-700" : "bg-transparent",
            "size-7 p-1",
          )}
          onClick={() => setTheme("dark")}
        >
          <Moon
            size={18}
            className="stroke-accent dark:stroke-accent-foreground stroke-1"
          />
        </Button>
      </div>
    </>
  );
}
