"use server";

export const addNewCourseAction = async ({
  courseName,
  program,
  semester,
}: {
  courseName: string;
  program: string;
  semester: number;
}) => {
  console.log(courseName, program, semester);
};
