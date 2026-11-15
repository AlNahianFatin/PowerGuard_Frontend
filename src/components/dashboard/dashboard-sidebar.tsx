"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import type { Role } from "@/types";
import { adminRoutes, customerRoutes, operatorRoutes, technicianRoutes } from "@/routes";
import type { SidebarItems } from "@/types/sidebar.type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const sidebarRoutes: Partial<Record<Role, SidebarItems>> = {
  ADMIN: adminRoutes,
  OPERATOR: operatorRoutes,
  TECHNICIAN: technicianRoutes,
  CUSTOMER: customerRoutes,
};

export function DashboardSidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const routes: SidebarItems = sidebarRoutes[role] || [];

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Power Guard logo"
              width={50}
              height={50}
              loading="eager"
              unoptimized
            />
            <span>Power Guard</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={pathname === item.url}
                      className="focus:text-primary focus:bg-gray-200"
                    >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
