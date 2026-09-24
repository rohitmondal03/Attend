import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getCurrentUser = async () => {
  const sessionData = await auth.api.getSession({
    headers: await headers(),
  });

  if (!sessionData || !sessionData.user) {
    throw new Error("No user signed in. Signin to continue");
  }

  return sessionData.user;
};
