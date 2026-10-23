"use client";

import { Button, Card, Chip, Table } from "@heroui/react";
import { Loader2Icon, UsersIcon, RotateCcwIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { formatDate } from "date-fns";
import { getMarkedAttendeesAction } from "@/actions/attendance";
import { MARKED_STUDENT_POLL_INTERVAL } from "@/lib/constants";

interface MarkedStudentProps {
  sessionId: string;
}

export function MarkedStudent({ sessionId }: MarkedStudentProps) {
  const {
    data: markedAttendees,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["attendance", "marked-students", sessionId],
    queryFn: async () => await getMarkedAttendeesAction({ sessionId }),
    refetchInterval: MARKED_STUDENT_POLL_INTERVAL,
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
                  {isError && (
                    <Table.Row>
                      <Table.Cell>{null}</Table.Cell>
                      <Table.Cell>
                        <Button
                          variant="danger"
                          size="sm"
                          onPress={() => refetch()}
                        >
                          <RotateCcwIcon />
                          Retry
                        </Button>
                      </Table.Cell>
                      <Table.Cell>{null}</Table.Cell>
                    </Table.Row>
                  )}
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
                  {isFetching && (
                    <Table.Row>
                      <Table.Cell>
                        <Loader2Icon className="size-4 animate-spin" />
                      </Table.Cell>
                      <Table.Cell>
                        <Loader2Icon className="size-4 animate-spin" />
                      </Table.Cell>
                      <Table.Cell>
                        <Loader2Icon className="size-4 animate-spin" />
                      </Table.Cell>
                    </Table.Row>
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
