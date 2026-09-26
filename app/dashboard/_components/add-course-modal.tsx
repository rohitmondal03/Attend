import { type FormEvent, useState } from "react";
import { PlusIcon } from "lucide-react";
import {
  Form,
  Label,
  Modal,
  TextField,
  Input,
  Description,
  FieldError,
  Button,
} from "@heroui/react";
import { addNewCourseAction } from "@/actions/course";

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCourseModal({ isOpen, onClose }: AddCourseModalProps) {
  const [formValue, setFormValue] = useState<{
    courseName: string;
    program: string;
    semester: number;
  }>({
    courseName: "",
    program: "",
    semester: 1,
  });

  // To add a new Course
  const addNewCourse = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addNewCourseAction({ ...formValue });
  };

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
                Add new course you&apos;ll be teaching
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={addNewCourse}
                className="grid grid-cols-2 gap-x-4 gap-y-6"
              >
                <TextField
                  isRequired
                  name="course_name"
                  type="text"
                  className={"col-span-2"}
                >
                  <Label className="font-semibold">Course/Subject Name</Label>
                  <Input
                    placeholder="Enter Course/Subject Name"
                    autoComplete="off"
                    value={formValue.courseName}
                    onChange={(e) =>
                      setFormValue((prev) => ({
                        ...prev,
                        courseName: e.target.value,
                      }))
                    }
                  />
                  <Description>
                    e.g, Research Methodology, Software Engineering
                  </Description>
                  <FieldError>Please enter a valid course name</FieldError>
                </TextField>
                <TextField isRequired name="program" type="text">
                  <Label className="font-semibold">Program</Label>
                  <Input
                    placeholder="Enter Program Name"
                    autoComplete="off"
                    value={formValue.program}
                    onChange={(e) =>
                      setFormValue((prev) => ({
                        ...prev,
                        program: e.target.value,
                      }))
                    }
                  />
                  <Description>e.g, M.Tech, MBA, Ph.D</Description>
                  <FieldError>Please select a valid program</FieldError>
                </TextField>
                <TextField isRequired name="semester" type="number">
                  <Label className="font-semibold">Semester</Label>
                  <Input
                    placeholder="Enter Semester"
                    type="number"
                    value={formValue.semester}
                    onChange={(e) =>
                      setFormValue((prev) => ({
                        ...prev,
                        semester: Number(e.target.value),
                      }))
                    }
                  />
                  <Description>e.g, 1st, 2nd, 3rd, 4th</Description>
                  <FieldError>Please select a valid semester</FieldError>
                </TextField>
                <Button
                  type="submit"
                  className={"font-semibold w-full col-span-2"}
                >
                  <PlusIcon />
                  Add Course
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer className="mb-0">
              <Button variant="danger-soft" onPress={() => onClose()}>
                Cancel
              </Button>
            </Modal.Footer>
            <Modal.CloseTrigger />
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
