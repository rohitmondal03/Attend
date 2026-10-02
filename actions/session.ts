import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const getCurrentSession = async () => {
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sessionData || !sessionData.session) {
    throw new Error("No session present. Signin to continue");
  }

  return sessionData.session;
};
