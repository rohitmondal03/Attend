import { Table, Chip, Button, Dropdown } from "@heroui/react";
import { DownloadIcon, EllipsisIcon } from "lucide-react";

const DEMO_SESSIONS_TABLE = new Array(20).fill({
  subject: "AI Tools for Research",
  class: "CC3 5244",
  date: new Date().toLocaleDateString(),
  time: "2.30PM - 4.30PM",
  attendanceCount: "106",
  status: "Active",
});

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">My Dashboard</h1>

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Team members" className="">
            <Table.Header>
              <Table.Column isRowHeader>Subject</Table.Column>
              <Table.Column isRowHeader>Class/Section</Table.Column>
              <Table.Column isRowHeader>Date</Table.Column>
              <Table.Column isRowHeader>Time</Table.Column>
              <Table.Column isRowHeader>Attendance</Table.Column>
              <Table.Column isRowHeader>Status</Table.Column>
              <Table.Column isRowHeader>Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {DEMO_SESSIONS_TABLE.map((data, idx) => (
                <Table.Row key={idx}>
                  <Table.Cell>{data.subject}</Table.Cell>
                  <Table.Cell>{data.class}</Table.Cell>
                  <Table.Cell>{data.date}</Table.Cell>
                  <Table.Cell>{data.time}</Table.Cell>
                  <Table.Cell>{data.attendanceCount}</Table.Cell>
                  <Table.Cell>
                    <Chip variant="tertiary">{data.status}</Chip>
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown>
                      <Dropdown.Trigger>
                        <Button variant="ghost">
                          <EllipsisIcon />
                        </Button>
                      </Dropdown.Trigger>
                      <Dropdown.Popover>
                        <Dropdown.Menu className="font-bold">
                          <Dropdown.Item>
                            <DownloadIcon className="size-4" />
                            Download Spreadsheet
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown.Popover>
                    </Dropdown>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
}
