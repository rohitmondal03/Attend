"use server";

import { revalidatePath } from "next/cache";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { ATTENDANCE_SESSION_STATUS } from "@/prisma/generated/prisma/enums";
import { ROUTES } from "@/lib/routes";
import { getCurrentUser } from "./user";

export const createNewAttendanceSessionAction = async ({
  classEndTime,
  classLocation,
  classStartTime,
  courseId,
}: {
  courseId: string;
  classLocation: string;
  classStartTime: Date;
  classEndTime: Date;
}) => {
  const currentUser = await getCurrentUser();

  const qrSecret = crypto.randomBytes(32).toString("hex");

  const { id: attendanceSessionId } = await prisma.attendanceSession.create({
    data: {
      courseId,
      classLocation,
      classEndTime,
      classStartTime,
      teacherId: currentUser.id,
      qrSecret,
    },
  });

  return attendanceSessionId;
};

export const getUserAttendanceSessionsAction = async () => {
  const currentUser = await getCurrentUser();

  const attendanceSessions = await prisma.attendanceSession.findMany({
    where: {
      teacherId: currentUser.id,
    },
    include: {
      course: {
        select: {
          courseName: true,
          program: true,
          semester: true,
        },
      },
      _count: {
        select: {
          attendanceRecord: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return attendanceSessions;
};

export const endAttendanceSessionStatusAction = async ({
  attendanceSessionId,
}: {
  attendanceSessionId: string;
}) => {
  await prisma.attendanceSession.update({
    where: {
      id: attendanceSessionId,
    },
    data: {
      status: ATTENDANCE_SESSION_STATUS.UNACTIVE,
    },
  });

  revalidatePath(ROUTES.dashboard);
};
