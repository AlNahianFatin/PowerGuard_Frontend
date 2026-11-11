// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "../ui/card";
// import { Button } from "../ui/button";
// import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
// import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
// import { useEffect, useState } from "react";
// import { REGEXP_ONLY_DIGITS } from "input-otp";
// import { useVerifyAccount, useVerifyTechnicianAccount } from "@/hooks";
// import { toast } from "../ui/toast";
// import { Spinner } from "../ui/spinner";

// const RESEND_COOLDOWN = 120;

// export default function VerifyAccountForm({
//   mode = "customer",
// }: {
//   mode: "technician" | "customer";
// }) {
//   const searchParams = useSearchParams();
//   const router = useRouter();

//   const [otp, setOtp] = useState("");
//   const [isInvalid, setIsInvalid] = useState(false);
//   const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);

//   const { mutate: verifyCustomer, isPending: verificationPending } = useVerifyAccount();
//   const { mutate: verifyTechnician, isPending: technicianVerificationPending } = useVerifyTechnicianAccount();

//   const verify = mode === "technician" ? verifyTechnician : verifyCustomer;

//   const email = searchParams.get("email") || "";

//   useEffect(() => {
//     if (!email) {
//       router.push("/");
//     }
//   }, [email, router]);

//   useEffect(() => {
//     if (resendTimer <= 0) {
//       return;
//     }

//     const timer = setInterval(() => {
//       setResendTimer((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [resendTimer]);

//   const handleResend = () => {
//     const verifyData = {
//       email,
//       otp,
//     };

//     verify(verifyData, {
//       // biome-ignore lint/suspicious/noExplicitAny: <fdgs>
//       onSuccess: (res: any) => {
//         if (!res.success) {
//           toast.add({
//             title: "Server Failure",
//             description: res.data?.message || res.message || "Something went wrong. Please try again",
//             type: "error",
//           });
//         }

//         if (mode === "technician") {
//           toast.add({
//             title: "Verification Successful",
//             description:
//               res.message || "An admin will approve your account. This may take time. Please check your email in few days",
//             type: "success",
//           });
//           router.push("/");

//           return;
//         }

//         toast.add({
//           title: "Verification Successful",
//           description: res.message || "Welcome onboard",
//           type: "success",
//         });
//         router.push("/");
//       },
//       // biome-ignore lint/suspicious/noExplicitAny: <fgsf>
//       onError: (err: any) => {
//         toast.add({
//           title: "Verification failure",
//           description: err.data?.message || err.message || "Something went wrong. Please try again",
//           type: "error",
//         });
//       },
//     });
//   };

//   const handleOTP = () => {
//     if (otp.length !== 6) {
//       setIsInvalid(true);
//       return;
//     }

//     const verifyData = {
//       email,
//       otp,
//     };

//     verify(verifyData, {
//       // biome-ignore lint/suspicious/noExplicitAny: <fdgs>
//       onSuccess: (res: any) => {
//         if (!res.success) {
//           toast.add({
//             title: "Server Failure",
//             description: res.data?.message || res.message || "Something went wrong. Please try again",
//             type: "error",
//           });
//         }

//         if (mode === "technician") {
//           toast.add({
//             title: "Verification Successful",
//             description:
//               res.message || "An admin will approve your account. This may take time. Please check your email in few days",
//             type: "success",
//           });
//           router.push("/");

//           return;
//         }

//         toast.add({
//           title: "Verification Successful",
//           description: res.message || "Welcome onboard",
//           type: "success",
//         });
//         router.push("/");
//       },
//       // biome-ignore lint/suspicious/noExplicitAny: <fgsf>
//       onError: (err: any) => {
//         toast.add({
//           title: "Verification failure",
//           description: err.data?.message || err.message || "Something went wrong. Please try again",
//           type: "error",
//         });
//       },
//     });
//   };

