"use client";

/* Hallmark · genre: modern-minimal · macrostructure: Two-Column Hero · theme: Cobalt · design-system: design.md · designed-as-app */
/* Hallmark · pre-emit critique: P5 H5 E5 S5 R5 V5 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  RefreshCwIcon,
  SmartphoneIcon,
  FileSpreadsheetIcon,
  RadioIcon,
  CheckCircle2Icon,
  XCircleIcon,
  ClockIcon,
  UsersIcon,
  LaptopIcon,
  LockIcon,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

const SIMULATED_ATTENDEES = [
  { name: "Priya Sharma", roll: "21CS042", time: "Just now" },
  { name: "Alex Chen", roll: "21CS018", time: "3s ago" },
  { name: "Devika Nair", roll: "21CS089", time: "7s ago" },
  { name: "Marcus Vance", roll: "21CS104", time: "11s ago" },
  { name: "Rohan Gupta", roll: "21CS055", time: "14s ago" },
];

export default function HomePage() {
  const [countdown, setCountdown] = useState(8);
  const [tokenSeed, setTokenSeed] = useState(1048);
  const [verifiedCount, setVerifiedCount] = useState(48);
  const [attendeeIndex, setAttendeeIndex] = useState(2);

  // Live countdown and token rotation simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setTokenSeed((s) => s + 7);
          setVerifiedCount((c) => Math.min(c + 1, 62));
          setAttendeeIndex((i) => (i + 1) % SIMULATED_ATTENDEES.length);
          return 10;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground font-body">
      <Navbar />

      {/* Hero Section — Modern-Minimal Two-Column with Live Functional Simulation */}
      <section className="relative mx-auto max-w-6xl px-4 pt-32 pb-20 sm:px-6 lg:pt-36 lg:pb-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Direct Value Proposition */}
          <div className="space-y-8 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-mono text-muted">
              <span className="flex size-2 rounded-full bg-accent animate-pulse" />
              <span>Anti-Proxy QR Attendance System</span>
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.08]">
                Attendance at the speed of light.{" "}
                <span className="text-accent underline decoration-accent/40 decoration-wavy underline-offset-8">
                  Zero proxies.
                </span>
              </h1>
              <p className="max-w-xl text-base sm:text-lg text-muted leading-relaxed">
                Project a dynamic, self-rotating QR code on your classroom screen.
                Students scan directly from their mobile browser, submit their roll number,
                and log presence in under three seconds.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <Link
                href={ROUTES.dashboard}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-semibold text-background shadow-sm transition-all hover:bg-accent hover:text-accent-foreground active:scale-95"
              >
                <span>Launch Attendance Session</span>
                <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="#how_it_works"
                className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-medium text-foreground transition-all hover:bg-surface-secondary active:scale-95"
              >
                See How It Works
              </Link>
            </div>

            {/* Signal Metrics */}
            <div className="grid grid-cols-3 gap-4 border-t border-border pt-6 text-xs">
              <div>
                <p className="font-mono text-lg font-bold text-foreground sm:text-xl">
                  &lt; 3 sec
                </p>
                <p className="text-muted">Per student scan</p>
              </div>
              <div>
                <p className="font-mono text-lg font-bold text-foreground sm:text-xl">
                  100%
                </p>
                <p className="text-muted">Browser-only checkin</p>
              </div>
              <div>
                <p className="font-mono text-lg font-bold text-foreground sm:text-xl">
                  0 proxies
                </p>
                <p className="text-muted">Expiring cryptotokens</p>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Simulator Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-border bg-surface p-5 shadow-xl transition-all">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-border/80 pb-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-success animate-pulse" />
                    <span className="text-xs font-semibold text-foreground">
                      CS-302 • Algorithms
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-muted">Room 402 • Lecture Hall</p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-border bg-surface-secondary px-2.5 py-1 text-[11px] font-mono text-muted">
                  <UsersIcon className="size-3 text-accent" />
                  <span>{verifiedCount} / 62 marked</span>
                </div>
              </div>

              {/* QR Matrix & Scanner Visual Simulation */}
              <div className="my-5 flex flex-col items-center justify-center rounded-xl border border-border/70 bg-surface-secondary/50 p-6 text-center">
                <div className="relative flex size-44 items-center justify-center rounded-xl bg-white p-3 shadow-inner">
                  {/* Stylized QR Code with SVG */}
                  <svg
                    className="size-full text-zinc-900 transition-opacity duration-300"
                    viewBox="0 0 100 100"
                    fill="currentColor"
                  >
                    {/* Corner Position Detection Patterns */}
                    <rect x="5" y="5" width="26" height="26" rx="3" fill="#09090b" />
                    <rect x="9" y="9" width="18" height="18" rx="1.5" fill="#ffffff" />
                    <rect x="13" y="13" width="10" height="10" fill="#09090b" />

                    <rect x="69" y="5" width="26" height="26" rx="3" fill="#09090b" />
                    <rect x="73" y="9" width="18" height="18" rx="1.5" fill="#ffffff" />
                    <rect x="77" y="13" width="10" height="10" fill="#09090b" />

                    <rect x="5" y="69" width="26" height="26" rx="3" fill="#09090b" />
                    <rect x="9" y="73" width="18" height="18" rx="1.5" fill="#ffffff" />
                    <rect x="13" y="77" width="10" height="10" fill="#09090b" />

                    {/* Dynamic QR Bits changing with tokenSeed */}
                    <rect x="36" y="8" width="6" height="6" />
                    <rect x="46" y="8" width="6" height="6" />
                    <rect x="56" y="8" width="6" height="6" />
                    <rect x="36" y="18" width="6" height="6" />
                    <rect x="46" y="18" width="6" height="6" />
                    <rect x="56" y="18" width="6" height="6" />

                    <rect x="36" y="36" width="6" height="6" fill={tokenSeed % 2 === 0 ? "#2563eb" : "#09090b"} />
                    <rect x="46" y="36" width="6" height="6" fill={tokenSeed % 3 === 0 ? "#2563eb" : "#09090b"} />
                    <rect x="56" y="36" width="6" height="6" />
                    <rect x="66" y="36" width="6" height="6" />
                    <rect x="76" y="36" width="6" height="6" fill={tokenSeed % 5 === 0 ? "#2563eb" : "#09090b"} />

                    <rect x="8" y="36" width="6" height="6" />
                    <rect x="18" y="36" width="6" height="6" />
                    <rect x="8" y="46" width="6" height="6" />
                    <rect x="18" y="46" width="6" height="6" />

                    <rect x="36" y="46" width="26" height="26" rx="2" fill="#2563eb" opacity="0.12" />
                    <rect x="44" y="54" width="10" height="10" rx="1" fill="#2563eb" />

                    <rect x="66" y="46" width="6" height="6" />
                    <rect x="76" y="46" width="6" height="6" />
                    <rect x="86" y="46" width="6" height="6" />

                    <rect x="36" y="66" width="6" height="6" />
                    <rect x="46" y="66" width="6" height="6" />
                    <rect x="56" y="66" width="6" height="6" />
                    <rect x="66" y="66" width="6" height="6" />
                    <rect x="76" y="66" width="6" height="6" />
                    <rect x="86" y="66" width="6" height="6" />

                    <rect x="36" y="76" width="6" height="6" />
                    <rect x="46" y="76" width="6" height="6" />
                    <rect x="56" y="76" width="6" height="6" />
                    <rect x="66" y="76" width="6" height="6" />
                    <rect x="76" y="76" width="6" height="6" />
                    <rect x="86" y="76" width="6" height="6" />
                  </svg>

                  {/* Laser scan line overlay */}
                  <motion.div
                    className="absolute inset-x-2 h-0.5 bg-accent shadow-[0_0_8px_var(--color-accent)]"
                    animate={{ top: ["10%", "88%", "10%"] }}
                    transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                  />
                </div>

                {/* Countdown & rotation indicator */}
                <div className="mt-4 flex items-center justify-between w-full max-w-[200px] text-xs font-mono text-muted">
                  <div className="flex items-center gap-1.5">
                    <RefreshCwIcon className="size-3 text-accent animate-spin" style={{ animationDuration: "6s" }} />
                    <span>Token: #{tokenSeed}</span>
                  </div>
                  <span className="font-semibold text-foreground">
                    0{countdown}s
                  </span>
                </div>
              </div>

              {/* Live Attendee Stream Ticker */}
              <div className="space-y-2 border-t border-border/80 pt-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-muted">
                  <span className="uppercase tracking-wider">Live Scan Feed</span>
                  <span className="text-success font-semibold">● Streaming</span>
                </div>

                <div className="space-y-1.5">
                  <AnimatePresence mode="popLayout">
                    {SIMULATED_ATTENDEES.slice(0, 3).map((student, i) => (
                      <motion.div
                        key={`${student.roll}-${tokenSeed + i}`}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-center justify-between rounded-lg border border-border/60 bg-surface-secondary/40 px-3 py-1.5 text-xs"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2Icon className="size-3.5 text-success" />
                          <span className="font-medium text-foreground">{student.name}</span>
                          <span className="font-mono text-[10px] text-muted">({student.roll})</span>
                        </div>
                        <span className="font-mono text-[10px] text-muted">{student.time}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Flow Section: 3 Clear Steps */}
      <section id="how_it_works" className="border-t border-border bg-surface-secondary/30 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-xl space-y-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              How It Works
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Built for speed in real classroom environments.
            </h2>
            <p className="text-sm text-muted leading-relaxed">
              Eliminate ten minutes of chaotic roll-calls. Run the entire attendance check in 60 seconds without installing any native app.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Step 1 */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:border-accent/40">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-accent">01</span>
                  <div className="flex size-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <LaptopIcon className="size-4" />
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Teacher launches session
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Select your course and lecture. A dedicated attendance room opens with a large high-contrast QR display ready for the projector.
                </p>
              </div>
              <div className="mt-6 border-t border-border/80 pt-3 font-mono text-[11px] text-muted">
                1-click instant session
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:border-accent/40">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-accent">02</span>
                  <div className="flex size-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <RefreshCwIcon className="size-4" />
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Cryptographic QR rotates
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  The QR code automatically regenerates every few seconds with short-lived tokens. Anyone attempting to photograph and share it finds it expired instantly.
                </p>
              </div>
              <div className="mt-6 border-t border-border/80 pt-3 font-mono text-[11px] text-muted">
                Rotating dynamic auth tokens
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col justify-between rounded-2xl border border-border bg-surface p-6 shadow-sm transition-all hover:border-accent/40">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-accent">03</span>
                  <div className="flex size-9 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <SmartphoneIcon className="size-4" />
                  </div>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">
                  Students scan & verify
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Opening camera scans directly to a lightweight mobile web form. Students enter their roll number and name once, logging present in real time.
                </p>
              </div>
              <div className="mt-6 border-t border-border/80 pt-3 font-mono text-[11px] text-muted">
                Zero app install required
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anti-Proxy Security Deep-Dive Section */}
      <section id="anti-proxy" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="rounded-3xl border border-border bg-surface p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-6">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-secondary px-3 py-1 text-xs font-mono text-accent">
                <LockIcon className="size-3" />
                <span>Anti-Proxy Security Engine</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Why static QR codes fail, and how Attend fixes it.
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                Most QR attendance tools generate a single static image. Students snap a photo, send it into a WhatsApp group, and absent peers mark attendance from dorms.
              </p>
              <p className="text-sm text-muted leading-relaxed">
                Attend solves this with rotating short-lived cryptographic tokens. By the time a screenshot is taken, uploaded, and scanned by someone else, the token has already expired on the server.
              </p>
            </div>

            <div className="space-y-4 lg:col-span-6">
              {/* Static QR Flaw Box */}
              <div className="rounded-xl border border-danger/30 bg-danger/5 p-4 text-xs">
                <div className="flex items-center gap-2 font-semibold text-danger mb-1.5">
                  <XCircleIcon className="size-4" />
                  <span>The Static QR Flaw (Other Apps)</span>
                </div>
                <p className="text-muted leading-relaxed">
                  One static QR code for the entire 60 minutes. Proxies share screenshots freely across campus group chats.
                </p>
              </div>

              {/* Attend Dynamic System Box */}
              <div className="rounded-xl border border-success/30 bg-success/5 p-4 text-xs">
                <div className="flex items-center gap-2 font-semibold text-success mb-1.5">
                  <CheckCircle2Icon className="size-4" />
                  <span>The Attend Rotating Token Architecture</span>
                </div>
                <p className="text-muted leading-relaxed">
                  Codes refresh dynamically with a configurable expiration window. Only students physically looking at the classroom projection screen can scan in time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Classroom Features Matrix */}
      <section id="features" className="border-t border-border bg-surface-secondary/20 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-accent">
              Core Capabilities
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Everything instructors need to run orderly classes.
            </h2>
            <p className="text-sm text-muted">
              Designed around the exact workflow of university professors and educators.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <ShieldCheckIcon className="size-5" />
              </div>
              <h3 className="font-display font-semibold text-foreground">Zero Proxy Cheating</h3>
              <p className="text-xs text-muted leading-relaxed">
                Ephemerally signed QR payloads make forwarded screenshots instantly obsolete.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <RadioIcon className="size-5" />
              </div>
              <h3 className="font-display font-semibold text-foreground">Live Telemetry</h3>
              <p className="text-xs text-muted leading-relaxed">
                Watch student names, roll numbers, and timestamps appear live as each scan happens.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <FileSpreadsheetIcon className="size-5" />
              </div>
              <h3 className="font-display font-semibold text-foreground">Instant CSV Export</h3>
              <p className="text-xs text-muted leading-relaxed">
                Download structured spreadsheets formatted with date, session name, and roll numbers in one click.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm space-y-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <SmartphoneIcon className="size-5" />
              </div>
              <h3 className="font-display font-semibold text-foreground">Pure Browser Web</h3>
              <p className="text-xs text-muted leading-relaxed">
                Works on Safari, Chrome, Edge, and iOS/Android without requiring any app store downloads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Launch CTA Section */}
      <section className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6">
        <div className="rounded-3xl border border-border bg-surface p-10 sm:p-16 shadow-sm space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-secondary px-3 py-1 text-xs font-mono text-muted">
            <ClockIcon className="size-3.5 text-accent" />
            <span>Ready in under 60 seconds</span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-foreground max-w-2xl mx-auto leading-tight">
            Stop losing 10 minutes of every class to paper sheets.
          </h2>

          <p className="text-sm sm:text-base text-muted max-w-md mx-auto leading-relaxed">
            Create an instructor account, add your courses, and project your first dynamic QR code today.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href={ROUTES.signin}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-3.5 text-sm font-semibold text-background shadow-sm transition-all hover:bg-accent hover:text-accent-foreground active:scale-95"
            >
              <span>Get Started as Teacher</span>
              <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              href={ROUTES.dashboard}
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-medium text-foreground transition-all hover:bg-surface-secondary active:scale-95"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
