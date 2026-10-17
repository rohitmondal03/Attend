import Link from "next/link";
import { Separator, buttonVariants } from "@heroui/react";
import { MoveDownIcon } from "lucide-react";
import { getCurrentUser } from "@/actions/user";
import { getUserAttendanceSessionsAction } from "@/actions/attendance";
import { DashboardCourseButton } from "./_components/dashboard-course-button";
import { DashboardAttendanceSessionTable } from "./_components/dashboard-attendance-session-table";
import { RecentSessionsCard } from "./_components/recent-sessions-card";
import { WeeklySessionsCard } from "./_components/weekly-sessions-card";
import { MonthlySessionsCard } from "./_components/monthly-sessions-card";
import { TotalSessionsCard } from "./_components/total-sessions-card";

export default async function DashboardPage() {
  const userData = await getCurrentUser();

  // get user's attendance sessions, in descending order of 'createdAt'
  const attendanceSessions = await getUserAttendanceSessionsAction();

  const latestSession = attendanceSessions[0];

  const currentMonthSessions = attendanceSessions.filter((session) => {
    return (
      session.createdAt.getMonth() === new Date().getMonth() &&
      session.createdAt.getFullYear() === new Date().getFullYear()
    );
  });

  const currentWeekSessions = attendanceSessions.filter((session) => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(
      start.getDate() - (start.getDay() === 0 ? 6 : start.getDay() - 1),
    );

    const end = new Date();
    end.setHours(23, 59, 59, 999);
    end.setDate(start.getDate() + 6);

    return session.createdAt >= start && session.createdAt <= end;
  });

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          <span className="text-black/60">Welcome to your Dashboard,</span>{" "}
          {userData.name}
        </h1>
        <div className="flex items-center justify-center gap-6 text-lg">
          <Link
            href={"#sessions"}
            className={buttonVariants({
              variant: "primary",
              className: "font-semibold",
            })}
          >
            <MoveDownIcon />
            Attendance Sessions
          </Link>
          <DashboardCourseButton />
        </div>
      </div>

      {/* Overview Cards */}
      <section className="grid grid-cols-4 gap-4">
        <TotalSessionsCard
          totalAttendanceSessions={attendanceSessions.length}
        />
        <MonthlySessionsCard
          currentMonthSessions={currentMonthSessions.length}
        />
        <WeeklySessionsCard currentWeekSessions={currentWeekSessions.length} />
        <RecentSessionsCard latestSession={latestSession} />
      </section>

      <Separator orientation="horizontal" className="bg-accent-foreground" />

      {/* Attendance Session Table */}
      <section className="space-y-6" id="sessions">
        <h1
          className={`text-2xl font-bold ${
            attendanceSessions.length === 0 && "text-center text-danger"
          }`}
        >
          {attendanceSessions.length > 0
            ? "Your Overall Attendance Sessions"
            : "No Attendance Sessions Found"}
        </h1>

        {attendanceSessions.length > 0 && (
          <DashboardAttendanceSessionTable
            attendanceSessions={attendanceSessions}
          />
        )}
      </section>
    </div>
  );
}
