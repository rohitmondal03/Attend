import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Button, Modal, Table } from "@heroui/react";
import { EllipsisIcon } from "lucide-react";
import { getUsersCoursesAction } from "@/actions/course";
import { type Course } from "@/prisma/generated/prisma/client";

const Dropdown = dynamic(() =>
  import("@heroui/react").then((mod) => mod.Dropdown),
);
const DropdownTrigger = dynamic(() =>
  import("@heroui/react").then((mod) => mod.Dropdown.Trigger),
);
const DropdownPopover = dynamic(() =>
  import("@heroui/react").then((mod) => mod.Dropdown.Popover),
);
const DropdownMenu = dynamic(() =>
  import("@heroui/react").then((mod) => mod.Dropdown.Menu),
);
const DropdownSection = dynamic(() =>
  import("@heroui/react").then((mod) => mod.Dropdown.Section),
);
const DropdownItem = dynamic(() =>
  import("@heroui/react").then((mod) => mod.Dropdown.Item),
);

interface CoursesTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CoursesTableModal({ isOpen, onClose }: CoursesTableModalProps) {
  const [courseList, setCourseList] = useState<Course[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  // To fetch users courses
  useEffect(() => {
    (async () => {
      setIsFetching(true);

      await getUsersCoursesAction()
        .then((courses) => {
          setCourseList(courses);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsFetching(false);
        });
    })();
  }, []);

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <Modal.Backdrop
        className="bg-linear-to-t from-black/80 via-black/40 to-transparent dark:from-zinc-800/80 dark:via-zinc-800/40"
        variant="blur"
      >
        <Modal.Container>
          <Modal.Dialog className="space-y-10">
            <Modal.Header>
              <Modal.Heading className="font-bold text-xl">
                Your Created Courses
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              {isFetching ? (
                <div className="col-span-2 flex h-40 items-center justify-center">
                  <p>Loading...</p>
                </div>
              ) : courseList.length > 0 ? (
                <Table>
                  <Table.ScrollContainer>
                    <Table.Content aria-label="Team members" className="">
                      <Table.Header>
                        <Table.Column isRowHeader>Course/Subject</Table.Column>
                        <Table.Column isRowHeader>Program</Table.Column>
                        <Table.Column isRowHeader>Semester</Table.Column>
                        <Table.Column isRowHeader>Actions</Table.Column>
                      </Table.Header>
                      <Table.Body>
                        {courseList.map((c, idx) => (
                          <Table.Row key={idx}>
                            <Table.Cell>{c.courseName}</Table.Cell>
                            <Table.Cell>{c.program}</Table.Cell>
                            <Table.Cell>{c.semester}</Table.Cell>
                            <Table.Cell>
                              <Dropdown>
                                <DropdownTrigger>
                                  <EllipsisIcon className="size-4" />
                                </DropdownTrigger>
                                <DropdownPopover>
                                  <DropdownMenu>
                                    <DropdownItem>View</DropdownItem>
                                  </DropdownMenu>
                                </DropdownPopover>
                              </Dropdown>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table.Content>
                  </Table.ScrollContainer>
                </Table>
              ) : (
                <div className="col-span-2 flex h-40 items-center justify-center">
                  <p>No courses created yet.</p>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer className="mb-0">
              <Button variant="danger-soft" onPress={onClose}>
                Close
              </Button>
            </Modal.Footer>
            <Modal.CloseTrigger />
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
