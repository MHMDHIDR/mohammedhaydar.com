import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href={"/"}>
      <Image
        src="/logo.svg"
        width={35}
        height={35}
        alt="Mohammed Haydar"
        className={cn("h-8 w-8 cursor-pointer", className)}
      />
    </Link>
  );
}
