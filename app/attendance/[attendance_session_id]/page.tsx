import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { ROUTES } from "@/lib/routes";
import { MarkedStudent } from "./_components/marked-student-table";
import { InactiveSession } from "./_components/inactive-session";
import { QrCodeSection } from "./_components/qr-code-section";

export default async function AttendancePage({
  params,
}: {
  params: Promise<{
    attendance_session_id: string;
  }>;
}) {
  const { attendance_session_id: sessionId } = await params;

  const sessionData = await prisma.attendanceSession.findFirst({
    where: {
      id: sessionId,
    },
    select: {
      status: true,
    },
  });

  if (sessionData === null) redirect(ROUTES.dashboard);

  return sessionData.status === "UNACTIVE" ? (
    <InactiveSession sessionId={sessionId} />
  ) : (
    <div className="flex items-center justify-center h-[calc(100vh-15rem)]">
      <div className="grid grid-cols-2 gap-12 w-full max-w-6xl">
        <QrCodeSection sessionId={sessionId} />
        <MarkedStudent />
      </div>
    </div>
  );
}
