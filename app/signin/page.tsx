"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  buttonVariants,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Separator,
  TextField,
  toast,
} from "@heroui/react";
import {
  FaGithub as GithubIcon,
  FaGoogle as GoogleIcon,
  FaSpotify as SpotifyIcon,
} from "react-icons/fa";
import {
  CheckIcon,
  FileSpreadsheetIcon,
  MoveLeft,
} from "lucide-react";
import { motion } from "motion/react";
import { ROUTES } from "@/lib/routes";
import { authClient } from "@/lib/auth-client";
import { signupwithEmailAction } from "@/actions/auth";

export default function LoginPage() {
  const { useSession, signIn } = authClient;
  const { data: session } = useSession();
  const { push: redirect } = useRouter();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Email signup
  const signupwithEmail = async () => {
    if (session) {
      toast("Already logged in", {
        description:
          "There already a logged in user. Click on 'Go to dashboard' for for heading back to dashboard",
        timeout: 4000,
        variant: "danger",
        actionProps: {
          children: "Go to dashboard",
          onPress: () => redirect(ROUTES.dashboard),
          variant: "tertiary",
          size: "sm",
        },
      });
      return;
    }

    setIsLoading(true);

    await signupwithEmailAction(formValues)
      .then(() => {
        toast("Login successfull !", {
          timeout: 4000,
          variant: "success",
        });
      })
      .catch((error) => {
        toast("Error", {
          description: error.message,
          timeout: 4000,
          variant: "danger",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // OAuth signin
  const oauthSignin = async (provider: string) => {
    // await signinWithOAuthAction(provider);
    await signIn.social(
      { provider },
      {
        onSuccess: () => {
          toast("Login successfull !", {
            timeout: 4000,
            variant: "success",
          });

          redirect(ROUTES.dashboard);
        },
        onError: ({ error }) => {
          toast("Error", {
            description: error.message,
            timeout: 4000,
            variant: "danger",
          });
        },
      },
    );
  };

  return (
    <div className="h-[95vh] flex flex-col items-center justify-center relative">
      <Link href="/">
        <FileSpreadsheetIcon className="size-8 absolute top-4 left-4" />
      </Link>

      <div className="flex flex-col items-center justify-center my-auto space-y-6 relative">
        <Link href={"/"} className={buttonVariants({ variant: "tertiary" })}>
          <MoveLeft /> Back to Home
        </Link>
        <div className="space-y-4 text-center">
          <motion.h1
            className="text-4xl font-"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
          >
            Welcome to{" "}
            <span className="font_changaone font-medium">Attend</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5, delay: 0.2 }}
          >
            A no-proxy & paperless attendance system
          </motion.p>
        </div>
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeInOut", duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-around gap-2">
            <Button
              variant="tertiary"
              className={"w-full border-2 border-accent-foreground"}
              onClick={() => oauthSignin}
              isDisabled={isLoading}
            >
              <GoogleIcon className="size-4" />
            </Button>
            <Button
              variant="tertiary"
              className={"w-full border-2 border-accent-foreground"}
              onClick={() => oauthSignin("github")}
              isDisabled={isLoading}
            >
              <GithubIcon className="size-4" />
            </Button>
            <Button
              variant="tertiary"
              className={"w-full border-2 border-accent-foreground"}
              onClick={() => oauthSignin("spotify")}
              isDisabled={isLoading}
            >
              <SpotifyIcon className="size-4" />
            </Button>
          </div>
          <Separator dir="horizontal" className="w-80 bg-muted" />
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              signupwithEmail();
            }}
            className="w-80 space-y-4"
          >
            <TextField isRequired name="name" type="text">
              <Label className="font-bold">Name</Label>
              <Input
                placeholder="John Davis"
                value={formValues.name}
                onChange={(e) =>
                  setFormValues((prev) => ({ ...prev, name: e.target.value }))
                }
                autoComplete="off"
              />
              <FieldError />
            </TextField>
            <TextField isRequired name="email" type="email">
              <Label className="font-bold">Email</Label>
              <Input
                placeholder="john@example.com"
                value={formValues.email}
                onChange={(e) =>
                  setFormValues((prev) => ({ ...prev, email: e.target.value }))
                }
                autoComplete="off"
              />
              <FieldError />
            </TextField>
            <TextField isRequired name="password" type="password">
              <Label className="font-bold">Password</Label>
              <Input
                placeholder="password@123"
                value={formValues.password}
                onChange={(e) =>
                  setFormValues((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
              <Description>
                Password should have atleast 8 characters
              </Description>
              <FieldError />
            </TextField>
            <Button
              type="submit"
              className={"font-semibold w-full"}
              isDisabled={isLoading}
            >
              {isLoading ? (
                <>Signing...</>
              ) : (
                <>
                  <CheckIcon /> Sign In
                </>
              )}
            </Button>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}
