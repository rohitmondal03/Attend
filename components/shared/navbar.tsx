"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { buttonVariants } from "@heroui/styles";
import { ArrowUpRightIcon } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { Logo } from "./logo";

const NAV_LINKS = [
  {
    title: "Home",
    path: ROUTES.home,
  },
  {
    title: "Features",
    path: ROUTES.featuresSection,
  },
  {
    title: "Get Started",
    path: ROUTES.dashboard,
    type: "bold",
    logo: ArrowUpRightIcon,
  },
];

export function Navbar() {
  return (
    <motion.header
      className="flex items-center justify-between border-zinc-700 border rounded-4xl px-12 py-4 w-6/10 mx-auto fixed top-4 left-1/2 -translate-x-1/2 bg-transparent backdrop-blur-3xl z-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeInOut", delay: 1 }}
    >
      <Logo />

      <nav className="flex items-center justify-center gap-4">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={buttonVariants({
              variant: link.type === "bold" ? "primary" : "outline",
              size: "sm",
              className: "font-semibold text-sm border-2 border-transparent hover:border-accent-foreground/50 transition-all ease-linear",
            })}
          >
            {link.title}
            {link.logo && <link.logo className="size-4" />}
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}
