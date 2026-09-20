"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const signupwithEmailAction = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
    },
  });
};

export const loginwithEmailAction = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });
};

export const signoutAction = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });
};
