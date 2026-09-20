"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ROUTES } from "@/lib/routes";

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

// export const signinWithOAuthAction = async (provider: string) => {
//   await auth.api
//     .signInSocial({
//       body: {
//         provider,
//       },
//     })
//     .then(() => redirect(ROUTES.dashboard));
// };

export const signoutAction = async () => {
  await auth.api
    .signOut({
      headers: await headers(),
    })
    .then(() => redirect(ROUTES.signin));
};
