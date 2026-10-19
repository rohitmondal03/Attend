import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href={ROUTES.home}
      className={`group inline-flex items-center gap-2.5 transition-transform duration-200 active:scale-95 ${className ?? ""}`}
    >
      <div className="relative flex size-9 items-center justify-center rounded-xl bg-foreground text-background shadow-sm transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
        {/* Geometric QR viewfinder matrix mark */}
        <svg
          className="size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <path d="M14 14h3" />
          <path d="M21 14v3" />
          <path d="M14 21h7" />
          <circle cx="6.5" cy="6.5" r="1" fill="currentColor" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
          <circle cx="6.5" cy="17.5" r="1" fill="currentColor" />
        </svg>
        <span className="absolute -top-1 -right-1 flex size-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
          <span className="relative inline-flex size-2.5 rounded-full bg-accent"></span>
        </span>
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold tracking-tight text-foreground">
          Attend
        </span>
        <span className="text-[10px] font-mono uppercase tracking-wider text-muted">
          QR Verification
        </span>
      </div>
    </Link>
  );
}

