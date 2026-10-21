"use client";

import { useState, type FormEvent } from "react";
import {
  Button,
  Card,
  Chip,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
} from "@heroui/react";
import {
  UserCheckIcon,
  UserIcon,
  HashIcon,
  ArrowRightIcon,
  ShieldAlertIcon,
  SparklesIcon,
  QrCodeIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { markAttendanceAction } from "@/actions/attendance";
import { AttendanceSubmissionSuccess } from "./attendance-submission-success";
import { formatDate } from "date-fns";

interface MarkAttendanceFormProps {
  token: string;
}

export function MarkAttendanceForm({ token }: MarkAttendanceFormProps) {
  const [studentsData, setStudentsData] = useState<{
    name: string;
    rollNumber: string;
  }>({
    name: "",
    rollNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);

  const markAttendance = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!studentsData.name.trim() || !studentsData.rollNumber.trim()) {
      toast("Incomplete details", {
        description: "Please fill in your name and roll number.",
        variant: "danger",
      });
      return;
    }

    setIsLoading(true);

    await markAttendanceAction({
      fullName: studentsData.name,
      rollNumber: studentsData.rollNumber,
      token,
    })
      .then(() => {
        toast.success("Attendance Marked!", {
          description: `Recorded for ${studentsData.rollNumber}.`,
        });

        setSubmitted(true);
      })
      .catch((error) => {
        toast.danger("Failed to mark attendance", {
          description: error.message,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isSubmitted) {
    return (
      <AttendanceSubmissionSuccess
        name={studentsData.name}
        rollNumber={studentsData.rollNumber}
        submittedAt={formatDate(new Date(), "HH:mm")}
        token={token}
        setSubmitted={setSubmitted}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full max-w-lg"
    >
      <Card className="p-6 sm:p-10 shadow-xl border border-border/80 bg-surface space-y-6">
        {/* Header Block */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex size-12 items-center justify-center rounded-xl bg-accent/30 text-accent-foreground">
              <UserCheckIcon className="size-6 text-foreground" />
            </div>
            <div className="flex items-center gap-2">
              <Chip
                color="accent"
                size="sm"
                className="font-mono text-xs font-medium"
              >
                <QrCodeIcon className="size-3 mr-1" />
                Token: {token.slice(0, 8)}...
              </Chip>
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Mark Your Attendance
            </h1>
            <p className="text-sm text-muted mt-1">
              Enter your student credentials below to verify and log your
              attendance.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <Form onSubmit={markAttendance} className="space-y-4">
          {/* Full Name Field */}
          <TextField isRequired name="fullName" type="text">
            <Label className="font-semibold text-sm flex items-center gap-1.5">
              <UserIcon className="size-3.5 text-muted" />
              Full Name
            </Label>
            <Input
              autoComplete="name"
              placeholder="e.g. Rohit Mondal"
              value={studentsData.name}
              onChange={(e) =>
                setStudentsData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="font-medium"
            />
            <Description className="text-xs text-muted">
              Enter your official name registered in the course.
            </Description>
            <FieldError>Please provide your full name.</FieldError>
          </TextField>

          {/* Roll Number Field */}
          <TextField isRequired name="rollNumber" type="text">
            <Label className="font-semibold text-sm flex items-center gap-1.5">
              <HashIcon className="size-3.5 text-muted" />
              Roll Number / Student ID
            </Label>
            <Input
              autoComplete="off"
              placeholder="e.g. IIT2023042"
              value={studentsData.rollNumber}
              onChange={(e) =>
                setStudentsData((prev) => ({
                  ...prev,
                  rollNumber: e.target.value.toUpperCase(),
                }))
              }
              className="font-mono font-semibold uppercase tracking-wider"
            />
            <Description className="text-xs text-muted">
              Your institute roll number or registration ID.
            </Description>
            <FieldError>Please enter your roll number.</FieldError>
          </TextField>

          {/* Student Email Field */}
          {/* <TextField name="email" type="email">
            <Label className="font-semibold text-sm flex items-center gap-1.5">
              <MailIcon className="size-3.5 text-muted" />
              Institute Email <span className="text-xs text-muted font-normal">(Optional)</span>
            </Label>
            <Input
              autoComplete="email"
              placeholder="e.g. student@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Description className="text-xs text-muted">
              Optional confirmation receipt will be mapped to this address.
            </Description>
            <FieldError>Please enter a valid email address.</FieldError>
          </TextField> */}

          {/* Security Notice */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-secondary border border-border text-xs text-muted leading-relaxed">
            <ShieldAlertIcon className="size-4 text-accent-foreground shrink-0 mt-0.5" />
            <span>
              Your timestamp and QR verification token are recorded
              automatically. Duplicate submissions with the same roll number
              will be flagged.
            </span>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full font-bold text-base py-3.5 mt-2 transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2"
            isDisabled={
              isLoading ||
              !studentsData.name.trim() ||
              !studentsData.rollNumber.trim()
            }
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Verifying & Submitting...
              </span>
            ) : (
              <>
                <SparklesIcon className="size-4" />
                Confirm & Mark Attendance
                <ArrowRightIcon className="size-4 ml-1" />
              </>
            )}
          </Button>
        </Form>
      </Card>
    </motion.div>
  );
}
