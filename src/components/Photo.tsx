"use client";
import React from "react";
import Image from "next/image";
import { easeIn, motion } from "motion/react";

const Photo = () => {
  const circleColors = ["#2376eb"];
  const circleVariants = {
    initial: {
      strokeDasharray: "24 10 0 0",
      rotate: 0,
      opacity: 0,
    },
    animate: (index: number) => ({
      strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
      rotate: [120, 360],
      opacity: 1,
      transition: {
        strokeDasharray: {
          duration: 20,
          repeat: Infinity,
        },
        rotate: {
          duration: 20,
          repeat: Infinity,
        },
        opacity: {
          duration: 0.4,
          delay: 2 + index * 0.4,
        },
      },
    }),
  };
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2, duration: 0.4, ease: "easeIn" },
        }}
        className="relative"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeInOut" },
          }}
          className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform"
        >
          <div className="h-[250px] w-[250px] overflow-hidden rounded-full lg:h-[420px] lg:w-[400px]">
            <Image
              src={"/hero.webp"}
              alt="heroImage"
              width={400}
              height={400}
              quality={100}
              className="h-full w-full rounded-full object-cover"
              draggable={false}
              priority
            />
          </div>
        </motion.div>
        <svg
          className="h-[300px] w-[300px] lg:h-[506px] lg:w-[506px]"
          viewBox="0 0 506 506"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {circleColors.map((color, index) => (
            <motion.circle
              key={index}
              cx="255"
              cy="255"
              r={222 - index * 15}
              stroke={color}
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={circleVariants}
              initial="initial"
              animate="animate"
              custom={index}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
};

export default Photo;
