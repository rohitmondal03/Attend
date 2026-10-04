"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { CoursesTableModal } from "./courses-table-modal";

export function DashboardCourseButton() {
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  return (
    <>
      <Button
        className="font-bold"
        variant="danger-soft"
        onPress={() => setIsCourseModalOpen(true)}
      >
        Your Courses
      </Button>
      <CoursesTableModal
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
      />
    </>
  );
}
