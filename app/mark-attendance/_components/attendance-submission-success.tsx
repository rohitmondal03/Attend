import { Button, Card, Chip, Link } from "@heroui/react";
import { motion } from "motion/react";
import { CheckCircle2Icon, ClockIcon, HomeIcon } from "lucide-react";
import { ROUTES } from "@/lib/routes";

interface AttendanceSubmissionSuccessProps {
  name: string;
  rollNumber: string;
  submittedAt: string;
  token: string;
  setSubmitted: (value: boolean) => void;
}

export function AttendanceSubmissionSuccess({
  name,
  rollNumber,
  submittedAt,
  token,
  setSubmitted,
}: AttendanceSubmissionSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-lg"
    >
      <Card className="p-8 sm:p-10 flex flex-col items-center text-center gap-6 shadow-xl border border-border/80 bg-surface">
        {/* Success Checkmark Circle */}
        <div className="relative flex size-20 items-center justify-center rounded-full bg-success/15 border-2 border-success/30">
          <CheckCircle2Icon className="size-10 text-success" />
          <span className="absolute -top-1 -right-1 flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex size-3 rounded-full bg-success" />
          </span>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-center gap-2">
            <Chip color="success" size="sm" className="font-semibold text-xs">
              Verified Submission
            </Chip>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Attendance Recorded!
          </h2>
          <p className="text-sm text-muted max-w-sm mx-auto">
            Your attendance for this lecture session has been confirmed and
            logged.
          </p>
        </div>

        {/* Student Receipt Card */}
        <div className="w-full rounded-2xl bg-surface-secondary/70 border border-border p-5 text-left space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-border/60">
            <span className="text-xs font-semibold text-muted uppercase tracking-wider">
              Student Details
            </span>
            <span className="text-xs font-mono text-accent-foreground font-semibold">
              PRESENT
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-xs text-muted block">Student Name</span>
              <span className="font-semibold text-foreground">{name}</span>
            </div>
            <div>
              <span className="text-xs text-muted block">Roll Number</span>
              <span className="font-mono font-bold text-foreground">
                {rollNumber}
              </span>
            </div>
            <div className="col-span-2 pt-1 border-t border-border/40 flex items-center justify-between text-xs text-muted">
              <span className="flex items-center gap-1.5">
                <ClockIcon className="size-3.5" />
                {submittedAt}
              </span>
              <span className="font-mono text-[11px] bg-background/80 px-2 py-0.5 rounded border border-border">
                Token: {token.slice(0, 8)}...
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="w-full flex flex-col sm:flex-row items-center gap-3 pt-2">
          <Link
            href={ROUTES.home}
            className="w-full py-2.5 px-4 rounded-xl border border-border bg-background hover:bg-surface-secondary text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <HomeIcon className="size-4" />
            Back to Home
          </Link>
          <Button
            variant="tertiary"
            className="w-full text-xs font-semibold text-muted"
            onClick={() => setSubmitted(false)}
          >
            Submit another entry
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
