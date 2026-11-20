"use client"; // Error components must be Client Components

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
}

export default function ErrorPage({ error }: ErrorProps) {
  useEffect(() => {
    console.error("Route error:", error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="mt-3 text-3xl font-semibold text-zinc-900">
        Something went wrong!
      </h1>
      <p className="mt-5 text-lg">
        {error.digest
          ? `Error ID: ${error.digest}`
          : "An unexpected error occurred"}
      </p>
      <p className="mt-5 text-red-500 text-md max-w-2xl">Error:&nbsp;
        {error.name ?? "An unexpected error occurred"}
      </p>
      <Button
        onClick={() => window.location.reload()}
        className="mt-5 w-full sm:w-auto inline-flex items-center justify-center rounded-xl font-semibold text-sm px-5 py-5"
      >
        Try again
      </Button>
    </main>
  );
}
