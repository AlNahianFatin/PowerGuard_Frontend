"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

import AuthGuard from "@/components/auth/auth-guard";
import Footer from "@/components/layout/public/Footer";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import { DashboardNotification } from "@/components/dashboard/dashboard-notification";

const routes = [
  { name: "Home", url: "/" },
  // { name: "Schedules", url: "/schedules" },
  { name: "About us", url: "/about-us" },
];

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetMe();
  const { mutate: logout, isPending: isLogoutPending } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Logout failed",
            description: res.data?.message || res.message || "Something Went Wrong",
            type: "error",
          });

          return;
        }
        toast.add({
          title: "See you soon!",
          description: res.message || "Logged out successfully",
          type: "success",
        });

        queryClient.removeQueries({ queryKey: ["user"] });

        router.push("/login");
      },
      // biome-ignore lint/suspicious/noExplicitAny: <sd>
      onError: (error: any) => {
        toast.add({
          title: "Logout failed",
          description: error.data?.message || "Something Went Wrong",
          type: "error",
        });
      },
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Navigation */}
      <header className="w-full border-b">
        <div className="mx-auto flex h-16 w-full items-center justify-center px-4">
          <nav className="flex items-center gap-5">
            {routes.map((route) => (
              <Link
                key={route.url}
                href={route.url}
                className="rounded-lg p-1 text-primary transition-colors hover:bg-primary hover:text-white"
              >
                {route.name}
              </Link>
            ))}
          </nav>

          {!isLoading && data && (
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="ml-10"
              disabled={isLogoutPending}
            >
              {isLogoutPending ? (
                <>
                  <Spinner />
                  Logging out
                </>
              ) : (
                "Logout"
              )}
            </Button>
          )}
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-1">
        {
          data?.data?.needPasswordChange &&
          <DashboardNotification message="Please update your password right now!" link="/technician/change-password" importance="URGENT" />
          // <div className="flex justify-end">
          //   <div className="relative flex items-center px-3 py-2 bg-red-200 shadow-2xl border-red-600 w-full justify-center border-b">
          //     <p>Please update your password right now!&nbsp;
          //       <Link href="/technician/change-password" className="underline hover:text-primary">Click here</Link>
          //     </p>
          //     {/* <button
          //       type="button"
          //       className="group absolute z-99 top-[-5] right-[-5] rounded-full bg-red-300 p-1 hover:bg-red-400 transition hover:outline-1 hover:outline-black"
          //       aria-label="Dismiss password reminder"
          //     >
          //       <X className="text-red-600 size-3  group-hover:text-black" />
          //     </button> */}
          //   </div>
          // </div>

        }
        <AuthGuard>{children}</AuthGuard>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
