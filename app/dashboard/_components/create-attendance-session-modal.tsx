import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  TextField,
  TimeField,
} from "@heroui/react";
import { PlusIcon } from "lucide-react";

interface CreateAttendanceSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateAttendanceSessionModal({
  isOpen,
  onClose,
}: CreateAttendanceSessionModalProps) {
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
                Create New Attendance Session
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={() => {}}
                className="grid grid-cols-2 gap-x-4 gap-y-6"
              >
                <TextField isRequired name="class_name" type="text">
                  <Label className="font-semibold">Subject</Label>
                  <Select placeholder="Select subject">
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        <ListBox.Item id="florida" textValue="Florida">
                          Maths for IT
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="delaware" textValue="Delaware">
                          AI Tools for Research
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                        <ListBox.Item id="california" textValue="California">
                          Machine Learning
                          <ListBox.ItemIndicator />
                        </ListBox.Item>
                      </ListBox>
                    </Select.Popover>
                    <Description>Select subject</Description>
                  </Select>
                </TextField>
                <TextField isRequired name="class_name" type="text">
                  <Label className="font-semibold">Class Name</Label>
                  <Input placeholder="Center 3, Room 5241" />
                  <Description>Enter class location</Description>
                  <FieldError />
                </TextField>
                <TimeField isRequired name="class_start_time">
                  <Label className="font-semibold">Class Start Time</Label>
                  <TimeField.Group>
                    <TimeField.Input>
                      {(segment) => <TimeField.Segment segment={segment} />}
                    </TimeField.Input>
                  </TimeField.Group>
                  <Description>Class start time</Description>
                  <FieldError />
                </TimeField>
                <TimeField isRequired name="class_end_time">
                  <Label className="font-semibold">Class End Time</Label>
                  <TimeField.Group>
                    <TimeField.Input>
                      {(segment) => <TimeField.Segment segment={segment} />}
                    </TimeField.Input>
                  </TimeField.Group>
                  <Description>Class end time</Description>
                  <FieldError />
                </TimeField>
                <Button
                  type="submit"
                  className={"font-semibol w-full col-span-2"}
                >
                  <PlusIcon />
                  Create
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer className="mb-0">
              <Button variant="danger-soft" onClick={() => onClose()}>
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
