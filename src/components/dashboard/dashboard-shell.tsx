import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardSidebar } from "./dashboard-sidebar";
import type { ReactNode } from "react";
import type { Role } from "@/types";

export default function DashboardShell({
  children,
  role,
}: {
  children: ReactNode;
  role: Role;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar role={role} />
      <SidebarInset>
        <header className="flex h-6 shrink-0 items-center gap-2 px-0">
          <SidebarTrigger className="-ml-1" />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
