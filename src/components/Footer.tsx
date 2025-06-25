import ThemeToggle from "@/app/components/theme-toggle";
import { SOCIALS } from "@/constants";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent-foreground/50 dark:bg-accent/50 fixed bottom-0 left-0 z-20 w-full px-4 backdrop-blur-sm sm:px-6 md:px-10">
      <div className="mx-auto flex items-center justify-between p-0.5 max-sm:flex-col max-sm:gap-2 sm:p-1.5">
        <div className="flex items-center max-sm:w-full max-sm:justify-between sm:inline-flex sm:gap-x-3">
          <div className="flex items-center gap-x-4 sm:gap-x-3">
            {SOCIALS.filter((social) => social.active).map((social) => (
              <Link
                key={social.href}
                href={social.href}
                className="rotate-6 opacity-90 transition-transform hover:rotate-0 hover:opacity-100"
                title={social.linkTitle}
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon className="size-4 sm:size-6" />
                <span className="sr-only">{social.linkTitle}</span>
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-x-1 text-xs max-sm:hidden sm:gap-x-2 sm:text-sm">
          <span>© {currentYear}</span>
          <span>|</span>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
