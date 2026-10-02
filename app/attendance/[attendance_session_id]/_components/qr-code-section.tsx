"use client";

import { Chip, Card } from "@heroui/react";
import { QrCodeIcon, ClockIcon } from "lucide-react";
import { useEffect, useRef } from "react";

interface QrCodeSectionProps {
  sessionId: string;
}

export function QrCodeSection({ sessionId }: QrCodeSectionProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<InstanceType<
    typeof import("qr-code-styling").default
  > | null>(null);

  useEffect(() => {
    if (!qrRef.current) return;

    import("qr-code-styling").then(({ default: QRCodeStyling }) => {
      if (!qrRef.current) return;

      if (!qrInstanceRef.current) {
        qrInstanceRef.current = new QRCodeStyling({
          width: 280,
          height: 280,
          data: `https://attend.app/scan/${sessionId}`,
          dotsOptions: {
            color: "#1a1a1a",
            type: "rounded",
          },
          cornersSquareOptions: {
            color: "#1a1a1a",
            type: "extra-rounded",
          },
          cornersDotOptions: {
            color: "#1a1a1a",
            type: "dot",
          },
          backgroundOptions: {
            color: "transparent",
          },
          imageOptions: {
            crossOrigin: "anonymous",
            margin: 4,
          },
          image: "/logo.png",
        });
        qrInstanceRef.current.append(qrRef.current);
      } else {
        qrInstanceRef.current.update({
          data: `https://attend.app/scan/${sessionId}`,
        });
      }
    });
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex items-center gap-3">
        <Chip
          color="success"
          size="lg"
          className="font-semibold border border-accent-foreground"
        >
          <span className="inline-block size-2 rounded-full bg-current mr-1 animate-pulse" />
          Live
        </Chip>
        <span className="text-sm text-muted font-medium">
          Session ID:{" "}
          <span className="font-mono text-foreground">
            {sessionId.slice(0, 8)}...
          </span>
        </span>
      </div>

      <Card className="p-8 flex flex-col items-center justify-center gap-6 w-full">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-accent/40">
            <QrCodeIcon className="text-primary size-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Scan to Mark Attendance</h2>
            <p className="text-sm text-muted">
              Ask students to scan this QR code
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 shadow-lg border border-accent">
          <div ref={qrRef} className="flex items-center justify-center" />
        </div>

        <div className="flex items-center gap-2 text-sm text-muted">
          <ClockIcon className="size-4" />
          <span>
            Session started at{" "}
            <span className="font-semibold text-foreground">2:30 PM</span>
          </span>
        </div>
      </Card>
    </div>
  );
}
