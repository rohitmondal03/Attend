import { createNewAttendanceSessionAction } from "@/actions/attendance";
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
  type TimeValue,
} from "@heroui/react";
import { PlusIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { parseTime } from "@internationalized/date";

interface CreateAttendanceSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEMO_COURSES = [
  {
    id: "1",
    title: "Maths",
  },
  {
    id: "2",
    title: "Programing",
  },
  {
    id: "3",
    title: "ML",
  },
];

export function CreateAttendanceSessionModal({
  isOpen,
  onClose,
}: CreateAttendanceSessionModalProps) {
  const [formValue, setFormValue] = useState<{
    courseId: string;
    classLocation: string;
    classStartTime: TimeValue;
    classEndTime: TimeValue;
  }>({
    classEndTime: parseTime("11:30"),
    classStartTime: parseTime("10:00"),
    classLocation: "",
    courseId: "",
  });

  // To create a new Attendance session
  const createNewAttendanceSession = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await createNewAttendanceSessionAction({
      courseId: formValue.courseId,
      classLocation: formValue.classLocation,
      classStartTime: (() => {
        const d = new Date();
        d.setHours(formValue.classStartTime.hour);
        d.setMinutes(formValue.classStartTime.minute);

        return d;
      })(),
      classEndTime: (() => {
        const d = new Date();
        d.setHours(formValue.classEndTime.hour);
        d.setMinutes(formValue.classEndTime.minute);

        return d;
      })(),
    });
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
                Create New Attendance Session
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={createNewAttendanceSession}
                className="grid grid-cols-2 gap-x-4 gap-y-6"
              >
                <div className={"col-span-2"}>
                  <Label className="font-semibold">Subject</Label>
                  <Select
                    isRequired
                    placeholder="Select subject"
                    value={formValue.courseId}
                    onChange={(val) =>
                      setFormValue((prev) => ({
                        ...prev,
                        courseId: val?.toString() as string,
                      }))
                    }
                  >
                    <Select.Trigger>
                      <Select.Value />
                      <Select.Indicator />
                    </Select.Trigger>
                    <Select.Popover>
                      <ListBox>
                        {DEMO_COURSES.map((course) => (
                          <ListBox.Item
                            key={course.id}
                            id={course.id}
                            textValue={course.title}
                          >
                            {course.title}
                            <ListBox.ItemIndicator />
                          </ListBox.Item>
                        ))}
                      </ListBox>
                    </Select.Popover>
                    <Description>Select subject</Description>
                    <FieldError>Please select a valid subject</FieldError>
                  </Select>
                </div>
                <TextField
                  isRequired
                  name="class_name"
                  type="text"
                  className={"col-span-2"}
                >
                  <Label className="font-semibold">Class Name</Label>
                  <Input
                    placeholder="Center 3, Room 5241"
                    value={formValue.classLocation}
                    onChange={(e) =>
                      setFormValue((prev) => ({
                        ...prev,
                        classLocation: e.target.value,
                      }))
                    }
                  />
                  <Description>Enter class location</Description>
                  <FieldError>Please enter a valid class name</FieldError>
                </TextField>
                <TimeField
                  isRequired
                  name="class_start_time"
                  value={formValue.classStartTime}
                  onChange={(value) =>
                    setFormValue((prev) => ({
                      ...prev,
                      classStartTime: value as TimeValue,
                    }))
                  }
                >
                  <Label className="font-semibold">Class Start Time</Label>
                  <TimeField.Group>
                    <TimeField.Input>
                      {(segment) => <TimeField.Segment segment={segment} />}
                    </TimeField.Input>
                  </TimeField.Group>
                  <Description>Class start time</Description>
                  <FieldError>Please enter a valid class start time</FieldError>
                </TimeField>
                <TimeField
                  isRequired
                  name="class_end_time"
                  value={formValue.classEndTime}
                  onChange={(value) =>
                    setFormValue((prev) => ({
                      ...prev,
                      classEndTime: value as TimeValue,
                    }))
                  }
                >
                  <Label className="font-semibold">Class End Time</Label>
                  <TimeField.Group>
                    <TimeField.Input>
                      {(segment) => <TimeField.Segment segment={segment} />}
                    </TimeField.Input>
                  </TimeField.Group>
                  <Description>Class end time</Description>
                  <FieldError>Please enter a valid class end time</FieldError>
                </TimeField>
                <Button
                  type="submit"
                  className={"font-semibold w-full col-span-2"}
                >
                  <PlusIcon />
                  Create Attendance Session
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer className="mb-0">
              <Button variant="danger-soft" onPress={() => onClose()}>
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
