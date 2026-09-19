"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { FileSpreadsheetIcon } from "lucide-react";
import { buttonVariants } from "@heroui/styles";
import { ROUTES } from "@/lib/routes";

const NAV_LINKS = [
  {
    title: "Home",
    path: ROUTES.home,
  },
  {
    title: "SignIn",
    path: ROUTES.signin,
  },
  {
    title: "Features",
    path: "/#features",
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
      <FileSpreadsheetIcon className="size-8" />

      <nav className="flex items-center justify-center gap-4">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className={buttonVariants({
              variant: "ghost",
              className: "font-semibold text-base",
            })}
          >
            {link.title}
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}
