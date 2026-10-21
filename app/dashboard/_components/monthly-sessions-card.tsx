import { Card, Chip } from "@heroui/react";
import { CalendarIcon } from "lucide-react";

interface MonthlySessionsCardProps {
  currentMonthSessions: number;
}

export function MonthlySessionsCard({
  currentMonthSessions,
}: MonthlySessionsCardProps) {
  return (
    <Card className="flex h-full flex-col justify-between">
      <Card.Header>
        <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-accent/40">
          <CalendarIcon className="text-primary size-5" aria-hidden="true" />
        </div>
        <Card.Title className="text-base font-semibold">
          Sessions This Month
        </Card.Title>
        <Card.Description>
          Attendance sessions held in the current calendar month.
        </Card.Description>
      </Card.Header>
      <Card.Footer className="flex w-full items-center justify-between border-t pt-3">
        <span className="text-primary text-3xl font-bold">
          {currentMonthSessions}
        </span>
        <Chip color="danger" className="font-semibold">
          ↑ This Month
        </Chip>
      </Card.Footer>
    </Card>
  );
}
