import { Card, Chip, Table } from "@heroui/react";
import { UsersIcon } from "lucide-react";

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

interface MarkedStudentProps {}

export function MarkedStudent({}: MarkedStudentProps) {
  return (
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
  );
}
