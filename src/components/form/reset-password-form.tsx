"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  useGetMe,
  useResendOtp,
  useResetPassword,
} from "@/hooks";

import { ResendOtpSchema, ResetPasswordSchema } from "@/validation";
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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../ui/input-otp";
import { Eye, EyeOff } from "lucide-react";
import type { Role } from "@/types";

const RESEND_COOLDOWN = 5 * 60;

const dashboardRoute: Record<Role, string> = {
  ADMIN: "/admin",
  OPERATOR: "/operator",
  TECHNICIAN: "/technician",
  CUSTOMER: "/customer",
};

export default function ResetPasswordForm() {
  const router = useRouter();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const searchParams = useSearchParams();

  const email = searchParams.get("email")?.trim().toLowerCase() ?? "";

  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const { data } = useGetMe();
  const role: Role = !!data?.data && data?.data.role;

  const {
    mutate: resendOtp,
    isPending: resendOtpPending,
  } = useResendOtp();

  const {
    mutate: resetPassword,
    isPending: resetPasswordPending,
  } = useResetPassword();

  useEffect(() => {
    if (!email) {
      router.replace("/forgot-password");
    }
  }, [email, router]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer((previous) =>
        previous > 0 ? previous - 1 : 0,
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const form = useForm({
    defaultValues: {
      email,
      otp: "",
      newPassword: "",
      confirmNewPassword: "",
    },

    validators: {
      onChange: ResetPasswordSchema,
      onSubmit: ResetPasswordSchema,
    },

    onSubmit: ({ value }) => {
      resetPassword(
        {
          email,
          otp: value.otp,
          newPassword: value.newPassword,
          confirmNewPassword: value.confirmNewPassword,
        },
        {
          // biome-ignore lint/suspicious/noExplicitAny: <f>
          onSuccess: (res: any) => {
            if (!res?.success) {
              toast.add({
                title: "Password Reset Failed",
                description:
                  res.data?.message ||
                  res.message ||
                  "Unable to reset your password.",
                type: "error",
              });
              return;
            }

            toast.add({
              title: "Password Reset Successful",
              description:
                res?.message || "Your password has been updated successfully.",
              type: "success",
            });

            if (role) {
              router.push(`${dashboardRoute[role]}`);
              return;
            }
          },

          // biome-ignore lint/suspicious/noExplicitAny: <af>
          onError: (err: any) => {
            toast.add({
              title: "Password Reset Failed",
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

  const resendForm = useForm({
    defaultValues: {
      email,
    },

    validators: {
      onSubmit: ResendOtpSchema,
    },

    onSubmit: ({ value }) => {
      resendOtp(value, {
        // biome-ignore lint/suspicious/noExplicitAny: <df>
        onSuccess: (res: any) => {
          if (res?.success === false) {
            toast.add({
              title: "Resend Failed",
              description:
                res.data?.message ||
                "Unable to resend OTP. Please try again.",
              type: "error",
            });
            return;
          }

          setResendTimer(RESEND_COOLDOWN);

          form.setFieldValue("otp", "");

          toast.add({
            title: "OTP Sent",
            description:
              res?.message || "A new OTP has been sent to your email.",
            type: "success",
          });
        },

        // biome-ignore lint/suspicious/noExplicitAny: <sdv>
        onError: (err: any) => {
          toast.add({
            title: "Resend Failed",
            description:
              err.data?.message ||
              err.message ||
              "Unable to resend OTP. Please try again.",
            type: "error",
          });
        },
      });
    },
  });

  const handleResend = () => {
    if (!email || resendTimer > 0 || resendOtpPending) {
      return;
    }

    void resendForm.handleSubmit();
  };

  const formatTimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };

  if (!email) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>
          Please provide the OTP we sent to your email.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="reset-password-form"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="otp">
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      OTP
                    </FieldLabel>

                    <InputOTP
                      id={field.name}
                      name={field.name}
                      maxLength={6}
                      value={field.state.value}
                      onChange={(value) => field.handleChange(value)}
                      onBlur={field.handleBlur}
                      pattern={REGEXP_ONLY_DIGITS}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>

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

            <FieldDescription>
              {resendTimer > 0
                ? `You can request another OTP in ${formatTimer(resendTimer)}`
                : "Didn't receive the OTP? You can request another one now."}
            </FieldDescription>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={
            resendTimer > 0 ||
            resendOtpPending ||
            resetPasswordPending
          }
          onClick={handleResend}
        >
          {resendOtpPending ? (
            <>
              <Spinner />
              Resending
            </>
          ) : (
            "Resend OTP"
          )}
        </Button>

        <Button
          type="submit"
          form="reset-password-form"
          disabled={resetPasswordPending || resendOtpPending}
        >
          {resetPasswordPending ? (
            <>
              <Spinner />
              Resetting
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}