"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRightIcon } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { Logo } from "./logo";

const NAV_LINKS = [
  {
    title: "How It Works",
    path: ROUTES.howItWorksSection,
  },
  {
    title: "Anti-Proxy",
    path: "#anti-proxy",
  },
  {
    title: "Features",
    path: ROUTES.featuresSection,
  },
];

export function Navbar() {
  return (
    <motion.header
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex w-[calc(100%-2rem)] max-w-5xl items-center justify-between rounded-full border border-border bg-surface/80 px-4 py-2.5 backdrop-blur-xl shadow-sm transition-all sm:px-6"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <Logo />

      <nav className="hidden items-center gap-6 md:flex">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="text-xs font-medium text-muted transition-colors hover:text-foreground"
          >
            {link.title}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2.5">
        <Link
          href={ROUTES.signin}
          className="hidden rounded-full px-3.5 py-1.5 text-xs font-medium text-muted transition-colors hover:bg-surface-secondary hover:text-foreground sm:inline-block"
        >
          Sign In
        </Link>
        <Link
          href={ROUTES.dashboard}
          className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background transition-all hover:bg-accent hover:text-accent-foreground active:scale-95"
        >
          <span>Dashboard</span>
          <ArrowUpRightIcon className="size-3.5" />
        </Link>
      </div>
    </motion.header>
  );
}

