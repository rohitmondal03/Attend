"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/routes";
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
    .then(() => redirect(ROUTES.dashboard))
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
    .then(() => redirect(ROUTES.dashboard))
    .catch((error) => {
      throw new Error(error);
    });
};

export const signoutAction = async () => {
  await auth.api
    .signOut({
      headers: await headers(),
    })
    .then(() => redirect(ROUTES.signin))
    .catch(() => {
      throw new Error(ERROR_MESSAGE.signout);
    });
};
