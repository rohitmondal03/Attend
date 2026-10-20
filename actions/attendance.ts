"use server";

import { revalidatePath } from "next/cache";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { ATTENDANCE_SESSION_STATUS } from "@/prisma/generated/prisma/enums";
import { ROUTES } from "@/lib/routes";
import { getCurrentUser } from "./user";
import {
  createAttendanceSchema,
  endAttendanceSessionSchema,
  validateInput,
  type CreateAttendanceInput,
  type EndAttendanceSessionInput,
} from "@/lib/zod";

export const createNewAttendanceSessionAction = async (
  input: CreateAttendanceInput,
) => {
  const { classEndTime, classLocation, classStartTime, courseId } =
    validateInput(createAttendanceSchema, input);

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

export const endAttendanceSessionAction = async (
  input: EndAttendanceSessionInput,
) => {
  const { attendanceSessionId } = validateInput(
    endAttendanceSessionSchema,
    input,
  );

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
