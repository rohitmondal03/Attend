/*
  Warnings:

  - A unique constraint covering the columns `[attendanceSessionId,rollNumber]` on the table `attendance_record` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "attendance_record" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "attendance_session" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "course" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- CreateIndex
CREATE UNIQUE INDEX "attendance_record_attendanceSessionId_rollNumber_key" ON "attendance_record"("attendanceSessionId", "rollNumber");
