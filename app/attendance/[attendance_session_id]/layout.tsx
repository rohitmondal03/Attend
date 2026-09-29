import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { getCurrentUser } from "@/actions/user";
import prisma from "@/lib/prisma";
import { ROUTES } from "@/lib/routes";

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

  return <main>{children}</main>;
}
