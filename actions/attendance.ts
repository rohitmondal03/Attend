"use server";

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

  console.log(courseId, classLocation, classStartTime, classEndTime);

  // await prisma.attendanceSession.create({
  //   data: {

  //   }
  // })
};
