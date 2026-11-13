import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-lg font-semibold tracking-widest text-red-500 rounded-2xl bg-red-200/30 p-5">
        404
      </p>
      <h1 className="mt-3 text-3xl font-semibold text-zinc-900">
        Page not found
      </h1>
      <p className="mt-4 text-zinc-600">
        The URL may have changed, or the page may have been removed.
      </p>
      <Link
        href="/"
        className="mt-5 w-full sm:w-auto inline-flex items-center justify-center rounded-2xl font-semibold text-sm px-3 py-3 bg-blue-600 text-white"
      >
        Back to home
      </Link>
    </main>
  );
}
