import { SubmitRequestForm } from "@/components/form/submit-request-form";
import AppointmentList from "@/components/modules/my-appointments/appointment-list";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default function SubmitRequestPage() {
  return (
    // <div className="m-10">
    //   <h1> My Appointments </h1>
    //   <AppointmentList />
    // </div>

    <div className="grid min-h-svh lg:grid-cols-2">

      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Power Guard logo"
                width={50}
                height={50}
                unoptimized
                loading="eager"
              />
              <p className="text-2xl font-bold text-primary">
                Power Guard
              </p>
            </div>
          </Link>
        </div> */}

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Suspense fallback={<p>Loading...</p>}>
              <SubmitRequestForm />
            </Suspense>
          </div>
        </div>
      </div>

      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/submit-request.jpg"
          alt="Power Guard submit request background"
          fill
          priority
          unoptimized
          sizes="100vh"
          className="object-cover dark:brightness-[0.2] dark:grayscale" loading="eager"
        />
      </div>
    </div>
  );
}
