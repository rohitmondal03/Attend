"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Avatar, Button, Header, Label, Separator, toast } from "@heroui/react";
import {
  SettingsIcon,
  LogOutIcon,
  NotebookIcon,
  PlusIcon,
  DotIcon,
} from "lucide-react";
import { signoutAction } from "@/actions/auth";
import { ROUTES } from "@/lib/routes";
import { Logo } from "@/components/shared/logo";

const Dropdown = dynamic(() =>
  import("@heroui/react").then((mod) => mod.Dropdown),
);
const DropdownTrigger = dynamic(() =>
  import("@heroui/react").then((mod) => mod.Dropdown.Trigger),
);
const DropdownPopover = dynamic(() =>
  import("@heroui/react").then((mod) => mod.Dropdown.Popover),
);
const DropdownMenu = dynamic(() =>
  import("@heroui/react").then((mod) => mod.Dropdown.Menu),
);
const DropdownSection = dynamic(() =>
  import("@heroui/react").then((mod) => mod.Dropdown.Section),
);
const DropdownItem = dynamic(() =>
  import("@heroui/react").then((mod) => mod.Dropdown.Item),
);
const CreateAttendanceSessionModal = dynamic(() =>
  import("./create-attendance-session-modal").then(
    (mod) => mod.CreateAttendanceSessionModal,
  ),
);

export function DashboardHeader() {
  const { push: redirect } = useRouter();
  const [isNewSessionModalOpen, setIsNewSessionModalOpen] = useState(false);

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
    <header className="py-4 px-6 border-b border-border-tertiary flex items-center justify-between">
      <Logo />

      <div className="flex items-center justify-center gap-x-6">
        <Button
          className={"font-semibold"}
          onClick={() => setIsNewSessionModalOpen(true)}
        >
          <PlusIcon />
          Create new Session
        </Button>
        <CreateAttendanceSessionModal
          isOpen={isNewSessionModalOpen}
          onClose={() => setIsNewSessionModalOpen(false)}
        />

        <Button variant="danger-soft" className={"font-semibold gap-0"}>
          <DotIcon className="animate-pulse size-8" />
          Ongoing Session
        </Button>

        <Dropdown>
          <DropdownTrigger>
            <Avatar>
              <Avatar.Image alt="user-avatar" src={"/self-photo.jpeg"} />
              <Avatar.Fallback>R</Avatar.Fallback>
            </Avatar>
          </DropdownTrigger>
          <DropdownPopover>
            <DropdownMenu className="font-bold py-4 space-y-2">
              <DropdownSection className="space-y-1">
                <Header className="py-0 text-sm">Rohit Mondal</Header>
                <Header className="py-0">IIIT Allahabad</Header>
                <Header className="py-0">mse2026013@iiita.ac.in</Header>
              </DropdownSection>
              <Separator orientation="horizontal" />
              <DropdownSection className="font-bold">
                <DropdownItem
                  id="profile-settings"
                  textValue="Profile Settings"
                  className="font-bold"
                >
                  <SettingsIcon className="size-4" />
                  <Label className="font-semibold">Profile Settings</Label>
                </DropdownItem>
                <DropdownItem
                  id="my-sessions"
                  textValue="My Sessions"
                  className="font-bold"
                >
                  <NotebookIcon className="size-4" />
                  <Label className="font-semibold">My Sessions</Label>
                </DropdownItem>
              </DropdownSection>
              <Separator orientation="horizontal" />
              <DropdownSection>
                <DropdownItem
                  id="copy-link"
                  textValue="Copy link"
                  variant="danger"
                  onClick={signout}
                >
                  <LogOutIcon className="size-4 text-danger" />
                  <Label className="font-semibold">Sign Out</Label>
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </DropdownPopover>
        </Dropdown>
      </div>
    </header>
  );
}
