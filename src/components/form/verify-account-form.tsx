"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  useVerifyAccount,
  useVerifyTechnicianAccount,
  useResendOtp,
} from "@/hooks";

import { ResendOtpSchema, UserVerificationSchema } from "@/validation";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
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

const RESEND_COOLDOWN = 5 * 60;

export default function VerifyAccountForm({
  mode = "customer",
}: {
  mode: "technician" | "customer";
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email")?.trim().toLowerCase() ?? "";

  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

  const {
    mutate: verifyCustomer,
    isPending: verificationPending,
  } = useVerifyAccount();

  const {
    mutate: verifyTechnician,
    isPending: technicianVerificationPending,
  } = useVerifyTechnicianAccount();

  const {
    mutate: resendOtp,
    isPending: resendOtpPending,
  } = useResendOtp();

  const verificationPendingState =
    verificationPending || technicianVerificationPending;

  useEffect(() => {
    if (!email) {
      router.replace("/register");
    }
  }, [email, router]);

  useEffect(() => {
    if (resendTimer <= 0) return;

    const timer = setInterval(() => {
      setResendTimer((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  const form = useForm({
    defaultValues: {
      otp: "",
    },

    validators: {
      onChange: UserVerificationSchema,
      onSubmit: UserVerificationSchema,
    },

    onSubmit: ({ value }) => {
      const verifyData = {
        email,
        otp: value.otp,
      };

      const verifyMutation =
        mode === "technician" ? verifyTechnician : verifyCustomer;

      verifyMutation(verifyData, {
        // biome-ignore lint/suspicious/noExplicitAny: API response
        onSuccess: (res: any) => {
          if (res?.success === false) {
            toast.add({
              title: "Verification Failed",
              description:
                res.data?.message ||
                res.message ||
                "Something went wrong. Please try again.",
              type: "error",
            });

            return;
          }

          if (mode === "technician") {
            toast.add({
              title: "Verification Successful",
              description:
                res?.message ||
                "An admin will approve your account. Please check your email in a few days.",
              type: "success",
            });

            router.push("/");
            return;
          }

          toast.add({
            title: "Verification Successful",
            description: res?.message || "Welcome onboard!",
            type: "success",
          });

          router.push("/");
        },

        // biome-ignore lint/suspicious/noExplicitAny: API error
        onError: (err: any) => {
          toast.add({
            title: "Verification Failed",
            description:
              err.data?.message ||
              err.message ||
              "Something went wrong. Please try again.",
            type: "error",
          });
        },
      });
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
        // biome-ignore lint/suspicious/noExplicitAny: API response
        onSuccess: (res: any) => {
          if (res?.success === false) {
            toast.add({
              title: "Resend Failed",
              description:
                res.data?.message ||
                res.message ||
                "Unable to resend OTP. Please try again.",
              type: "error",
            });

            return;
          }

          setResendTimer(RESEND_COOLDOWN);

          form.resetField("otp");

          toast.add({
            title: "OTP Sent",
            description:
              res?.message ||
              "A new verification OTP has been sent to your email.",
            type: "success",
          });
        },

        // biome-ignore lint/suspicious/noExplicitAny: API error
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
        <CardTitle>Verify Account</CardTitle>

        <CardDescription>
          Please provide the OTP we sent to your email.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="verify-account-form"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="otp">
              {(field) => {
                const isInvalid = field.state.meta.errors.length > 0;

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
                      autoComplete="one-time-code"
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

            <FieldDescription>
              {resendTimer > 0
                ? `Resend available in ${formatTimer(resendTimer)}`
                : "Didn't receive the OTP? You can resend it now."}
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
            verificationPendingState
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
          form="verify-account-form"
          disabled={verificationPendingState || resendOtpPending}
        >
          {verificationPendingState ? (
            <>
              <Spinner />
              Submitting
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}