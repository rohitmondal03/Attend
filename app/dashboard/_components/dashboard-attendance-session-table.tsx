"use client";

import { useRouter } from "next/navigation";
import { Table, Chip, Dropdown } from "@heroui/react";
import {
  DownloadIcon,
  EllipsisIcon,
  StopCircleIcon,
  EyeIcon,
} from "lucide-react";
import { formatDate } from "date-fns";
import { ATTENDANCE_SESSION_STATUS } from "@/prisma/generated/prisma/enums";
import { ROUTES } from "@/lib/routes";

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

export function DashboardAttendanceSessionTable({
  attendanceSessions,
}: DashboardAttendanceSessionTableProps) {
  const { push: redirect } = useRouter();

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
            {attendanceSessions.map((data, idx) => (
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
                  <Chip color="success">{data.status}</Chip>
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
                                redirect(
                                  ROUTES.attendance({ sessionId: data.id }),
                                )
                              }
                            >
                              <EyeIcon className="size-4" />
                              View Session
                            </Dropdown.Item>
                            <Dropdown.Item>
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
