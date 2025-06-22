"use client";

import React, { useState } from "react";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { services } from "./services";
import PageLayout from "@/components/PageLayout";
import Title from "@/components/Title";

export const dynamic = "force-static";

export default function ServicesPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: { clientX: number; clientY: number }) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <section
      className="relative w-full overflow-hidden py-10"
      onMouseMove={handleMouseMove}
    >
      <PageLayout>
        <div
          className="pointer-events-none fixed inset-0"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(190, 255, 255, 0.1), transparent 40%)`,
          }}
        />

        <div className="mx-auto max-w-6xl px-4">
          <Title className="mb-12 text-4xl">Services I Provide</Title>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service, index) => {
              return (
                <Link
                  key={index}
                  href={`/contact?service=${service.title.replace(" ", "-")}`}
                  className="group relative block"
                >
                  <div className="relative h-full overflow-hidden rounded-2xl border border-gray-200/50 bg-white/60 p-8 backdrop-blur-md transition-all duration-500 hover:border-gray-300/70 hover:bg-white/70 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative z-10">
                      <div className="mb-6 flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex size-20 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:from-blue-500/30 group-hover:to-purple-500/30">
                            <Image
                              src={`/${service.icon}.png`}
                              alt={service.title}
                              width={64}
                              height={64}
                              className="transition-all duration-300 group-hover:scale-110"
                            />
                          </div>

                          <div className="flex flex-col">
                            <span className="text-6xl font-black text-gray-300 transition-all duration-300 group-hover:text-gray-400 dark:text-white/10 dark:group-hover:text-white/20">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                          </div>
                        </div>

                        <div className="rounded-full bg-white/10 p-2 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-500/20 dark:bg-white/10 dark:group-hover:bg-blue-500/20">
                          <ArrowUp className="h-5 w-5 rotate-45 text-blue-600 transition-colors duration-300 group-hover:text-blue-700 dark:text-blue-400 dark:group-hover:text-blue-300" />
                        </div>
                      </div>

                      <h3 className="mb-4 text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-300">
                        {service.title}
                      </h3>

                      <p className="leading-relaxed text-gray-700 transition-colors duration-300 group-hover:text-gray-800 dark:text-white/70 dark:group-hover:text-white/80">
                        {service.description}
                      </p>

                      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    </div>

                    <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </PageLayout>
    </section>
  );
}
