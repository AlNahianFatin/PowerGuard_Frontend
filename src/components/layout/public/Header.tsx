"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { useGetMe, useLogout } from "@/hooks";
import type { Role } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const routes = [
    { name: "Home", url: "/" },
    { name: "Schedules", url: "/schedules" },
    { name: "About us", url: "/about-us" },
    // { name: "Apply for technician", url: "/apply" },
  ];

  const dashboardRoute: Record<Role, string> = {
    ADMIN: "/admin",
    OPERATOR: "/operator",
    TECHNICIAN: "/technician",
    CUSTOMER: "/customer",
  };

  const queryClient = useQueryClient();
  const { data, isLoading } = useGetMe();
  const { mutate: logout, isPending: isLogoutPending } = useLogout();

  const role: Role = !!data?.data && data?.data.role;

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: (res) => {
        toast.add({
          title: "See you soon!",
          description: res.message ?? "Logged out successfully",
          type: "success",
        });
        queryClient.removeQueries({ queryKey: ["user"] });
      },
      onError: (error) => {
        toast.add({
          title: "Logout failed",
          description: error.message ?? "Something Went Wrong",
          type: "error",
        });
      },
    });
  };

  return (
    <header className="w-full h-16 border border-b">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Power Guard logo"
            width={50}
            height={50}
            loading="eager"
            unoptimized
          />
          <div>
            <p className="font-bold text-primary text-2xl">Power Guard</p>
            <p className="font-medium text-md">Solving power outage lightning fast</p>
          </div>
        </div>

        <nav className="flex gap-5">
          {routes.map((route) => (
            <Link key={route.url} href={route.url} className="text-primary hover:text-white hover:bg-primary p-1 rounded-lg">
              {route.name}
            </Link>
          ))}

          {role &&
            <Link href={dashboardRoute[role]} className="text-primary hover:text-white hover:bg-primary p-1 rounded-lg">
              Dashboard
            </Link>
          }

          {!isLoading && !data && (
            <Link href="/apply" className="text-primary hover:text-white hover:bg-primary p-1 rounded-lg">
              Apply for technician
            </Link>
          )}
        </nav>

        <div>
          {!isLoading && !data && (
            <Button
              render={<Link href="/login">Login</Link>}
              nativeButton={false}
            >
              Login
            </Button>
          )}

          {!isLoading && data && (
            <Button onClick={handleLogout} variant="destructive">
              {
                isLogoutPending ?
                  <><Spinner />Logging out</>
                  : "Logout"
              }
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
