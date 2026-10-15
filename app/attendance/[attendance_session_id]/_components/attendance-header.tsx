import Link from "next/link";
import { buttonVariants } from "@heroui/styles";
import { ArrowUpRightIcon } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import { Logo } from "@/components/shared/logo";

interface AttendanceHeaderProps {}

export function AttendanceHeader(props: AttendanceHeaderProps) {
  return (
    <header className="fixed w-full top-0 left-0 py-6 px-10 border-b-2 border-default-foreground flex items-center justify-between bg-zinc-200 z-10">
      <Logo />

      <div className="flex items-center justify-center gap-4">
        <Link
          href={ROUTES.dashboard}
          className={buttonVariants({
            variant: "primary",
            className: "font-bold group",
          })}
        >
          Dashboard
          <ArrowUpRightIcon className="size-4 rotate-0 group-hover:rotate-45 transition-all ease-in-out duration-200" />
        </Link>
      </div>
    </header>
  );
}
