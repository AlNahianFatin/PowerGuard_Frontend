"use client";

import { toast } from "@/components/ui/toast";
import { useGoogleOAuth } from "@/hooks";
import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface GoogleLoginComponentProps {
  onPendingChange: (pending: boolean) => void;
}

export default function GoogleLoginComponent({
  onPendingChange,
}: GoogleLoginComponentProps) {
  const router = useRouter();
  const { mutate: googleLogin, isPending: googlePending } = useGoogleOAuth();

  useEffect(() => {
    onPendingChange(googlePending);
  }, [googlePending, onPendingChange]);

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.add({
        title: "Google OAuth Failed",
        description: "Something went wrong. Please try again",
        type: "error",
      });
      return;
    }

    googleLogin(
      { idToken },
      {
        // biome-ignore lint/suspicious/noExplicitAny: <sd>
        onSuccess: (res: any) => {
          toast.add({
            title: "Logged in Successfully",
            description: res.data?.message || res.message || "Welcome back",
            type: "success",
          });
          router.push("/");
        },
        // biome-ignore lint/suspicious/noExplicitAny: <sad>
        onError: (err: any) => {
          toast.add({
            title: "Google OAuth Failed",
            description:
              err.data?.message || err.message || "Something went wrong. Please try again",
            type: "error",
          });
        },
      },
    );
  };

  // biome-ignore lint/suspicious/noExplicitAny: <sd>
  const handleGoogleError = (err: any) => {
    toast.add({
      title: "Google OAuth Failed",
      description: err.data?.message || err.message || "Something went wrong. Please try again",
      type: "error",
    });
  };

  return (
    <GoogleLogin
      theme="outline"
      shape="pill"
      text="continue_with"
      onSuccess={handleGoogleSuccess}
      // biome-ignore lint/suspicious/noExplicitAny: <df>
      onError={(err?: any) => handleGoogleError(err)}
    />
  );
}
