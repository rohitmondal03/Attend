"use client";

import { useRouter } from "next/navigation";
import {
  Avatar,
  Button,
  Dropdown,
  Header,
  Label,
  Separator,
  toast,
} from "@heroui/react";
import {
  SettingsIcon,
  LogOutIcon,
  NotebookIcon,
	PlusIcon,
	DotIcon
} from "lucide-react";
import { signoutAction } from "@/actions/auth";
import { ROUTES } from "@/lib/routes";
import { Logo } from "@/components/shared/logo";

export function DashboardHeader() {
  const { push: redirect } = useRouter();

  // Sign out user
  const signout = async () => {
    await signoutAction().then(() => {
      const id = toast(<p className="font-bold">Signed Out Successfully</p>, {
        variant: "success",
        actionProps: {
          children: "Dismiss",
          onPress: () => toast.close(id),
          variant: "tertiary",
        },
      });

			redirect(ROUTES.home);
    });
  };

  return (
    <header className="py-4 px-6 border-border-secondary flex items-center justify-between">
      <Logo />

      <div className="flex items-center justify-center gap-x-4">
        <Button className={"font-semibold"}>
					<PlusIcon />
					Create new Session
				</Button>
        <Button variant="danger-soft" className={"font-semibold gap-0"}>
					<DotIcon className="animate-pulse size-8" />
          Ongoing session
        </Button>
        <Separator
          orientation="vertical"
          className="bg-accent-soft-foreground"
        />
        <Dropdown>
          <Dropdown.Trigger>
            <Avatar>
              <Avatar.Image alt="user-avatar" src={"/self-photo.jpeg"} />
              <Avatar.Fallback>R</Avatar.Fallback>
            </Avatar>
          </Dropdown.Trigger>
          <Dropdown.Popover>
            <Dropdown.Menu className="font-bold py-4 space-y-2">
              <Dropdown.Section className="space-y-1">
                <Header className="py-0 text-sm">Rohit Mondal</Header>
                <Header className="py-0">IIIT Allahabad</Header>
                <Header className="py-0">mse2026013@iiita.ac.in</Header>
              </Dropdown.Section>
              <Separator orientation="horizontal" />
              <Dropdown.Section className="font-bold">
                <Dropdown.Item
                  id="profile-settings"
                  textValue="Profile Settings"
                  className="font-bold"
                >
                  <SettingsIcon className="size-4" />
                  <Label className="font-semibold">Profile Settings</Label>
                </Dropdown.Item>
                <Dropdown.Item
                  id="my-sessions"
                  textValue="My Sessions"
                  className="font-bold"
                >
                  <NotebookIcon className="size-4" />
                  <Label className="font-semibold">My Sessions</Label>
                </Dropdown.Item>
              </Dropdown.Section>
              <Separator orientation="horizontal" />
              <Dropdown.Section>
                <Dropdown.Item
                  id="copy-link"
                  textValue="Copy link"
                  variant="danger"
                  onClick={signout}
                >
                  <LogOutIcon className="size-4 text-danger" />
                  <Label className="font-semibold">Sign Out</Label>
                </Dropdown.Item>
              </Dropdown.Section>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>
    </header>
  );
}
