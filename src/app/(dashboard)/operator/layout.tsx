import type { ReactNode } from "react";
import RoleGuard from "@/components/auth/role-guard";
import DashboardShell from "@/components/dashboard/dashboard-shell";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <RoleGuard roles={["OPERATOR"]}>
      {/** biome-ignore lint/a11y/useValidAriaRole: <ignore role error mistaking for aria-role> */}
      <DashboardShell role="OPERATOR">
        <div className="px-5 mb-10">
          {children}
        </div>
      </DashboardShell>
    </RoleGuard>
  );
}