//   if (!email) {
//     return null;
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Verify Account</CardTitle>
//         <CardDescription>
//           Please provide the OTP we send you in your email
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form
//           id="otp-form"
//           onSubmit={(e) => {
//             e.preventDefault();
//             e.stopPropagation();
//             handleOTP();
//           }}
//         >
//           <Field data-invalid={isInvalid}>
//             <FieldLabel htmlFor="otp">OTP</FieldLabel>
//             <InputOTP
//               maxLength={6}
//               onChange={(value) => {
//                 setOtp(value);
//                 if (isInvalid) {
//                   setIsInvalid(false);
//                 }
//               }}
//               value={otp}
//               autoComplete="off"
//               name="otp"
//               id="otp"
//               pattern={REGEXP_ONLY_DIGITS}
//             >
//               <InputOTPGroup>
//                 <InputOTPSlot index={0} />
//                 <InputOTPSlot index={1} />
//                 <InputOTPSlot index={2} />
//                 <InputOTPSlot index={3} />
//                 <InputOTPSlot index={4} />
//                 <InputOTPSlot index={5} />
//               </InputOTPGroup>
//             </InputOTP>
//             {isInvalid && (
//               <FieldError
//                 errors={[{ message: "Invalid Code. Please try again" }]}
//               />
//             )}
//             <FieldDescription>Resend in {resendTimer}</FieldDescription>
//           </Field>
//         </form>
//       </CardContent>
//       <CardFooter>
//         {/* <Button disabled={resendTimer > 0}>Resend</Button> */}
//         <Button disabled={resendTimer > 0} onClick={handleResend}>
//           {resendPending ? (
//             <>
//               <Spinner /> Resending
//             </>
//           ) : (
//             "Resend"
//           )}
//         </Button>
//         <Button disabled={verificationPending || technicianVerificationPending} type="submit" form="otp-form">
//           {verificationPending || technicianVerificationPending ? (
//             <>
//               <Spinner /> Submitting
//             </>
//           ) : (
//             "Submit"
//           )}
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }







"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import {
  useVerifyAccount,
  useVerifyTechnicianAccount,
  useResendAccountOtp,
} from "@/hooks";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";

const RESEND_COOLDOWN = 5;

export default function VerifyAccountForm({
  mode = "customer",
}: {
  mode: "technician" | "customer";
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
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
  } = useResendAccountOtp();

  // const {
  //   mutate: resendTechnicianOtp,
  //   isPending: technicianResendPending,
  // } = useResendTechnicianAccountOtp();

  const email = searchParams.get("email")?.trim().toLowerCase() || "";

  const verificationPendingState =
    verificationPending || technicianVerificationPending;

  useEffect(() => {
    if (!email) {
      router.replace("/");
    }
  }, [email, router]);

  useEffect(() => {
    if (resendTimer <= 0) return;

    const timer = setInterval(() => {
      setResendTimer((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleResend = () => {
    if (!email || resendTimer > 0 || resendOtpPending) return;

    resendOtp(
      { email },
      {
        // biome-ignore lint/suspicious/noExplicitAny: <reyery>
        onSuccess: (res: any) => {
          if (!res.success) {
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

          setOtp("");
          setIsInvalid(false);

          toast.add({
            title: "OTP Sent",
            description:
              res.message || "A new verification OTP has been sent to your email.",
            type: "success",
          });
        },
        // biome-ignore lint/suspicious/noExplicitAny: <rgre>
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
      },
    );
  };

  const handleOTP = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    const verifyData = { email, otp };

    const verifyMutation =
      mode === "technician" ? verifyTechnician : verifyCustomer;

    verifyMutation(verifyData, {
      // biome-ignore lint/suspicious/noExplicitAny: <sgs>
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
              res.message ||
              "An admin will approve your account. Please check your email in a few days.",
            type: "success",
          });

          router.push("/");
          return;
        }

        toast.add({
          title: "Verification Successful",
          description: res.message || "Welcome onboard!",
          type: "success",
        });

        router.push("/");
      },
      // biome-ignore lint/suspicious/noExplicitAny: <rg>
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
  };

  const formatTimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };

  if (!email) return null;

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
          id="otp-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOTP();
          }}
        >
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor="otp">OTP</FieldLabel>

            <InputOTP
              maxLength={6}
              onChange={(value) => {
                setOtp(value);
                if (isInvalid) setIsInvalid(false);
              }}
              value={otp}
              autoComplete="off"
              name="otp"
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
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
              <FieldError
                errors={[
                  { message: "Please enter a valid 6-digit OTP." },
                ]}
              />
            )}

            <FieldDescription>
              {resendTimer > 0
                ? `Resend available in ${formatTimer(resendTimer)}`
                : "Didn't receive the OTP? You can resend it now."}
            </FieldDescription>
          </Field>
        </form>
      </CardContent>

      <CardFooter className="flex justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={resendTimer > 0 || resendOtpPending}
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
          form="otp-form"
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
