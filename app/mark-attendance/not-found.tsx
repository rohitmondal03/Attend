"use client";

import { useRouter, useParams } from "next/navigation";
import { ArrowLeftIcon, QrCodeIcon, RefreshCcwIcon } from "lucide-react";
import { Button, buttonVariants } from "@heroui/react";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";

export default function NotFound() {
  const { push: redirect } = useRouter();
  const { token } = useParams();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="max-w-sm rounded-2xl border border-border p-8 text-center shadow-lg">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full">
          <QrCodeIcon className="size-10 text-destructive" />
        </div>

        <h1 className="mb-2 text-2xl font-bold tracking-tight">
          Invalid or Expired QR Code
        </h1>
        <p className="mb-6 text-sm text-muted-foreground">
          The QR code you scanned is not valid, has expired, or is no longer
          active.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href={ROUTES.markAttendance({ token: token as string })}
            className={buttonVariants({
              size: "lg",
              className: "w-full",
              variant: "danger",
            })}
          >
            <RefreshCcwIcon className="mr-2 size-4" />
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
}
