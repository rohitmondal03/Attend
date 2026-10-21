import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { ReactLenis } from "lenis/react";
import { ToastProvider } from "@heroui/react";
import { TanstackProvider } from "@/providers/tanstack";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Attend — Real-Time QR Attendance System",
  description:
    "Dynamic rotating QR codes for zero-proxy, paperless classroom attendance.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <TanstackProvider>
      <html
        lang="en"
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} ${inter.className} h-full antialiased bg-background text-foreground`}
      >
        <body className="min-h-full flex flex-col selection:bg-accent/20 selection:text-accent-foreground">
          <ReactLenis root>{children}</ReactLenis>
          <ToastProvider placement="bottom end" />
        </body>
      </html>
    </TanstackProvider>
  );
}
