"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Button } from "@heroui/react";
import { NotebookIcon } from "lucide-react";

const CoursesTableModal = dynamic(() =>
  import("./courses-table-modal").then((mod) => mod.CoursesTableModal),
);

export function DashboardCourseButton() {
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  return (
    <>
      <Button
        className="font-bold"
        variant="danger-soft"
        onPress={() => setIsCourseModalOpen(true)}
      >
        <NotebookIcon />
        Your Courses
      </Button>
      <CoursesTableModal
        isOpen={isCourseModalOpen}
        onClose={() => setIsCourseModalOpen(false)}
      />
    </>
  );
}
