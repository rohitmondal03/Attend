"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, buttonVariants, Separator, toast } from "@heroui/react";
import {
  FaGithub as GithubIcon,
  FaGoogle as GoogleIcon,
  FaSpotify as SpotifyIcon,
} from "react-icons/fa";
import { MoveLeft } from "lucide-react";
import { motion } from "motion/react";
import { ROUTES } from "@/lib/routes";
import { authClient } from "@/lib/auth-client";
import { AuthFormTab } from "./_components/auth-tab";
import { Logo } from "@/components/shared/logo";

export default function LoginPage() {
  const { signIn } = authClient;
  const { push: redirect } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // OAuth signin
  const oauthSignin = async (provider: string) => {
    setIsLoading(true);

    await signIn
      .social(
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
      )
      .finally(() => {
        setIsLoading(true);
      });
  };

  return (
    <div className="h-[95vh] flex flex-col items-center justify-center relative">
      <div className="absolute top-4 left-4">
      <Logo />
      </div>

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
          <AuthFormTab />
        </motion.div>
      </div>
    </div>
  );
}
