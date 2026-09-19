"use client";

import { useRef } from "react";
import Link from "next/link";
import { buttonVariants, Card, cn } from "@heroui/react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import {
  CrossIcon,
  RefreshCcwIcon,
  ScanQrCodeIcon,
  LogInIcon,
  ShieldCheckIcon,
  RadioIcon,
  FileSpreadsheetIcon,
  SmartphoneIcon,
} from "lucide-react";
import { Navbar } from "@/components/shared/navbar";

const WORKING_DETAILS = [
  {
    title: "Create a session",
    desc: "Pick the subject, class, and time window. A unique QR code generates instantly, ready to project on screen.",
    icon: CrossIcon,
  },
  {
    title: "QR refreshes automatically",
    desc: " The code rotates every few seconds, so a screenshot shared after class is already useless. No proxies, no shortcuts.",
    icon: RefreshCcwIcon,
  },
  {
    title: "Students scan and confirm",
    desc: "A quick scan opens a simple form — roll number and name. Submit, and you're marked present. That's it.",
    icon: ScanQrCodeIcon,
  },
];

const FEATURES = [
  {
    title: "Zero proxy attendance",
    desc: "The QR code rotates every few seconds. A screenshot shared in a group chat is stale before anyone can use it.",
    icon: ShieldCheckIcon,
    tag: "Anti-Proxy",
  },
  {
    title: "Live attendance tracking",
    desc: "Watch names appear in real time as students scan — no waiting until after class to know who showed up.",
    icon: RadioIcon,
    tag: "Real-Time",
  },
  {
    title: "One-click export",
    desc: "Every session's attendance is ready to download as a CSV — no manual transcription, no lost registers.",
    icon: FileSpreadsheetIcon,
    tag: "CSV Export",
  },
  {
    title: "Nothing to install",
    desc: "Students just scan and go. No app, no signup, no friction — the whole thing runs in a browser.",
    icon: SmartphoneIcon,
    tag: "Browser Only",
  },
];

interface FeatureCardProps {
  feat: (typeof FEATURES)[number];
  idx: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  className?: string;
}

function FeatureCard({
  feat,
  idx,
  total,
  scrollYProgress,
  className,
}: FeatureCardProps) {
  const targetScale = 1 - (total - 1 - idx) * 0.04;
  const range: [number, number] = [idx / total, 1];
  const scale = useTransform(scrollYProgress, range, [1, targetScale]);

  return (
    <div
      className="sticky"
      style={{
        top: `calc(7rem + ${idx * 28}px)`,
        zIndex: idx + 1,
      }}
    >
      <motion.div
        style={{ scale }}
        className="w-full max-w-2xl mx-auto origin-top"
      >
        <Card
          className={cn(
            "h-64 sm:h-72 w-full p-8 border-2 border-border bg-surface shadow-2xl rounded-3xl flex flex-col justify-between",
            className,
          )}
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-accent/15 border border-accent/20">
                  <feat.icon className="size-6 text-accent" />
                </div>
                <span className="text-xs font-mono font-bold text-muted border border-border/80 px-2.5 py-1 rounded-full bg-default/40">
                  0{idx + 1} / 0{total}
                </span>
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent border border-accent bg-accent/5 px-3 py-1 rounded-full">
                {feat.tag}
              </span>
            </div>
            <Card.Title className="text-2xl sm:text-3xl font-bold mb-2">
              {feat.title}
            </Card.Title>
            <Card.Description className="text-base text-muted leading-relaxed">
              {feat.desc}
            </Card.Description>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

export default function HomePage() {
  const featuresContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: featuresProgress } = useScroll({
    target: featuresContainerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="space-y-48 lg:px-12">
      <Navbar />

      {/* Hero section */}
      <section className="flex flex-col items-center justify-center my-48 space-y-10 text-center">
        <motion.h1
          className="font_changaone flex items-center justify-center text-6xl w-full"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Attendance, <br /> without the chaos.
        </motion.h1>
        <motion.div
          className="text-xl w-1/2 mx-auto space-y-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="font-semibold text-2xl">
            Generate a QR, project it, done !
          </p>
          <p className="text-lg">
            Students scan, mark themselves present, and you get a live list — no
            roll call, no proxy attendance, no paperwork.
          </p>
        </motion.div>
        <motion.div
          className="flex items-center justify-center gap-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Link
            href={"/login"}
            className={buttonVariants({
              size: "lg",
              variant: "primary",
              className: "font-bold text-lg",
            })}
          >
            <LogInIcon className="size-5 mr-2" />
            Login as Teacher
          </Link>
        </motion.div>
      </section>

      {/* How it works section */}
      <section className="space-y-12">
        <motion.h1
          className="text-4xl text-center font-bold text-accent bg-accent-foreground w-fit mx-auto px-3 py-1 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          How it works ?
        </motion.h1>

        <motion.div className="grid grid-cols-3 gap-6">
          {WORKING_DETAILS.map((detail, idx) => (
            <motion.div
              key={idx}
              initial={{ y: -10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ ease: "easeIn", delay: idx * 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 size-full">
                <detail.icon className="size-6 mb-3" />
                <Card.Header className="space-y-1">
                  <Card.Title className="text-lg font-semibold">
                    {idx + 1}. {detail.title}
                  </Card.Title>
                  <Card.Description className="text-sm">
                    {detail.desc}
                  </Card.Description>
                </Card.Header>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features section */}
      <section id="features" className="space-y-16">
        <div className="space-y-4">
          <motion.h2
            className="text-center text-5xl font_changaone"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Built for real classrooms
          </motion.h2>
          <motion.p
            className="text-center font-medium text-lg max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Not just a QR generator — <br /> a system designed to actually stop
            cheating.
          </motion.p>
        </div>
        <div ref={featuresContainerRef} className="relative">
          {FEATURES.map((feat, idx) => (
            <FeatureCard
              key={idx}
              feat={feat}
              idx={idx}
              total={FEATURES.length}
              scrollYProgress={featuresProgress}
              className={cn(idx !== 0 ? "mt-10" : "")}
            />
          ))}
        </div>
      </section>

      {/* Final CTA section */}
      <section className="flex flex-col items-center justify-center gap-8 w-full">
        <div className="space-y-4">
          <h1 className="text-center font_changaone text-4xl">
            Ready to stop chasing attendance sheets?
          </h1>
          <p className="text-center text-xl">
            Set up your first session in under a minute — no installs, no
            training needed.
          </p>
        </div>
        <Link
          href={"/login"}
          className={buttonVariants({
            size: "lg",
            variant: "primary",
            className: "font-bold text-lg",
          })}
        >
          <LogInIcon className="size-5 mr-2" />
          Get Started
        </Link>
      </section>
    </div>
  );
}
