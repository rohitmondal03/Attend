import { z } from "zod";

export const formatZodError = (error: z.ZodError): string => {
  return error.issues
    .map((issue) => {
      const field = issue.path.join(".");
      return field ? `${field}: ${issue.message}` : issue.message;
    })
    .join(", ");
};

export const validateInput = <S extends z.ZodType>(
  schema: S,
  data: unknown,
): z.output<S> => {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(formatZodError(result.error));
  }
  return result.data;
};

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const signupSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must be at most 50 characters long"),
});

export const createAttendanceSchema = z
  .object({
    classStartTime: z.coerce.date({ message: "Start time is required" }),
    classEndTime: z.coerce.date({ message: "End time is required" }),
    classLocation: z.string().trim().min(1, "Class location is required"),
    courseId: z.uuid("Course is required"),
  })
  .refine((data) => data.classEndTime > data.classStartTime, {
    message: "Class end time must be after start time",
    path: ["classEndTime"],
  });

export const addNewCourseSchema = z.object({
  courseName: z
    .string()
    .trim()
    .min(2, "Course name must be at least 2 characters long")
    .max(50, "Course name must be at most 50 characters long"),
  program: z
    .string()
    .trim()
    .min(2, "Program must be at least 2 characters long")
    .max(50, "Program must be at most 50 characters long"),
  semester: z.union([
    z
      .number({ message: "Semester is required" })
      .int("Semester must be an integer")
      .min(1, "Semester must be at least 1"),
    z
      .string({ message: "Semester is required" })
      .refine((val) => !isNaN(parseInt(val, 10)) && parseInt(val, 10) >= 1, {
        message: "Semester must be at least 1",
      })
      .transform((val) => parseInt(val, 10)),
  ]),
});

export const endAttendanceSessionSchema = z.object({
  attendanceSessionId: z.uuid("Attendance session ID is required"),
});

export const attendanceSessionParamSchema = z.object({
  id: z.uuid("Invalid attendance session ID"),
});

export type LoginInput = z.input<typeof loginSchema>;
export type SignupInput = z.input<typeof signupSchema>;
export type CreateAttendanceInput = z.input<typeof createAttendanceSchema>;
export type AddNewCourseInput = z.input<typeof addNewCourseSchema>;
export type EndAttendanceSessionInput = z.input<
  typeof endAttendanceSessionSchema
>;
export type AttendanceSessionParam = z.input<
  typeof attendanceSessionParamSchema
>;
