"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GoBackbtn() {
  const router = useRouter();
  return (
    <Button
      className="focus-outline group mt-4 mb-2 flex px-0 hover:opacity-75"
      onClick={() => router.back()}
      variant={"link"}
    >
      <ArrowLeft
        size={24}
        className="transition-transform group-hover:-translate-x-1.5"
      />
      <span>Go back</span>
    </Button>
  );
}
