-- CreateEnum
CREATE TYPE "ATTENDANCE_SESSION_STATUS" AS ENUM ('ACTIVE', 'UNACTIVE');

-- CreateTable
CREATE TABLE "attendance_session" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "classLocation" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "classStartTime" TIMESTAMP(3) NOT NULL,
    "classEndTime" TIMESTAMP(3) NOT NULL,
    "status" "ATTENDANCE_SESSION_STATUS" NOT NULL DEFAULT 'ACTIVE',
    "qrSecret" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attendance_session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course" (
    "id" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,
    "program" TEXT NOT NULL,
    "semester" TEXT NOT NULL,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance_record" (
    "id" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "rollNumber" TEXT NOT NULL,
    "markedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attendanceSessionId" TEXT NOT NULL,

    CONSTRAINT "attendance_record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "attendance_session_teacherId_idx" ON "attendance_session"("teacherId");

-- CreateIndex
CREATE INDEX "attendance_session_courseId_idx" ON "attendance_session"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "attendance_session_qrSecret_key" ON "attendance_session"("qrSecret");

-- CreateIndex
CREATE INDEX "course_teacherId_idx" ON "course"("teacherId");

-- CreateIndex
CREATE INDEX "attendance_record_rollNumber_idx" ON "attendance_record"("rollNumber");

-- AddForeignKey
ALTER TABLE "attendance_session" ADD CONSTRAINT "attendance_session_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_session" ADD CONSTRAINT "attendance_session_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_record" ADD CONSTRAINT "attendance_record_attendanceSessionId_fkey" FOREIGN KEY ("attendanceSessionId") REFERENCES "attendance_session"("id") ON DELETE CASCADE ON UPDATE CASCADE;
