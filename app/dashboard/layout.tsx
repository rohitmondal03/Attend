import { redirect } from "next/navigation";
import { type ReactNode } from "react";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { ROUTES } from "@/lib/routes";
import { DashboardHeader } from "./_components/dashboard-header";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sessionData || !sessionData.user) {
    redirect(ROUTES.signin);
  }

  return (
    <main>
      <DashboardHeader
        userEmail={sessionData.user.email}
        userName={sessionData.user.name}
      />

      <div className="px-8 py-8 rounded-3xl mt-28">{children}</div>
    </main>
  );
}
