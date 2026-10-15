import crypto from "crypto";
import prisma from "./prisma";

export const generateToken = async (
  sessionId: string,
  qrSecret: string,
): Promise<string> => {
  const timeWindow = Math.floor(Date.now() / 10000); // changes every 10 sec
  const data = `${sessionId}:${timeWindow}`;
  const signature = crypto
    .createHmac("sha256", qrSecret)
    .update(data)
    .digest("hex");

  return Buffer.from(`${sessionId}:${timeWindow}:${signature}`).toString(
    "base64url",
  );
};

export async function validateToken(
  token: string,
): Promise<{ valid: boolean; sessionId?: string }> {
  const decoded = Buffer.from(token, "base64url").toString();
  const [sessionId, timeWindow, signature] = decoded.split(":");

  const session = await prisma.attendanceSession.findUnique({
    where: { id: sessionId },
  });
  if (!session) return { valid: false };

  // Recompute the expected signature using the STORED secret
  const expectedSig = crypto
    .createHmac("sha256", session.qrSecret)
    .update(`${sessionId}:${timeWindow}`)
    .digest("hex");

  if (signature !== expectedSig) return { valid: false }; // tampered or wrong secret

  const currentWindow = Math.floor(Date.now() / 10000);
  const windowAge = currentWindow - parseInt(timeWindow);

  // Allow current window + maybe 1 window of grace (scanning takes a second)
  if (windowAge < 0 || windowAge > 1) return { valid: false }; // expired

  return { valid: true, sessionId };
}
