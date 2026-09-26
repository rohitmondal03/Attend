"use server";

import crypto from "crypto";
import prisma from "@/lib/prisma";
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

  await prisma.attendanceSession.create({
    data: {
      courseId,
      classLocation,
      classEndTime,
      classStartTime,
      teacherId: currentUser.id,
      qrSecret,
    },
  });
};
