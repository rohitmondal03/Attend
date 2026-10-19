"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { ATTENDANCE_SESSION_STATUS } from "@/prisma/generated/prisma/enums";
import { ROUTES } from "@/lib/routes";
import { getCurrentUser } from "./user";
import { ERROR_MESSAGE } from "@/lib/error";
import { validateToken } from "@/lib/qr";

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

  if (!currentUser) {
    throw new Error(ERROR_MESSAGE.userNotPresent);
  }

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

  redirect(ROUTES.attendance({ sessionId: attendanceSessionId }));
};

export const getUserAttendanceSessionsAction = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error(ERROR_MESSAGE.userNotPresent);
  }

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

export const endAttendanceSessionAction = async ({
  attendanceSessionId,
}: {
  attendanceSessionId: string;
}) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error(ERROR_MESSAGE.userNotPresent);
  }

  const attendanceSession = await prisma.attendanceSession.findUnique({
    where: {
      id: attendanceSessionId,
    },
  });

  if (!attendanceSession) {
    throw new Error(ERROR_MESSAGE.attendanceSessionNotFound);
  }

  if (attendanceSession.teacherId !== user.id) {
    throw new Error(ERROR_MESSAGE.notAuthorize);
  }

  await prisma.attendanceSession.update({
    where: {
      id: attendanceSessionId,
    },
    data: {
      status: ATTENDANCE_SESSION_STATUS.INACTIVE,
    },
  });

  revalidatePath(ROUTES.dashboard);
};

export const markAttendanceAction = async ({
  fullName,
  rollNumber,
  token,
}: {
  fullName: string;
  rollNumber: string;
  token: string;
}) => {
  const { valid, sessionId } = await validateToken(token);

  if (!valid || !sessionId) {
    throw new Error(ERROR_MESSAGE.invalidToken);
  }

  const attendanceSession = await prisma.attendanceSession.findFirst({
    where: {
      id: sessionId,
    },
    select: {
      status: true,
    },
  });

  if (!attendanceSession) {
    throw new Error(ERROR_MESSAGE.attendanceSessionNotFound);
  }

  if (attendanceSession.status === ATTENDANCE_SESSION_STATUS.INACTIVE) {
    throw new Error(ERROR_MESSAGE.attendanceSessionInactive);
  }

  await prisma.attendanceRecord.create({
    data: {
      attendanceSessionId: sessionId,
      studentName: fullName,
      rollNumber: rollNumber,
    },
  });
};
