import prisma from "@/lib/prisma";
import { generateToken } from "@/lib/qr";
import { getCurrentUser } from "@/actions/user";
import { ROUTES } from "@/lib/routes";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const authSession = await getCurrentUser();
  if (!authSession) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // If session is accessed by another teacher
  const session = await prisma.attendanceSession.findUnique({
    where: { id },
    select: { id: true, teacherId: true, status: true, qrSecret: true },
  });
  if (!session || session.teacherId !== authSession.id) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  // If session is not active
  if (session.status !== "ACTIVE") {
    return Response.json({ error: "Session not active" }, { status: 400 });
  }

  const token = await generateToken(session.id, session.qrSecret);
  console.log(token);
  

  const origin =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_APP_URL;

  return Response.json({
    url: `${origin}${ROUTES.markAttendance({ token })}`,
  });
}
