import Link from "next/link";
import { Card, Chip } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import {
  CircleOffIcon,
  ArrowUpRightIcon,
  CalendarClockIcon,
} from "lucide-react";
import { ROUTES } from "@/lib/routes";

interface InactiveSessionProps {
  sessionId: string;
}

export function InactiveSession({ sessionId }: InactiveSessionProps) {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-15rem)]">
      <Card className="p-10 flex flex-col items-center justify-center gap-6 max-w-lg w-full text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-danger/10">
          <CircleOffIcon className="text-danger size-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Session Ended</h2>
          <p className="text-sm text-muted leading-relaxed">
            This attendance session is no longer active. Students can no longer
            scan the QR code to mark their attendance.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Chip
            color="danger"
            size="lg"
            className="font-semibold border border-danger/30"
          >
            Inactive
          </Chip>
          <span className="text-sm text-muted font-medium">
            Session ID:{" "}
            <span className="font-mono text-foreground">
              {sessionId.slice(0, 8)}...
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted">
          <CalendarClockIcon className="size-4" />
          <span>This session was closed by the host.</span>
        </div>

        <Link
          href={ROUTES.dashboard}
          className={buttonVariants({
            variant: "primary",
            className: "font-bold group mt-2",
          })}
        >
          Go to Dashboard
          <ArrowUpRightIcon className="size-4 rotate-0 group-hover:rotate-45 transition-all ease-in-out duration-200" />
        </Link>
      </Card>
    </div>
  );
}
