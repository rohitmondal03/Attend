import { Button, Chip, Modal, Table } from "@heroui/react";

const DEMO_SESSIONS_TABLE = new Array(20).fill({
  subject: "AI Tools for Research",
  date: new Date().toLocaleDateString(),
  time: "2.30PM - 4.30PM",
  status: "Active",
});

interface SessionsTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SessionsTableModal({
  isOpen,
  onClose,
}: SessionsTableModalProps) {
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
                Your Created Attendance Sessions
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <Table>
                <Table.ScrollContainer>
                  <Table.Content aria-label="Team members" className="">
                    <Table.Header>
                      <Table.Column isRowHeader>Subject</Table.Column>
                      <Table.Column isRowHeader>Date & Time</Table.Column>
                      <Table.Column isRowHeader>Status</Table.Column>
                    </Table.Header>
                    <Table.Body>
                      {DEMO_SESSIONS_TABLE.map((data, idx) => (
                        <Table.Row key={idx}>
                          <Table.Cell>{data.subject}</Table.Cell>
                          <Table.Cell>{data.date}, {data.time}</Table.Cell>
                          <Table.Cell>
                            <Chip color="accent">{data.status}</Chip>
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table.Content>
                </Table.ScrollContainer>
              </Table>
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
