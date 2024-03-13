import type React from "react";

interface SectionHeadingProps {
  children: React.ReactNode | string;
  watermark?: string;
}

export default function SectionHeading({
  children,
  watermark,
}: SectionHeadingProps) {
  return (
    <div className="section-heading relative overflow-hidden pb-14 text-center">
      <h2 className="relative z-10 mb-2 uppercase">{children}</h2>
      <span className="bg-primary relative z-10 inline-block h-1.5 w-32 overflow-hidden rounded-full bg-opacity-20">
        <span className="animate-lefttoright bg-primary absolute left-0 top-0 inline-block h-full w-1.5 rounded-full"></span>
      </span>
      {watermark ? (
        <span className="text-heading pointer-events-none absolute -top-2 left-1/2 z-0 -translate-x-1/2 transform text-9xl font-bold uppercase opacity-5">
          {watermark}
        </span>
      ) : null}
    </div>
  );
}
