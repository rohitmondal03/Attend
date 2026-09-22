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
import { PlusIcon } from "lucide-react";

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCourseModal({ isOpen, onClose }: AddCourseModalProps) {
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
                onSubmit={() => {}}
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
                  />
                  <Description>
                    e.g, Research Methodology, Software Engineering
                  </Description>
                  <FieldError>Please enter a valid course name</FieldError>
                </TextField>
                <TextField isRequired name="program" type="text">
                  <Label className="font-semibold">Program</Label>
                  <Input placeholder="Enter Program Name" autoComplete="off" />
                  <Description>e.g, M.Tech, MBA, Ph.D</Description>
                  <FieldError>Please select a valid program</FieldError>
                </TextField>
                <TextField isRequired name="semester" type="number">
                  <Label className="font-semibold">Semester</Label>
                  <Input placeholder="Enter Semester" type="number" />
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
