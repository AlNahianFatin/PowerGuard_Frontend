"use client";

import { useForm } from "@tanstack/react-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { loginSchema } from "@/validation";
import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import { useGetMe, useLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";
import Link from "next/link";
import GoogleLoginComponent from "../modules/google-login/GoogleLogin";
import type { Role } from "@/types";

const dashboardRoute: Record<Role, string> = {
  ADMIN: "/admin",
  OPERATOR: "/operator",
  TECHNICIAN: "/technician",
  CUSTOMER: "/customer",
};

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [googlePending, setGooglePending] = useState(false);

  const { mutate: login, isPending: loginPending } = useLogin();

  const isSubmitting = loginPending || googlePending;

  const { data } = useGetMe();
  const role: Role = !!data?.data && data?.data.role;

  const form = useForm({
    // defaultValues: {
    //   email: "",
    //   password: "",
    // },
    defaultValues: {
      email: "testeradmin@powergurard.com",
      password: "Tester@admin12345",
    },
    // defaultValues: {
    //   email: "testeroperator@powergurard.com",
    //   password: "Tester@operator12345",
    // },
    // defaultValues: {
    //   email: "testertechnician@powergurard.com",
    //   password: "Tester@technician12345",
    // },
    // defaultValues: {
    //   email: "testercustomer@powergurard.com",
    //   password: "Tester@customer12345",
    // },
    validators: {
      onChange: loginSchema,
      onSubmit: loginSchema,
    },
    onSubmit: ({ value }) => {
      const loginData = {
        email: value.email,
        password: value.password,
      };

      login(loginData, {
        onSuccess: (res) => {
          toast.add({
            title: "Login Success",
            description: res.message ?? "Welcome back",
            type: "success",
          });
          
          if (role) {
            router.push(`${dashboardRoute[role]}`);
            return;
          }

          toast.add({
            title: "Authorization failure",
            description:
              res.data?.message ||
              res.message ||
              "Could not identify your authorization. Please login again",
            type: "error",
          });
          router.push("/login");
        },
        // biome-ignore lint/suspicious/noExplicitAny: <sd>
        onError: (err: any) => {
          toast.add({
            title: "Authorization failure",
            description:
              err.data?.message ||
              "Something went wrong. Please try again",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Login to your account
        </h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="email">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

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

          <form.Field name="password">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      value={field.state.value}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                    />
                    <button
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <EyeClosed className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <Link href="/forgot-password" className="text-right text-sm text-muted-foreground font-medium hover:text-primary">
            Forgot Password?
          </Link>

          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? (
              <>
                <Spinner /> Submitting
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </FieldGroup>
      </form>

      <FieldSeparator>Or continue with</FieldSeparator>

      <GoogleLoginComponent onPendingChange={setGooglePending} />

      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
