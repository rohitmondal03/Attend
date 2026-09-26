"use server";

import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { ROUTES } from "@/lib/routes";
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
  // await prisma.course.create({
  //   data: {
      
  //   }
  // })

  revalidatePath(ROUTES.dashboard)
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

  return courses
};
