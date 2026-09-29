export default async function AttendancePage({
  params,
}: {
  params: Promise<{
    attendance_session_id: string;
  }>;
}) {
  const { attendance_session_id: sessionId } = await params;

  return <div>ATTENDANCE SESSION ID: {sessionId}</div>;
}
