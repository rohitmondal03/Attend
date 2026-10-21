import { Card, Link } from "@heroui/react";
import { BookOpenIcon, EyeIcon } from "lucide-react";
import { formatDate } from "date-fns";
import type { ATTENDANCE_SESSION_STATUS } from "@/prisma/generated/prisma/enums";
import { ROUTES } from "@/lib/routes";

interface RecentSessionsCardProps {
  latestSession: {
    course: {
      courseName: string;
      program: string;
      semester: number;
    };
    _count: {
      attendanceRecord: number;
    };
  } & {
    id: string;
    createdAt: Date;
    teacherId: string;
    classLocation: string;
    courseId: string;
    classStartTime: Date;
    classEndTime: Date;
    status: ATTENDANCE_SESSION_STATUS;
    qrSecret: string;
  };
}

export function RecentSessionsCard({ latestSession }: RecentSessionsCardProps) {
  return (
    <Card className="flex flex-col justify-between">
      <Card.Header>
        <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-accent/40">
          <BookOpenIcon className="text-primary size-5" aria-hidden="true" />
        </div>
        <Card.Title className="text-base font-semibold">
          Most Recent Session
        </Card.Title>
        <Card.Description>
          The last session you ran — jump back in quickly.
        </Card.Description>
      </Card.Header>
      <Card.Footer>
        {latestSession ? (
          <Link
            aria-label="View most recent session: Maths, B.Tech 3rd Sem"
            href={ROUTES.attendance({ sessionId: latestSession.id })}
            className="flex gap-4 w-full items-center justify-between rounded-lg px-3 py-2 transition-colors bg-accent/30 hover:bg-accent/50"
          >
            <span className="text-xs">
              {latestSession.course.courseName} on{" "}
              <span className="font-semibold">
                {formatDate(latestSession.classStartTime, "dd MMM yyyy")}
              </span>
            </span>
            <EyeIcon className="text-primary size-4 shrink-0" />
          </Link>
        ) : (
          <p className="w-full py-2 px-3 text-center text-danger bg-danger-soft rounded-xl">
            No Sessions Found
          </p>
        )}
      </Card.Footer>
    </Card>
  );
}
