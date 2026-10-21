import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { ROUTES } from "@/lib/routes";
import { MarkedStudent } from "./_components/marked-student-table";
import { InactiveSession } from "./_components/inactive-session";
import { QrCodeDisplay } from "./_components/qr-code-display";

interface AttendancePageProps {
  params: Promise<{
    attendance_session_id: string;
  }>;
}

export default async function AttendancePage({ params }: AttendancePageProps) {
  const { attendance_session_id: sessionId } = await params;

  const sessionData = await prisma.attendanceSession.findFirst({
    where: {
      id: sessionId,
    },
    select: {
      status: true,
      createdAt: true,
    },
  });

  if (!sessionData) redirect(ROUTES.dashboard);

  return sessionData.status === "INACTIVE" ? (
    <div className="grid place-items-center h-screen">
      <InactiveSession sessionId={sessionId} />
    </div>
  ) : (
    <div className="grid grid-cols-2 gap-12 w-full p-10 items-start justify-center">
      <QrCodeDisplay
        sessionId={sessionId}
        sessionStartTime={sessionData.createdAt}
      />
      <MarkedStudent sessionId={sessionId} />
    </div>
  );
}
