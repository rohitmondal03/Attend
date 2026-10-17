import { Card, Chip } from "@heroui/react";
import { ClockIcon } from "lucide-react";

interface WeeklySessionsCardProps {
  currentWeekSessions: number;
}

export function WeeklySessionsCard({
  currentWeekSessions,
}: WeeklySessionsCardProps) {
  return (
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
        <span className="text-primary text-3xl font-bold">
          {currentWeekSessions}
        </span>
        <Chip color="danger" className="font-semibold">
          ↑ This Week
        </Chip>
      </Card.Footer>
    </Card>
  );
}
