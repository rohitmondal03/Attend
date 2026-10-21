"use client";

import { Card, Chip, Table } from "@heroui/react";
import { UsersIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { getMarkedAttendeesAction } from "@/actions/attendance";
import { ATTENDANCE_SESSION_INTERVAL } from "@/lib/constants";

interface MarkedStudentProps {
  sessionId: string;
}

export function MarkedStudent({ sessionId }: MarkedStudentProps) {
  const {
    data: markedAttendees,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["attendance", "marked-students", sessionId],
    queryFn: async () => await getMarkedAttendeesAction({ sessionId }),
    refetchInterval: 5_000,
  });

  return (
    <div className="flex flex-col gap-4 border border-black p-4 rounded-2xl">
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
          {markedAttendees?.length ?? 0} Present
        </Chip>
      </div>

      {markedAttendees && (
        <Card className="flex-1 overflow-hidden border border-black/40">
          <Table>
            <Table.ScrollContainer className="max-h-105">
              <Table.Content aria-label="Marked students">
                <Table.Header>
                  <Table.Column isRowHeader>Student</Table.Column>
                  <Table.Column isRowHeader>Roll No.</Table.Column>
                  <Table.Column isRowHeader>Marked At</Table.Column>
                </Table.Header>
                <Table.Body>
                  {markedAttendees.length === 0 ? (
                    <Table.Row>
                      <Table.Cell>---</Table.Cell>
                      <Table.Cell>---</Table.Cell>
                      <Table.Cell>---</Table.Cell>
                    </Table.Row>
                  ) : (
                    markedAttendees.map((student, idx) => (
                      <Table.Row key={idx}>
                        <Table.Cell className="font-medium">
                          {student.studentName}
                        </Table.Cell>
                        <Table.Cell className="font-mono text-sm">
                          {student.rollNumber}
                        </Table.Cell>
                        <Table.Cell className="text-muted">
                          {formatDate(student.markedAt, "h:mm a")}
                        </Table.Cell>
                      </Table.Row>
                    ))
                  )}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </Card>
      )}
    </div>
  );
}
