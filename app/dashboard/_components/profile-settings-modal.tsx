import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Modal,
  TextField,
} from "@heroui/react";
import { Edit2Icon } from "lucide-react";

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userEmail: string;
}

export function ProfileSettingsModal({
  isOpen,
  onClose,
  userName,
  userEmail,
}: ProfileSettingsModalProps) {
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
                Profile Settings
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={() => {}} className="space-y-6">
                <TextField isRequired isDisabled name="email" type="email">
                  <Label className="font-semibold">Email</Label>
                  <Input placeholder="[EMAIL_ADDRESS]" value={userEmail} />
                  <FieldError>E&hyphen;Mail field cannot be empty</FieldError>
                </TextField>
                <TextField isRequired name="user_name" type="text">
                  <Label className="font-semibold">Your Name</Label>
                  <Input
                    placeholder="Mr. Sachin Tendulkar"
                    type="text"
                    value={userName}
                  />
                  <Description>
                    Enter your name with annotation, e.g, Mr. Mrs. Dr. etc
                  </Description>
                  <FieldError>Name field cannot be empty</FieldError>
                </TextField>
                <TextField name="profile_pic" type="text">
                  <Label className="font-semibold">Profile Picture</Label>
                  <Input type="file" />
                  <Description>
                    Select Profile Picture you want to update
                  </Description>
                </TextField>
                <Button type="submit" className={"font-semibold w-full"}>
                  <Edit2Icon />
                  Update Profile
                </Button>
              </Form>
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
