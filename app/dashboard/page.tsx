import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Table, Chip, Dropdown, Card, Separator } from "@heroui/react";
import {
  LayersIcon,
  CalendarIcon,
  ClockIcon,
  BookOpenIcon,
  DownloadIcon,
  EllipsisIcon,
  EyeIcon,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { ROUTES } from "@/lib/routes";

const DEMO_SESSIONS_TABLE = new Array(20).fill({
  subject: "AI Tools for Research",
  class: "CC3 5244",
  date: new Date().toLocaleDateString(),
  time: "2.30PM - 4.30PM",
  attendanceCount: "106",
  status: "Active",
});

export default async function DashboardPage() {
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sessionData || !sessionData.user) {
    redirect(ROUTES.signin);
  }

  return (
    <div className="space-y-12">
      <h1 className="text-3xl font-bold">
        <span className="text-black/60">Welcome to your Dashboard,</span>{" "}
        {sessionData.user.name}
      </h1>

      <section className="grid grid-cols-4 gap-4">
        {/* Card 1 – Total Sessions */}
        <Card className="flex h-full flex-col justify-between">
          <Card.Header>
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-accent/40">
              <LayersIcon className="text-primary size-5" aria-hidden="true" />
            </div>
            <Card.Title className="text-base font-semibold">
              Total Sessions
            </Card.Title>
            <Card.Description>
              All attendance sessions you&apos;ve ever created.
            </Card.Description>
          </Card.Header>
          <Card.Footer className="flex w-full items-center justify-between border-t pt-3">
            <span className="text-primary text-3xl font-bold">45</span>
            <Chip color="success" className="font-semibold">
              ↑ All Time
            </Chip>
          </Card.Footer>
        </Card>

        {/* Card 2 – This Month's Sessions */}
        <Card className="flex h-full flex-col justify-between">
          <Card.Header>
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-accent/40">
              <CalendarIcon
                className="text-primary size-5"
                aria-hidden="true"
              />
            </div>
            <Card.Title className="text-base font-semibold">
              Sessions This Month
            </Card.Title>
            <Card.Description>
              Attendance sessions held in the current calendar month.
            </Card.Description>
          </Card.Header>
          <Card.Footer className="flex w-full items-center justify-between border-t pt-3">
            <span className="text-primary text-3xl font-bold">10</span>
            <Chip color="danger" className="font-semibold">
              ↑ This Month
            </Chip>
          </Card.Footer>
        </Card>

        {/* Card 3 – This Week's Sessions */}
        <Card className="flex h-full flex-col justify-between">
          <Card.Header>
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-accent/40">
              <ClockIcon className="text-primary size-5" aria-hidden="true" />
            </div>
            <Card.Title className="text-base font-semibold">
              Sessions This Week
            </Card.Title>
            <Card.Description>
              Sessions conducted since the start of this week.
            </Card.Description>
          </Card.Header>
          <Card.Footer className="flex w-full items-center justify-between border-t pt-3">
            <span className="text-primary text-3xl font-bold">3</span>
            <Chip color="danger" className="font-semibold">
              ↑ This Week
            </Chip>
          </Card.Footer>
        </Card>

        {/* Card 4 – Most Recent Session */}
        <Card className="flex flex-col justify-between">
          <Card.Header>
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-accent/40">
              <BookOpenIcon
                className="text-primary size-5"
                aria-hidden="true"
              />
            </div>
            <Card.Title className="text-base font-semibold">
              Most Recent Session
            </Card.Title>
            <Card.Description>
              The last session you ran — jump back in quickly.
            </Card.Description>
          </Card.Header>
          <Card.Footer>
            <Link
              aria-label="View most recent session: Maths, B.Tech 3rd Sem"
              href="/dashboard"
              className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors bg-accent/30 hover:bg-accent/50"
            >
              <span>Maths — B.Tech 3rd Sem · 23 Aug</span>
              <EyeIcon className="text-primary size-4 shrink-0" />
            </Link>
          </Card.Footer>
        </Card>
      </section>

      <Separator orientation="horizontal" className="bg-accent-foreground" />

      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Your Overall Attendance Sessions</h1>

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
                      <Chip color="accent">{data.status}</Chip>
                    </Table.Cell>
                    <Table.Cell>
                      <Dropdown>
                        <Dropdown.Trigger>
                          <EllipsisIcon />
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
    </div>
  );
}
