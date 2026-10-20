"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import {
  loginSchema,
  signupSchema,
  validateInput,
  type LoginInput,
  type SignupInput,
} from "@/lib/zod";

export const signupwithEmailAction = async (input: SignupInput) => {
  const { email, name, password } = validateInput(signupSchema, input);

  await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
    },
  });
};

export const loginwithEmailAction = async (input: LoginInput) => {
  const { email, password } = validateInput(loginSchema, input);

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
