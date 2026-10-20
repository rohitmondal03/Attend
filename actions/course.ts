"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "./user";
import {
  addNewCourseSchema,
  validateInput,
  type AddNewCourseInput,
} from "@/lib/zod";

export const addNewCourseAction = async (input: AddNewCourseInput) => {
  const { courseName, program, semester } = validateInput(
    addNewCourseSchema,
    input,
  );

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
