import { validateToken } from "@/lib/qr";
import { notFound, redirect } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ token: string }>;
}

export default async function MarkAttendanceLayout({
  children,
  params,
}: LayoutProps) {
  const { token } = await params;

  const { valid, sessionId } = await validateToken(token);

  if (!valid || !sessionId) {
    return notFound();
  }

  return <main>{children}</main>;
}
