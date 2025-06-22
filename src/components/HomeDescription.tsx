"use client";

import { useTypeWriter } from "@/hooks/use-type-writer";
import { useEffect, useState } from "react";
const HomeDescription = () => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const description =
    "Full Stack Engineer with 6+ years in React.js, Next.js, and modern web tech, building fast, reliable applications with clean code and strong teamwork.";
  const { displayedText } = useTypeWriter(description, 30);

  useEffect(() => {
    setHasLoaded(true);
  }, []);

  return (
    <p className="text-accent dark:text-accent-foreground mb-6 min-h-30 w-auto leading-7 font-normal">
      {hasLoaded ? (
        displayedText
          .split("")
          .map((char, index) => <span key={index}>{char}</span>)
      ) : (
        <span>{description}</span>
      )}
    </p>
  );
};

export default HomeDescription;
