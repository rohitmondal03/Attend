import Link from "next/link";
import { Card } from "@heroui/react";
import { buttonVariants } from "@heroui/styles";
import { SearchXIcon, ArrowUpRightIcon, HomeIcon } from "lucide-react";
import { ROUTES } from "@/lib/routes";

export default function AttendanceSessionNotFound() {
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <Card className="p-10 flex flex-col items-center justify-center gap-6 max-w-lg w-full text-center">
        {/* Icon */}
        <div className="flex size-16 items-center justify-center rounded-full bg-warning/10">
          <SearchXIcon className="text-warning size-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Session Not Found</h2>
          <p className="text-sm text-muted leading-relaxed">
            The attendance session you&apos;re looking for doesn&apos;t exist.
            It may have been deleted or the link you followed is incorrect.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted">
          <HomeIcon className="size-4" />
          <span>Please check the URL or head back to your dashboard.</span>
        </div>

        <Link
          href={ROUTES.dashboard}
          className={buttonVariants({
            variant: "primary",
            className: "font-bold group mt-2",
          })}
        >
          Go to Dashboard
          <ArrowUpRightIcon className="size-4 rotate-0 group-hover:rotate-45 transition-all ease-in-out duration-200" />
        </Link>
      </Card>
    </div>
  );
}
