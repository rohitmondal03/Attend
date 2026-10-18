"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { ERROR_MESSAGE } from "@/lib/error";

export const signupwithEmailAction = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  await auth.api
    .signUpEmail({
      body: {
        email,
        password,
        name,
      },
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const loginwithEmailAction = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  await auth.api
    .signInEmail({
      body: {
        email,
        password,
      },
    })
    .catch((error) => {
      throw new Error(error);
    });
};

export const signoutAction = async () => {
  await auth.api
    .signOut({
      headers: await headers(),
    })
    .catch(() => {
      throw new Error(ERROR_MESSAGE.signout);
    });
};
