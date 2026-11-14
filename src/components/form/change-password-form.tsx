"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import {
  useChangePassword,
} from "@/hooks";
import { ChangePasswordSchema } from "@/validation";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import { Eye, EyeOff } from "lucide-react";

export default function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const {
    mutate: changePassword,
    isPending: changePasswordPending,
  } = useChangePassword();

  const form = useForm({
    defaultValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },

    validators: {
      onChange: ChangePasswordSchema,
      onSubmit: ChangePasswordSchema,
    },

    onSubmit: ({ value }) => {
      changePassword(
        {
          password: value.password,
          newPassword: value.newPassword,
          confirmNewPassword: value.confirmNewPassword,
        },
        {
          // biome-ignore lint/suspicious/noExplicitAny: <f>
          onSuccess: (res: any) => {
            if (!res.success) {
              toast.add({
                title: "Password Change Failed",
                description:
                  res.data?.message ||
                  res.message ||
                  "Unable to change your password.",
                type: "error",
              });
              return;
            }

            toast.add({
              title: "Password Change Successful",
              description:
                res?.message || "Your password has been changed successfully.",
              type: "success",
            });

            form.reset();

            setShowPassword(false);
            setShowNewPassword(false);
            setShowConfirmNewPassword(false);
          },

          // biome-ignore lint/suspicious/noExplicitAny: <af>
          onError: (err: any) => {
            toast.add({
              title: "Password Change Failed",
              description:
                err.data?.message ||
                "Something went wrong. Please try again.",
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Please provide the current password for verification and new password to be set.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="change-password-form"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="password">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Current Password
                    </FieldLabel>

                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your current password"
                        autoComplete="Password"
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="newPassword">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      New Password
                    </FieldLabel>

                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter your new password"
                        autoComplete="newPassword"
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword((prev) => !prev)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                        aria-label={
                          showNewPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showNewPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            <form.Field name="confirmNewPassword">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirm New Password
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type={showConfirmNewPassword ? "text" : "password"}
                        placeholder="Confirm your new password"
                        autoComplete="new-password"
                        value={field.state.value}
                        onChange={(event) =>
                          field.handleChange(event.target.value)
                        }
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmNewPassword((prev) => !prev)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                        aria-label={
                          showConfirmNewPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showConfirmNewPassword ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </button>
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center gap-3">
        <Button
          type="submit"
          form="change-password-form"
          disabled={changePasswordPending}
        >
          {changePasswordPending ? (
            <>
              <Spinner />
              Updating
            </>
          ) : (
            "Update Password"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}