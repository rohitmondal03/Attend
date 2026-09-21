import { ReactNode } from "react";
import { DashboardHeader } from "./_components/header";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="space-y-8">
      <DashboardHeader />

      <div className="px-8 py-8 rounded-3xl">
        {children}
      </div>
    </main>
  );
}
