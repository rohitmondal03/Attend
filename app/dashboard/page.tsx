import Link from "next/link";
import { Chip, Card, Separator, buttonVariants } from "@heroui/react";
import {
  LayersIcon,
  CalendarIcon,
  ClockIcon,
  BookOpenIcon,
  EyeIcon,
  MoveDownIcon,
} from "lucide-react";
import { formatDate } from "date-fns";
import { ROUTES } from "@/lib/routes";
import { getCurrentUser } from "@/actions/user";
import { getUserAttendanceSessionsAction } from "@/actions/attendance";
import { DashboardCourseButton } from "./_components/dashboard-course-button";
import { DashboardAttendanceSessionTable } from "./_components/dashboard-attendance-session-table";

export default async function DashboardPage() {
  const userData = await getCurrentUser();

  // get user's attendance sessions, in desccendeding order of 'createdAt'
  const attendanceSessions = await getUserAttendanceSessionsAction();

  const latestSession = attendanceSessions[0];

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          <span className="text-black/60">Welcome to your Dashboard,</span>{" "}
          {userData.name}
        </h1>
        <div className="flex items-center justify-center gap-4 text-lg">
          <Link
            href={ROUTES.dashboard + "#sessions"}
            className={buttonVariants({
              variant: "primary",
              className: "font-bold",
            })}
          >
            <MoveDownIcon />
            Attendances Sessions
          </Link>
          <DashboardCourseButton />
        </div>
      </div>

      {/* Overview Cards */}
      <section className="grid grid-cols-4 gap-4">
        {/* Card 1 – Total Sessions */}
        <Card className="flex h-full flex-col justify-between">
          <Card.Header>
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-accent/40">
              <LayersIcon className="text-primary size-5" aria-hidden="true" />
            </div>
            <Card.Title className="text-base font-semibold">
              Total Sessions
            </Card.Title>
            <Card.Description>
              All attendance sessions you&apos;ve ever created.
            </Card.Description>
          </Card.Header>
          <Card.Footer className="flex w-full items-center justify-between border-t pt-3">
            <span className="text-primary text-3xl font-bold">45</span>
            <Chip color="success" className="font-semibold">
              ↑ All Time
            </Chip>
          </Card.Footer>
        </Card>

        {/* Card 2 – This Month's Sessions */}
        <Card className="flex h-full flex-col justify-between">
          <Card.Header>
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-accent/40">
              <CalendarIcon
                className="text-primary size-5"
                aria-hidden="true"
              />
            </div>
            <Card.Title className="text-base font-semibold">
              Sessions This Month
            </Card.Title>
            <Card.Description>
              Attendance sessions held in the current calendar month.
            </Card.Description>
          </Card.Header>
          <Card.Footer className="flex w-full items-center justify-between border-t pt-3">
            <span className="text-primary text-3xl font-bold">10</span>
            <Chip color="danger" className="font-semibold">
              ↑ This Month
            </Chip>
          </Card.Footer>
        </Card>

        {/* Card 3 – This Week's Sessions */}
        <Card className="flex h-full flex-col justify-between">
          <Card.Header>
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-accent/40">
              <ClockIcon className="text-primary size-5" aria-hidden="true" />
            </div>
            <Card.Title className="text-base font-semibold">
              Sessions This Week
            </Card.Title>
            <Card.Description>
              Sessions conducted since the start of this week.
            </Card.Description>
          </Card.Header>
          <Card.Footer className="flex w-full items-center justify-between border-t pt-3">
            <span className="text-primary text-3xl font-bold">3</span>
            <Chip color="danger" className="font-semibold">
              ↑ This Week
            </Chip>
          </Card.Footer>
        </Card>

        {/* Card 4 – Most Recent Session */}
        <Card className="flex flex-col justify-between">
          <Card.Header>
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-accent/40">
              <BookOpenIcon
                className="text-primary size-5"
                aria-hidden="true"
              />
            </div>
            <Card.Title className="text-base font-semibold">
              Most Recent Session
            </Card.Title>
            <Card.Description>
              The last session you ran — jump back in quickly.
            </Card.Description>
          </Card.Header>
          <Card.Footer>
            <Link
              aria-label="View most recent session: Maths, B.Tech 3rd Sem"
              href="/dashboard"
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors bg-accent/30 hover:bg-accent/50"
            >
              <span>
                {latestSession.course.courseName} —{" "}
                {formatDate(latestSession.classStartTime, "MMMM dd'th', yyyy")}
              </span>
              <EyeIcon className="text-primary size-4 shrink-0" />
            </Link>
          </Card.Footer>
        </Card>
      </section>

      <Separator orientation="horizontal" className="bg-accent-foreground" />

      {/* Attendance Session Table */}
      <section className="space-y-6" id="sessions">
        <h1 className="text-2xl font-bold">Your Overall Attendance Sessions</h1>

        <DashboardAttendanceSessionTable
          attendanceSessions={attendanceSessions}
        />
      </section>
    </div>
  );
}
