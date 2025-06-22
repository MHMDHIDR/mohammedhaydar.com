import { useOutsideClick } from "@/hooks/use-outside-click";
import { X } from "lucide-react";
import React from "react";
import { Logo } from "./Logo";
import Link from "next/link";
import SocialLinks from "./SocialLinks";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";
import clsx from "clsx";

type SidebarProps = {
  isOpen?: boolean;
  onClose: () => void;
  pathname: string;
  user: User | undefined;
  navbarData: { title: string; href: string }[];
  side?: "left" | "right";
};

const Sidebar: React.FC<SidebarProps> = ({
  isOpen = false,
  onClose,
  pathname,
  navbarData,
  user,
  side = "right",
}) => {
  const sidebarRef = useOutsideClick<HTMLDivElement>(onClose);

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 z-999 bg-black/75 transition-opacity duration-300",
          {
            "pointer-events-auto opacity-100": isOpen,
            "pointer-events-none opacity-0": !isOpen,
          },
        )}
        onClick={onClose}
      />
      <div
        ref={sidebarRef}
        className={clsx(
          "bg-bodyColor border-l-hoverColor/50 bg-accent/10 dark:bg-accent/30 fixed inset-y-0 z-1000 max-w-96 min-w-72 transform border-l shadow-xl backdrop-blur-md transition-transform duration-300 ease-in-out",
          {
            "translate-x-0": isOpen,
            "translate-x-full": !isOpen && side === "right",
            "-translate-x-full": !isOpen && side === "left",
            "left-0": side === "left",
            "right-0": side === "right",
          },
        )}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="hoverEffect hover:text-red-600"
            aria-label="Close sidebar"
          >
            <X />
          </button>
        </div>
        <nav className="mt-2 flex flex-col gap-7 px-5 text-sm font-medium tracking-wide uppercase">
          <span className="flex items-center gap-x-2">
            <Logo /> Mohammed Ibrahim
          </span>
          {navbarData.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className={`hover:text-hoverColor hoverEffect ${
                pathname === item.href && "text-hoverColor"
              }`}
              onClick={onClose}
            >
              {item.title}
            </Link>
          ))}
          <Link
            href={"/contact"}
            rel="noopener noreferrer"
            className="bg-lightSky/10 border-hoverColor/10 hover:border-hoverColor hover:bg-hoverColor hoverEffect rounded-md border px-4 py-2 text-sm hover:text-black"
            onClick={onClose}
          >
            Talk to me
          </Link>
          {user && (
            <>
              <Link
                href={"/dashboard"}
                className="bg-lightSky/10 hover:border-hoverColor hover:bg-hoverColor hoverEffect border-lightSky/100 rounded-md border px-4 py-2 text-sm hover:text-black"
                onClick={onClose}
              >
                Dashboard
              </Link>
              <button
                onClick={async () => await signOut({ redirectTo: "/" })}
                className="hoverEffect rounded-md bg-red-500 px-4 py-2 text-sm hover:bg-red-700"
              >
                Sign out
              </button>
            </>
          )}
          <SocialLinks />
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
