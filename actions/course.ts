"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "./user";

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
    throw new Error("User not found !!");
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
    throw new Error("User not found !!");
  }

  const courses = await prisma.course.findMany({
    where: {
      teacherId: currentUser.id,
    },
  });

  return courses;
};
