import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import type { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["TECHNICIAN"]}>
      {/** biome-ignore lint/a11y/useValidAriaRole: <ignore role error mistaking for aria-role> */}
<DashboardShell role="TECHNICIAN">{children}</DashboardShell>
    </RoleGuard>
  );
}
