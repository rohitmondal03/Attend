"use client";

import { Card } from "@heroui/react";
import { QrCodeIcon, ClockIcon } from "lucide-react";
import { useEffect, useRef } from "react";

interface QrCodeSectionProps {
  sessionId: string;
}

export function QrCodeDisplay({ sessionId }: QrCodeSectionProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<InstanceType<
    typeof import("qr-code-styling").default
  > | null>(null);

  useEffect(() => {
    let cancelled = false;
    let interval: ReturnType<typeof setInterval> | undefined;

    async function fetchUrl(): Promise<string | null> {
      const res = await fetch(`/api/attendance-session/${sessionId}/qr`, {
        cache: "no-store",
      });
      if (!res.ok) return null;
      const { url } = await res.json();
      return url as string;
    }

    async function initQR() {
      const { default: QRCodeStyling } = await import("qr-code-styling");
      const url = await fetchUrl();
      if (cancelled || !url || !qrRef.current) return;

      qrInstanceRef.current = new QRCodeStyling({
        width: 300,
        height: 300,
        data: url,
        qrOptions: { errorCorrectionLevel: "H" },
        dotsOptions: { color: "#0a0908", type: "rounded" },
        cornersSquareOptions: { color: "#0a0908", type: "extra-rounded" },
        cornersDotOptions: { color: "#0a0908", type: "dot" },
        backgroundOptions: { color: "#ffffff" },
        imageOptions: { crossOrigin: "anonymous", margin: 4, imageSize: 0.25 },
        image: "/logo.svg",
      });
      qrInstanceRef.current.append(qrRef.current);

      interval = setInterval(async () => {
        const next = await fetchUrl();
        if (next) qrInstanceRef.current?.update({ data: next });
      }, 15_000);
    }

    initQR();

    return () => {
      cancelled = true;
      if (interval) clearInterval(interval);
      if (qrRef.current) qrRef.current.innerHTML = "";
      qrInstanceRef.current = null;
    };
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <Card className="p-4 flex flex-col items-center justify-center gap-6 w-full">
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

        <span className="text-sm text-muted font-medium">
          Session ID:{" "}
          <span className="font-mono text-foreground">
            {sessionId.slice(0, 8)}...
          </span>
        </span>

        <div className="rounded-2xl bg-white p-6 shadow-xl border-2 border-accent">
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
