import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { Logo } from "./logo";
import { ShieldCheckIcon, SparklesIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-surface-secondary/40 pt-14 pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-sm space-y-4">
            <Logo />
            <p className="text-xs text-muted leading-relaxed">
              Cryptographically dynamic QR attendance platform. Built for university lecture halls, schools, and coaching centers to eliminate proxy marking.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-[11px] font-mono text-muted">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-success"></span>
              </span>
              <span>All attendance clusters operational</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-12 text-xs">
            <div className="space-y-3">
              <h4 className="font-mono font-semibold uppercase tracking-wider text-foreground">
                Product
              </h4>
              <ul className="space-y-2 text-muted">
                <li>
                  <Link href={ROUTES.howItWorksSection} className="transition-colors hover:text-foreground">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link href="#anti-proxy" className="transition-colors hover:text-foreground">
                    Anti-Proxy Engine
                  </Link>
                </li>
                <li>
                  <Link href={ROUTES.featuresSection} className="transition-colors hover:text-foreground">
                    Features
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-mono font-semibold uppercase tracking-wider text-foreground">
                Portals
              </h4>
              <ul className="space-y-2 text-muted">
                <li>
                  <Link href={ROUTES.signin} className="transition-colors hover:text-foreground">
                    Teacher Sign In
                  </Link>
                </li>
                <li>
                  <Link href={ROUTES.dashboard} className="transition-colors hover:text-foreground">
                    Instructor Dashboard
                  </Link>
                </li>
                <li>
                  <Link href={ROUTES.dashboard} className="transition-colors hover:text-foreground">
                    CSV Export Vault
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3 col-span-2 sm:col-span-1">
              <h4 className="font-mono font-semibold uppercase tracking-wider text-foreground">
                Security
              </h4>
              <ul className="space-y-2 text-muted">
                <li className="flex items-center gap-1.5">
                  <ShieldCheckIcon className="size-3.5 text-accent" />
                  <span>Rotating Tokens</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <SparklesIcon className="size-3.5 text-accent" />
                  <span>Zero-install web client</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/80 pt-6 text-[11px] text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Attend. Dynamic token attendance architecture.</p>
          <p>
            Crafted with precision by{" "}
            <Link
              href="https://rohit-og-portfolio.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground underline underline-offset-4 transition-colors hover:text-accent"
            >
              Rohit Mondal
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

