"use client";

import { Button, toast } from "@heroui/react";
import { signoutAction } from "@/actions/auth";

export default function DashboardPage() {
  // signout function
  const signout = async () => {
    await signoutAction().then(() => {
      toast("Signout", {
        description: "Signout successfull",
        variant: "success",
      });
    });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <Button variant="danger" onClick={signout}>
        Sign out
      </Button>
    </div>
  );
}
