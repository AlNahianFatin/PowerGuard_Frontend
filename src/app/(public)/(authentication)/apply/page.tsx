import Image from "next/image";
import Link from "next/link";
import TechnicianApplyForm from "@/components/form/technician-apply-form";

export default function ApplyPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-3">
      <div className="flex flex-col col-span-2 gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Power Guard logo"
                width={50}
                height={50}
                loading="eager"
                unoptimized
              />
              <p className="font-bold text-primary text-2xl">Power Guard</p>
            </div>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xl">
            <TechnicianApplyForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/login.jpg"
          alt="Power Guard login background"
          fill
          priority
          unoptimized
          sizes="50vw"
          className="object-cover dark:brightness-[0.2] dark:grayscale" loading="eager"
        />
      </div>
    </div>
  );
}
