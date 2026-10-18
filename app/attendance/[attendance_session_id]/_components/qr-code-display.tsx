"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Card } from "@heroui/react";
import { QrCodeIcon, ClockIcon, TimerIcon } from "lucide-react";

const QR_REFRESH_SECONDS = 15;

interface QrCodeSectionProps {
  sessionId: string;
  sessionStartTime: Date;
}

export function QrCodeDisplay({
  sessionId,
  sessionStartTime,
}: QrCodeSectionProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<InstanceType<
    typeof import("qr-code-styling").default
  > | null>(null);

  const formattedSessionStartTime = useMemo(() => {
    const date = new Date(sessionStartTime);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const amOrpm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

    return `${formattedHours}:${formattedMinutes} ${amOrpm}`;
  }, [sessionStartTime]);

  const [countdown, setCountdown] = useState(QR_REFRESH_SECONDS);
  const countdownRef = useRef(QR_REFRESH_SECONDS);

  const resetCountdown = useCallback(() => {
    countdownRef.current = QR_REFRESH_SECONDS;
    setCountdown(QR_REFRESH_SECONDS);
  }, []);

  // Countdown ticker — runs every second
  useEffect(() => {
    const tick = setInterval(() => {
      countdownRef.current = Math.max(0, countdownRef.current - 1);
      setCountdown(countdownRef.current);
    }, 1000);
    return () => clearInterval(tick);
  }, []);

  // QR code initialisation + refresh
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

      resetCountdown();

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
        if (next) {
          qrInstanceRef.current?.update({ data: next });
          resetCountdown();
        }
      }, QR_REFRESH_SECONDS * 1000);
    }

    initQR();

    return () => {
      cancelled = true;
      if (interval) clearInterval(interval);
      if (qrRef.current) qrRef.current.innerHTML = "";
      qrInstanceRef.current = null;
    };
  }, [sessionId, resetCountdown]);

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

        <div className="flex items-center gap-2 rounded-full bg-foreground/5 px-4 py-2">
          <TimerIcon className="size-4 text-primary" />
          <span className="text-sm font-medium text-muted">Expires in</span>
          <span
            className={`font-mono text-lg font-bold tabular-nums ${
              countdown <= 5 ? "text-red-500" : "text-primary"
            }`}
          >
            {String(countdown).padStart(2, "0")}s
          </span>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-xl border-2 border-accent">
          <div ref={qrRef} className="flex items-center justify-center" />
        </div>

        <div className="flex items-center gap-2 text-sm text-muted">
          <ClockIcon className="size-4" />
          <span>
            Session started at{" "}
            <span className="font-semibold text-foreground">
              {formattedSessionStartTime}
            </span>
          </span>
        </div>
      </Card>
    </div>
  );
}
