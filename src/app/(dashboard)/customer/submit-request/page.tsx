import { SubmitRequestForm } from "@/components/form/submit-request-form";
import Image from "next/image";
import { Suspense } from "react";

export default function SubmitRequestPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">

      <div className="flex flex-col gap-4 p-6 md:p-10">
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
