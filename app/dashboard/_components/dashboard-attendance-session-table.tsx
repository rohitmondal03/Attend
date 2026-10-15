"use client";

import { startTransition } from "react";
import { useOptimistic } from "react";
import { Table, Chip, Dropdown, toast } from "@heroui/react";
import {
  DownloadIcon,
  EllipsisIcon,
  StopCircleIcon,
  EyeIcon,
} from "lucide-react";
import { formatDate } from "date-fns";
import { ATTENDANCE_SESSION_STATUS } from "@/prisma/generated/prisma/enums";
import { ROUTES } from "@/lib/routes";
import { endAttendanceSessionAction } from "@/actions/attendance";

interface DashboardAttendanceSessionTableProps {
  attendanceSessions: ({
    course: {
      courseName: string;
      program: string;
      semester: number;
    };
    _count: {
      attendanceRecord: number;
    };
  } & {
    id: string;
    status: ATTENDANCE_SESSION_STATUS;
    classEndTime: Date;
    classLocation: string;
    classStartTime: Date;
    courseId: string;
    teacherId: string;
    qrSecret: string;
    createdAt: Date;
  })[];
}

type AttendanceSession =
  DashboardAttendanceSessionTableProps["attendanceSessions"][number];

export function DashboardAttendanceSessionTable({
  attendanceSessions,
}: DashboardAttendanceSessionTableProps) {
  const [optimisticAttendanceSessions, endOptimisticAttendanceSession] =
    useOptimistic(
      attendanceSessions,
      (
        currentSessions: AttendanceSession[],
        attendanceSessionIdToEnd: string,
      ) =>
        currentSessions.map((session) => {
          if (session.id === attendanceSessionIdToEnd)
            session.status = ATTENDANCE_SESSION_STATUS.INACTIVE;

          return session;
        }),
    );

  // To end the attendance session - optimistic update
  const handleStopSession = (sessionId: string) => {
    startTransition(async () => {
      endOptimisticAttendanceSession(sessionId);

      toast.success("Attendance session stopped successfully");

      await endAttendanceSessionAction({
        attendanceSessionId: sessionId,
      });
    });
  };

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Team members" className="">
          <Table.Header>
            <Table.Column isRowHeader>Subject</Table.Column>
            <Table.Column isRowHeader>Program</Table.Column>
            <Table.Column isRowHeader>Semester</Table.Column>
            <Table.Column isRowHeader>Date</Table.Column>
            <Table.Column isRowHeader>Time</Table.Column>
            <Table.Column isRowHeader>Attendance</Table.Column>
            <Table.Column isRowHeader>Status</Table.Column>
            <Table.Column isRowHeader>Actions</Table.Column>
          </Table.Header>
          <Table.Body>
            {optimisticAttendanceSessions.map((data, idx) => (
              <Table.Row key={idx}>
                <Table.Cell>{data.course.courseName}</Table.Cell>
                <Table.Cell>{data.course.program}</Table.Cell>
                <Table.Cell>{data.course.semester}</Table.Cell>
                <Table.Cell>
                  {formatDate(data.classStartTime, "MMMM dd'th', yyyy")}
                </Table.Cell>
                <Table.Cell>{`${data.classStartTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })} - ${data.classEndTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}</Table.Cell>
                <Table.Cell>{data._count.attendanceRecord}</Table.Cell>
                <Table.Cell>
                  <Chip color={data.status === "ACTIVE" ? "success" : "danger"}>
                    {data.status === "INACTIVE" ? "ENDED" : "ACTIVE"}
                  </Chip>
                </Table.Cell>
                <Table.Cell>
                  <Dropdown>
                    <Dropdown.Trigger>
                      <EllipsisIcon />
                    </Dropdown.Trigger>
                    <Dropdown.Popover>
                      <Dropdown.Menu className="font-semibold">
                        {data.status === "ACTIVE" ? (
                          <>
                            <Dropdown.Item
                              onPress={() =>
                                window.open(
                                  ROUTES.attendance({ sessionId: data.id }),
                                  "_blank",
                                )
                              }
                            >
                              <EyeIcon className="size-4" />
                              View Session
                            </Dropdown.Item>
                            <Dropdown.Item
                              onPress={() => handleStopSession(data.id)}
                              className="text-danger"
                            >
                              <StopCircleIcon className="size-4" />
                              Stop Session
                            </Dropdown.Item>
                          </>
                        ) : (
                          <Dropdown.Item>
                            <DownloadIcon className="size-4" />
                            Download Spreadsheet
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown.Popover>
                  </Dropdown>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
