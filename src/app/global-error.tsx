"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface GlobalErrorProps {
  globalError: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ globalError, reset }: GlobalErrorProps) {
  const router = useRouter();
  useEffect(() => {
    console.error("Global error:", globalError);
  }, [globalError]);

  return (
    <html lang="en">
      <body className="flex flex-col justify-center items-center min-h-screen min-w-screen">
        <div className=" max-w-7xl min-w-5 max-h-7xl min-h-56 rounded-2xl text-center sm:px-8 sm:py-4">
          <div className="text-center">
            <h2 className="text-3xl font-semibold font-sans-serif">
              Application Error
            </h2>
            <p className="mt-3 text-muted-foreground text-md">
              The application encountered a critical error.
            </p>
            <Button
              onClick={() => router.refresh()}
              className="mt-3 w-full sm:w-auto inline-flex items-center justify-center rounded-xl font-semibold text-sm px-3 py-3"
            >
              Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
