"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useId, useRef, useState } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { cn } from "@/lib/utils";

export function SecondaryHeading({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [beamPositions, setBeamPositions] = useState<Array<number>>([]);

  useEffect(() => {
    /**
     * Here we are calculating the number of beams that will be displayed based on the height of the container.
     * We are also calculating the positions of the beams based on the height of the container.
     * The beams are displayed in a staggered manner, with the first beam being displayed
     * at a random position between 10% and 20% of the height of the container.
     * The second beam is displayed at a random position between 20% and 30% of the height of the container.
     * And so on.
     */
    if (ref.current) {
      setContainerWidth(ref.current?.clientWidth ?? 0);

      const height = ref.current?.clientHeight ?? 0;
      const numberOfBeams = Math.floor(height / 10);
      const positions = Array.from(
        { length: numberOfBeams },
        (_, i) => (i + 1) * (height / (numberOfBeams + 1)),
      );
      setBeamPositions(positions);
    }
  }, []);

  return (
    <div
      ref={ref}
      className="group/cover relative my-6 inline-block rounded-sm bg-neutral-100 px-4 py-2 text-center text-lg transition duration-200 select-none hover:bg-neutral-900 dark:bg-neutral-900"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            animate={{ opacity: 1 }}
            className="absolute inset-0 h-full w-full overflow-hidden"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.2 } }}
          >
            <motion.div
              animate={{
                x: ["-50%", "0%"],
              }}
              className="flex h-full w-[200%]"
              transition={{
                x: { duration: 10, ease: "linear", repeat: Infinity },
              }}
            >
              <SparklesCore
                background="transparent"
                className="h-full w-full"
                maxSize={1}
                minSize={0.4}
                particleColor="#FFFFFF"
                particleDensity={500}
              />
              <SparklesCore
                background="transparent"
                className="h-full w-full"
                maxSize={1}
                minSize={0.4}
                particleColor="#FFFFFF"
                particleDensity={500}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {beamPositions.map((position, index) => (
        <Beam
          key={index}
          delay={Math.random() * 2 + 1}
          duration={Math.random() * 2 + 1}
          hovered={hovered}
          style={{ top: `${position}px` }}
          width={containerWidth}
        />
      ))}
      <motion.span
        key={String(hovered)}
        animate={{
          scale: hovered ? 0.8 : 1,
          x: hovered ? [0, -30, 30, -30, 30, 0] : 0,
          y: hovered ? [0, 30, -30, 30, -30, 0] : 0,
        }}
        className={cn(
          "relative z-20 inline-block text-balance text-blue-900 transition duration-200 group-hover/cover:text-white dark:text-white",
          className,
        )}
        exit={{ filter: "none", scale: 1, x: 0, y: 0 }}
        transition={{
          duration: 0.2,
          x: { duration: 0.2, repeat: Infinity, repeatType: "loop" },
          y: { duration: 0.2, repeat: Infinity, repeatType: "loop" },
          scale: { duration: 0.2 },
          filter: { duration: 0.2 },
        }}
      >
        {children}
      </motion.span>
      <CircleIcon className="absolute -top-[2px] -right-[2px]" />
      <CircleIcon className="absolute -right-[2px] -bottom-[2px]" />
      <CircleIcon className="absolute -top-[2px] -left-[2px]" />
      <CircleIcon className="absolute -bottom-[2px] -left-[2px]" />
    </div>
  );
}

export function Beam({
  className,
  delay,
  duration,
  hovered,
  width = 600,
  ...svgProps
}: {
  className?: string;
  delay?: number;
  duration?: number;
  hovered?: boolean;
  width?: number;
} & React.ComponentProps<typeof motion.svg>) {
  const id = useId();

  return (
    <motion.svg
      className={cn("absolute inset-x-0 w-full", className)}
      fill="none"
      height="1"
      viewBox={`0 0 ${width ?? "600"} 1`}
      width={width ?? "600"}
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <motion.path
        d={`M0 0.5H${width ?? "600"}`}
        stroke={`url(#svgGradient-${id})`}
      />

      <defs>
        <motion.linearGradient
          key={String(hovered)}
          animate={{ x1: "110%", x2: hovered ? "100%" : "105%", y1: 0, y2: 0 }}
          gradientUnits="userSpaceOnUse"
          id={`svgGradient-${id}`}
          initial={{ x1: "0%", x2: hovered ? "-10%" : "-5%", y1: 0, y2: 0 }}
          transition={{
            duration: hovered ? 0.5 : (duration ?? 2),
            ease: "linear",
            repeat: Infinity,
            delay: hovered ? Math.random() * (1 - 0.2) + 0.2 : 0,
            repeatDelay: hovered ? Math.random() * (2 - 1) + 1 : (delay ?? 1),
          }}
        >
          <stop stopColor="#2EB9DF" stopOpacity="0" />
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </motion.svg>
  );
}

export function CircleIcon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        `group pointer-events-none h-2 w-2 animate-pulse rounded-full bg-neutral-600 opacity-20 group-hover/cover:hidden group-hover/cover:bg-white group-hover/cover:opacity-100 dark:bg-white`,
        className,
      )}
    />
  );
}
