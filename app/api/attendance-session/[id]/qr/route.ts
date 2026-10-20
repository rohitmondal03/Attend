import prisma from "@/lib/prisma";
import { generateToken } from "@/lib/qr";
import { getCurrentUser } from "@/actions/user";
import { ROUTES } from "@/lib/routes";
import { attendanceSessionParamSchema, formatZodError } from "@/lib/zod";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const rawParams = await params;
  const paramResult = attendanceSessionParamSchema.safeParse(rawParams);

  if (!paramResult.success) {
    return Response.json(
      { error: formatZodError(paramResult.error) },
      { status: 400 },
    );
  }

  const { id } = paramResult.data;

  const authSession = await getCurrentUser();
  if (!authSession) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  // If session is accessed by another teacher
  const session = await prisma.attendanceSession.findUnique({ where: { id } });
  if (!session || session.teacherId !== authSession.id) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  // If session is not active
  if (session.status !== "ACTIVE") {
    return Response.json({ error: "Session not active" }, { status: 400 });
  }

  const token = await generateToken(session.id, session.qrSecret);

  const origin =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : process.env.NEXT_PUBLIC_APP_URL;

  return Response.json({
    url: `${origin}${ROUTES.markAttendance({ token })}`,
  });
}
