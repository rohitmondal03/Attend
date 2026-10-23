import { MarkAttendanceHeader } from "../_components/mark-attendance-header";
import { MarkAttendanceForm } from "../_components/mark-attendance-form";

interface MarkAttendancePageProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function MarkAttendancePage({
  params,
}: MarkAttendancePageProps) {
  const { token } = await params;

  return (
    <main className="min-h-screen flex flex-col justify-between">
      {/* Top Header */}
      <MarkAttendanceHeader />

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center px-4 py-24 sm:py-28">
        <MarkAttendanceForm token={token} />
      </div>

      {/* Subtle Footer info */}
      <footer className="py-4 text-center text-xs text-muted">
        <span>Attend · Secure QR Attendance System</span>
      </footer>
    </main>
  );
}
