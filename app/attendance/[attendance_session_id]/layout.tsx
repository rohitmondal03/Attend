import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { getCurrentUser } from "@/actions/user";
import prisma from "@/lib/prisma";
import { ROUTES } from "@/lib/routes";
import { AttendanceHeader } from "./_components/attendance-header";

interface AttendancePageLayoutProps {
  children: ReactNode;
}

export default async function AttendancePageLayout({
  params,
  children,
}: {
  params: Promise<{
    attendance_session_id: string;
  }>;
} & AttendancePageLayoutProps) {
  const { attendance_session_id: attendanceSessionId } = await params;

  if (!attendanceSessionId) redirect(ROUTES.dashboard);

  const attendanceSessionData = await prisma.attendanceSession.findFirst({
    where: {
      id: attendanceSessionId,
    },
  });

  if (!attendanceSessionData) {
    redirect(ROUTES.signin);
  }

  const { id: userId } = await getCurrentUser();

  if (userId !== attendanceSessionData.teacherId) {
    redirect(ROUTES.signin);
  }

  return (
    <main>
      <AttendanceHeader />

      <div className="px-8 py-8 mt-28 overflow-hidden">{children}</div>
    </main>
  );
}
