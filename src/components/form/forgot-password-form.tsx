"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import {
  useForgotPassword,
} from "@/hooks";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { ForgotPasswordSchema } from "@/validation";

export default function ForgotPasswordForm() {
  const router = useRouter();

  const {
    mutate: sendOtp,
    isPending: sendOtpPending,
  } = useForgotPassword();

  const form = useForm({
    defaultValues: {
      email: "",
    },
    // defaultValues: {
    //   email: "superadmin@gmail.com",
    // },
    validators: {
      onChange: ForgotPasswordSchema,
      onSubmit: ForgotPasswordSchema,
    },
    onSubmit: ({ value }) => {
      const sendOtpData = {
        email: value.email,
      };

      sendOtp(sendOtpData, {
        // biome-ignore lint/suspicious/noExplicitAny: <dfw>
        onSuccess: (res: any) => {
          toast.add({
            title: "OTP sent",
            description: res.message ?? "Check your email",
            type: "success",
          });
          
          const params = new URLSearchParams({ email: sendOtpData.email });
          router.push(`/forgot-password/reset-password?${params.toString()}`);
        },
        // biome-ignore lint/suspicious/noExplicitAny: <sd>
        onError: (err: any) => {
          toast.add({
            title: "OTP sending failure",
            description:
              err.data?.message ||
              err.message ||
              "Something went wrong. Please try again",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>
          Please enter your email to receive an OTP to reset your password.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      // autoComplete="off"
                      aria-invalid={isInvalid}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                );
              }}
            </form.Field>

            <Button disabled={sendOtpPending} type="submit">
              {sendOtpPending ? (
                <>
                  <Spinner /> Submitting
                </>
              ) : (
                "Submit"
              )}
            </Button>

          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
