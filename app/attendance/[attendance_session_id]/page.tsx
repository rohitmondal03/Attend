import { Chip, Card } from "@heroui/react";
import { QrCodeIcon, ClockIcon } from "lucide-react";
import { AttendanceQrCode } from "./_components/attendance-qr-code";
import { MarkedStudent } from "./_components/marked-student-table";

export default async function AttendancePage({
  params,
}: {
  params: Promise<{
    attendance_session_id: string;
  }>;
}) {
  const { attendance_session_id: sessionId } = await params;

  return (
    <div className="flex items-center justify-center h-[calc(100vh-15rem)]">
      <div className="grid grid-cols-2 gap-12 w-full max-w-6xl">
        {/* Left – QR Code Section */}
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-3">
            <Chip color="success" size="lg" className="font-semibold border border-accent-foreground">
              <span className="inline-block size-2 rounded-full bg-current mr-1 animate-pulse" />
              Live
            </Chip>
            <span className="text-sm text-muted font-medium">
              Session ID:{" "}
              <span className="font-mono text-foreground">
                {sessionId.slice(0, 8)}...
              </span>
            </span>
          </div>

          <Card className="p-8 flex flex-col items-center justify-center gap-6 w-full">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-accent/40">
                <QrCodeIcon className="text-primary size-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Scan to Mark Attendance</h2>
                <p className="text-sm text-muted">
                  Ask students to scan this QR code
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-lg border border-accent">
              <AttendanceQrCode sessionId={sessionId} />
            </div>

            <div className="flex items-center gap-2 text-sm text-muted">
              <ClockIcon className="size-4" />
              <span>
                Session started at{" "}
                <span className="font-semibold text-foreground">2:30 PM</span>
              </span>
            </div>
          </Card>
        </div>

        {/* Right – Marked Students Table */}
        <MarkedStudent />
      </div>
    </div>
  );
}
