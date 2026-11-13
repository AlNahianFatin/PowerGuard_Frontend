// "use client";

// import type { ReactNode } from "react";
// import AuthGuard from "@/components/auth/auth-guard";
// import Footer from "@/components/layout/public/Footer";
// import { useGetMe, useLogout } from "@/hooks";
// import { toast } from "@/components/ui/toast";
// import { useQueryClient } from "@tanstack/react-query";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Spinner } from "@/components/ui/spinner";
// import { useRouter } from "next/navigation";

// const routes = [
//   { name: "Home", url: "/" },
//   { name: "Schedules", url: "/schedules" },
//   { name: "About us", url: "/about-us" },
// ];

// export default function Layout({ children }: { children: ReactNode }) {
//   const queryClient = useQueryClient();

//   const router = useRouter(); 

//   const { data, isLoading } = useGetMe();

//   const { mutate: logout, isPending: isLogoutPending } = useLogout();

//   const handleLogout = () => {
//     logout(undefined, {
//       onSuccess: (res) => {
//         toast.add({
//           title: "See you soon!",
//           description: res.message ?? "Logged out successfully",
//           type: "success",
//         });

//         queryClient.removeQueries({ queryKey: ["user"] });

//         router.push("/");
        
//         return;
//       },
//       onError: (error) => {
//         toast.add({
//           title: "Logout failed",
//           description: error.message ?? "Something went wrong",
//           type: "error",
//         });
//       },
//     });
//   };

//   return (
//     <div className="flex max-h-screen flex-col w-full">
//       {/* <Header /> */}
//       <div className="w-full flex justify-center items-center h-16 py-5 mx-auto border-b ml-29">

//         <nav className="flex gap-5">
//           {routes.map((route) => (
//             <Link key={route.url} href={route.url} className="text-primary hover:text-white hover:bg-primary p-1 rounded-lg">
//               {route.name}
//             </Link>
//           ))}
//         </nav>

//         {/* <div className="relative flex justify-end items-end"> */}

//           {!isLoading && data && (
//             <Button onClick={handleLogout} variant="destructive" className="ml-10">
//               {
//                 isLogoutPending ?
//                   <><Spinner />Logging out</>
//                   : "Logout"
//               }
//             </Button>
//           )}
//         {/* </div> */}
//       </div>

//       <main>
//         <AuthGuard>{children}</AuthGuard>
//       </main>

//       <Footer />
//     </div>
//   );
// }





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

const routes = [
  { name: "Home", url: "/" },
  { name: "Schedules", url: "/schedules" },
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
        toast.add({
          title: "See you soon!",
          description: res.message ?? "Logged out successfully",
          type: "success",
        });

        queryClient.removeQueries({ queryKey: ["user"] });
        router.push("/");
      },
      onError: (error) => {
        toast.add({
          title: "Logout failed",
          description: error.message ?? "Something went wrong",
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
        <AuthGuard>{children}</AuthGuard>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
