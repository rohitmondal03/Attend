"use client";

import { useEffect, useRef } from "react";

interface AttendanceQrCodeProps {
  sessionId: string;
}

export function AttendanceQrCode({ sessionId }: AttendanceQrCodeProps) {
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

  return <div ref={qrRef} className="flex items-center justify-center" />;
}

