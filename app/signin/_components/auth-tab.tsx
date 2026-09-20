import { CheckIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  toast,
  Tabs,
} from "@heroui/react";
import { loginwithEmailAction, signupwithEmailAction } from "@/actions/auth";
import { ROUTES } from "@/lib/routes";

export function AuthFormTab() {
  const { push: redirect } = useRouter();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Email signup
  const signupwithEmail = async () => {
    setIsLoading(true);

    await signupwithEmailAction(formValues)
      .then(() => {
        toast("Sign up successfull !", {
          timeout: 4000,
          variant: "success",
        });

        redirect(ROUTES.dashboard);
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

  // Email login
  const loginwithEmail = async () => {
    setIsLoading(true);

    await loginwithEmailAction(formValues)
      .then(() => {
        toast("Login successfull !", {
          timeout: 4000,
          variant: "success",
        });

        redirect(ROUTES.dashboard);
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

  return (
    <Tabs className="w-full max-w-md h-80">
      <Tabs.ListContainer>
        <Tabs.List aria-label="Options">
          <Tabs.Tab id="login" className="font-semibold">
            Already a user
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="signup" className="font-semibold">
            New user
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel className="pt-4" id="login">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            loginwithEmail();
          }}
          className="w-80 space-y-4"
        >
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
            <Description>Password should have atleast 8 characters</Description>
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
      </Tabs.Panel>
      <Tabs.Panel className="pt-4" id="signup">
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
            <Description>Password should have atleast 8 characters</Description>
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
      </Tabs.Panel>
    </Tabs>
  );
}
