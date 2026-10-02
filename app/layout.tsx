import type { Metadata } from "next";
import { Figtree, Changa_One, Instrument_Serif } from "next/font/google";
import { ReactLenis } from "lenis/react";
import { ToastProvider } from "@heroui/react";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  weight: ["300", "400", "600", "800"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: ["400"],
});

const changaOne = Changa_One({
  variable: "--font-changaone",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Attend",
  description: "A attendance marking app for teachers & students",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.className} ${changaOne.variable} ${instrumentSerif.variable} h-full antialiased bg-zinc-200`}
    >
      <body className="min-h-full flex flex-col p-4">
        <ReactLenis root>{children}</ReactLenis>
        <ToastProvider placement="bottom end"  />
      </body>
    </html>
  );
}
