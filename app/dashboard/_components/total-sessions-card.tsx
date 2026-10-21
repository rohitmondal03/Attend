import { Card, Chip } from "@heroui/react";
import { LayersIcon } from "lucide-react";

interface TotalSessionsCardProps {
  totalAttendanceSessions: number;
}

export function TotalSessionsCard({
  totalAttendanceSessions,
}: TotalSessionsCardProps) {
  return (
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
        <span className="text-primary text-3xl font-bold">
          {totalAttendanceSessions}
        </span>
        <Chip color="success" className="font-semibold">
          ↑ All Time
        </Chip>
      </Card.Footer>
    </Card>
  );
}
