import { Table, Chip, Card } from "@heroui/react";
import {
  QrCodeIcon,
  UsersIcon,
  ClockIcon,
} from "lucide-react";
import { AttendanceQrCode } from "./_components/attendance-qr-code";

const DEMO_MARKED_STUDENTS = [
  { name: "Aarav Sharma", rollNo: "IIT2023001", time: "2:32 PM" },
  { name: "Priya Patel", rollNo: "IIT2023015", time: "2:33 PM" },
  { name: "Rohan Gupta", rollNo: "IIT2023022", time: "2:34 PM" },
  { name: "Sneha Reddy", rollNo: "IIT2023037", time: "2:35 PM" },
  { name: "Vikram Singh", rollNo: "IIT2023041", time: "2:36 PM" },
  { name: "Ananya Iyer", rollNo: "IIT2023008", time: "2:37 PM" },
  { name: "Karthik Nair", rollNo: "IIT2023053", time: "2:38 PM" },
  { name: "Karthik Nair", rollNo: "IIT2023053", time: "2:38 PM" },
];

export default async function AttendancePage({
  params,
}: {
  params: Promise<{
    attendance_session_id: string;
  }>;
}) {
  const { attendance_session_id: sessionId } = await params;

  return (
    <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
      <div className="grid grid-cols-2 gap-12 w-full max-w-6xl">
        {/* Left – QR Code Section */}
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-3">
            <Chip color="success" className="font-semibold">
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
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-accent/40">
                <UsersIcon className="text-primary size-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Marked Students</h2>
                <p className="text-sm text-muted">
                  Students who scanned the QR code
                </p>
              </div>
            </div>
            <Chip
              color="accent"
              size="lg"
              className="font-semibold border border-accent-foreground"
            >
              {DEMO_MARKED_STUDENTS.length} Present
            </Chip>
          </div>

          <Card className="flex-1 overflow-hidden">
            <Table>
              <Table.ScrollContainer className="max-h-105">
                <Table.Content aria-label="Marked students">
                  <Table.Header>
                    <Table.Column isRowHeader>Student</Table.Column>
                    <Table.Column isRowHeader>Roll No.</Table.Column>
                    <Table.Column isRowHeader>Time</Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {DEMO_MARKED_STUDENTS.map((student, idx) => (
                      <Table.Row key={idx}>
                        <Table.Cell className="font-medium">
                          {student.name}
                        </Table.Cell>
                        <Table.Cell className="font-mono text-sm">
                          {student.rollNo}
                        </Table.Cell>
                        <Table.Cell className="text-muted">
                          {student.time}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          </Card>
        </div>
      </div>
    </div>
  );
}
