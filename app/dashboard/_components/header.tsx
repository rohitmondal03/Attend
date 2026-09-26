"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useState } from "react";
import {
  Avatar,
  Button,
  buttonVariants,
  Header,
  Label,
  Separator,
  toast,
} from "@heroui/react";
import {
  SettingsIcon,
  LogOutIcon,
  PlusIcon,
  DotIcon,
  DiamondPlusIcon,
  LayersPlusIcon,
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
const AddCourseModal = dynamic(() =>
  import("./add-course-modal").then((mod) => mod.AddCourseModal),
);
const ProfileSettingsModal = dynamic(() =>
  import("./profile-settings-modal").then((mod) => mod.ProfileSettingsModal),
);
const SessionsTableModal = dynamic(() =>
  import("./sessions-table-modal").then((mod) => mod.SessionsTableModal),
);

interface DasshboardHeaderProps {
  userEmail: string;
  userName: string;
}

export function DashboardHeader({
  userEmail,
  userName,
}: DasshboardHeaderProps) {
  const { push: redirect } = useRouter();
  const [isNewSessionModalOpen, setIsNewSessionModalOpen] = useState(false);
  const [isNewCourseModalOpen, setIsNewCourseModalOpen] = useState(false);
  const [isProfileSettingsModalOpen, setIsProfileSettingsModalOpen] =
    useState(false);
  const [isSessionsTableModalOpen, setIsSessionsTableModalOpen] =
    useState(false);

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
    <>
      <header className="py-4 px-6 border-b border-border-tertiary flex items-center justify-between">
        <Logo />

        <div className="flex items-center justify-center gap-6">
          {/* Create Button for NEW Session & Course addition */}
          <Dropdown>
            <Button className={"font-semibold"}>
              <PlusIcon />
              Create
            </Button>
            <DropdownPopover>
              <DropdownMenu>
                <DropdownSection>
                  <DropdownItem onPress={() => setIsNewSessionModalOpen(true)}>
                    <DiamondPlusIcon className="size-4" />
                    <Label className="font-semibold">
                      Create Attendance Session
                    </Label>
                  </DropdownItem>
                  <DropdownItem onPress={() => setIsNewCourseModalOpen(true)}>
                    <LayersPlusIcon className="size-4" />
                    <Label className="font-semibold">Add New Course</Label>
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </DropdownPopover>
          </Dropdown>

          {/* Ongioing session Link */}
          <Link
            href={ROUTES.dashboard}
            className={buttonVariants({
              variant: "danger-soft",
              className: "flex items-center font-semibold gap-0",
            })}
          >
            <DotIcon className="animate-pulse size-8" />
            Ongoing Session
          </Link>

          {/* Avatar Dropdown with User Info, Profile, Logout */}
          <Dropdown>
            <DropdownTrigger>
              <Avatar className="rounded-full">
                <Avatar.Image alt="user-avatar" src={"/self-photo.jpeg"} />
                <Avatar.Fallback>R</Avatar.Fallback>
              </Avatar>
            </DropdownTrigger>
            <DropdownPopover>
              <DropdownMenu className="font-bold py-4 space-y-2">
                <DropdownSection className="space-y-1">
                  <Header className="py-0 text-sm text-black">
                    {userName}
                  </Header>
                  <Header className="py-0">IIIT Allahabad</Header>
                  <Header className="py-0">{userEmail}</Header>
                </DropdownSection>
                <Separator orientation="horizontal" />
                <DropdownSection className="font-bold">
                  <DropdownItem
                    id="profile-settings"
                    textValue="Profile Settings"
                    className="font-bold"
                    onPress={() => setIsProfileSettingsModalOpen(true)}
                  >
                    <SettingsIcon className="size-4" />
                    <Label className="font-semibold">Profile Settings</Label>
                  </DropdownItem>
                  {/* <DropdownItem
                    id="my-sessions"
                    textValue="My Sessions"
                    className="font-bold"
                    onPress={() => setIsSessionsTableModalOpen(true)}
                  >
                    <NotebookIcon className="size-4" />
                    <Label className="font-semibold">My Sessions</Label>
                  </DropdownItem> */}
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

      {/* Create Attendance Session Modal */}
      <CreateAttendanceSessionModal
        isOpen={isNewSessionModalOpen}
        onClose={() => setIsNewSessionModalOpen(false)}
      />
      {/* Course addition Modal */}
      <AddCourseModal
        isOpen={isNewCourseModalOpen}
        onClose={() => setIsNewCourseModalOpen(false)}
      />
      {/* Profile Settings Modal */}
      <ProfileSettingsModal
        isOpen={isProfileSettingsModalOpen}
        onClose={() => setIsProfileSettingsModalOpen(false)}
        userName={userName}
        userEmail={userEmail}
      />
      {/* Users created Sessions */}
      <SessionsTableModal
        isOpen={isSessionsTableModalOpen}
        onClose={() => setIsSessionsTableModalOpen(false)}
      />
    </>
  );
}
