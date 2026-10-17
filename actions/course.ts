"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "./user";
import { ERROR_MESSAGE } from "@/lib/error";

export const addNewCourseAction = async ({
  courseName,
  program,
  semester,
}: {
  courseName: string;
  program: string;
  semester: number;
}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error(ERROR_MESSAGE.userNotPresent);
  }

  await prisma.course.create({
    data: {
      courseName,
      program,
      semester,
      teacherId: currentUser.id,
    },
  });
};

export const getUsersCoursesAction = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error(ERROR_MESSAGE.userNotPresent);
  }

  const courses = await prisma.course.findMany({
    where: {
      teacherId: currentUser.id,
    },
  });

  return courses;
};
