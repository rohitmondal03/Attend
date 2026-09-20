import { ReactNode } from "react";
import { DashboardHeader } from "./_components/header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="space-y-8">
      <DashboardHeader />

      <div className="px-8 py-8 border-2 border-black/50 rounded-3xl">
        {children}
      </div>
    </main>
  );
}
