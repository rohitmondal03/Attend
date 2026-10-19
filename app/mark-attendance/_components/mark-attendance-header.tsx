import { Logo } from "@/components/shared/logo";
import { Chip } from "@heroui/react";
import { ShieldCheckIcon } from "lucide-react";

export function MarkAttendanceHeader() {
  return (
    <header className="fixed top-0 left-0 w-full py-4 px-6 md:px-10 border-b-2 border-default-foreground/20 flex items-center justify-between bg-zinc-200/90 backdrop-blur-md z-20">
      <Logo />

      <div className="flex items-center gap-3">
        {/* <Chip
          color="success"
          size="sm"
          className="font-semibold text-xs py-1 px-2.5 hidden sm:inline-flex"
        >
          <span className="inline-block size-2 rounded-full bg-current mr-1.5 animate-pulse" />
          Live Token Active
        </Chip> */}

        <Chip className="flex items-center gap-1.5 text-xs font-medium text-muted py-1.5 px-3 rounded-full border border-border">
          <ShieldCheckIcon className="size-3.5" />
          <span>Student Check-in</span>
        </Chip>
      </div>
    </header>
  );
}
