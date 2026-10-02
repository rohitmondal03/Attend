"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Avatar, Button, Header, Label, Separator, toast } from "@heroui/react";
import {
  SettingsIcon,
  LogOutIcon,
  PlusIcon,
  DiamondPlusIcon,
  LayersPlusIcon,
  ChevronsUpDownIcon,
  NotebookIcon,
  BookmarkIcon,
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
const CoursesTableModal = dynamic(() =>
  import("./courses-table-modal").then((mod) => mod.CoursesTableModal),
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
  const [isCoursesTableModalOpen, setIsCoursesTableModalOpen] = useState(false);

  // Sign out user
  const signout = async () => {
    await signoutAction().then(() => {
      toast.success(<p className="font-bold">Signed Out Successfully</p>);

      redirect(ROUTES.home);
    });
  };

  return (
    <>
      <header className="fixed w-full top-0 left-0 py-4 px-10 border-b-2 border-default-foreground flex items-center justify-between bg-zinc-200 z-10">
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

          {/* Ongoing session Link */}
          {/* <Link
            href={ROUTES.dashboard}
            className={buttonVariants({
              variant: "danger-soft",
              className: "flex items-center font-semibold gap-0",
            })}
          >
            <DotIcon className="animate-pulse size-8" />
            Ongoing Session
          </Link> */}

          {/* Avatar Dropdown with User Info, Profile, Logout */}
          <Dropdown>
            <DropdownTrigger className="flex items-center justify-center gap-4 py-1 px-4 rounded-3xl bg-background">
              <div className="text-left">
                <p className="text-xs">{userName}</p>
                <p className="text-xs text-muted">{userEmail}</p>
              </div>
              <div className="flex items-center justify-between">
                <Avatar className="rounded-full size-10">
                  <Avatar.Image alt="user-avatar" src={"/self-photo.jpeg"} />
                  <Avatar.Fallback>R</Avatar.Fallback>
                </Avatar>
                <ChevronsUpDownIcon className="size-4 text-muted" />
              </div>
            </DropdownTrigger>
            <DropdownPopover>
              <DropdownMenu className="font-bold py-4 space-y-2">
                <DropdownSection className="space-y-1">
                  <Header className="py-0">Institution - IIIT Allahabad</Header>
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
                </DropdownSection>
                <Separator orientation="horizontal" />
                <DropdownSection className="font-bold">
                  <DropdownItem
                    id="courses"
                    textValue="Your Courses"
                    className="font-bold"
                    onPress={() => setIsCoursesTableModalOpen(true)}
                  >
                    <NotebookIcon className="size-4" />
                    <Label className="font-semibold">Your Courses</Label>
                  </DropdownItem>
                  <DropdownItem
                    id="attendance-sessions"
                    textValue="Attendance Sessions"
                    className="font-bold"
                    onPress={() => redirect(ROUTES.dashboard + "#sessions")}
                  >
                    <BookmarkIcon className="size-4" />
                    <Label className="font-semibold">Attendance Sessions</Label>
                  </DropdownItem>
                  <DropdownItem
                    id="add-new-course"
                    textValue="Add New Course"
                    className="font-bold"
                    onPress={() => setIsNewCourseModalOpen(true)}
                  >
                    <LayersPlusIcon className="size-4" />
                    <Label className="font-semibold">Add New Course</Label>
                  </DropdownItem>
                </DropdownSection>
                <Separator orientation="horizontal" />
                <DropdownSection>
                  <DropdownItem
                    id="copy-link"
                    textValue="Copy link"
                    variant="danger"
                    onPress={signout}
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
        setIsNewCourseModalOpen={setIsNewCourseModalOpen}
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
      <CoursesTableModal
        isOpen={isCoursesTableModalOpen}
        onClose={() => setIsCoursesTableModalOpen(false)}
      />
    </>
  );
}
