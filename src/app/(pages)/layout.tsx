"use client";

import Column from "@/components/Column";
import Page from "@/components/Page";
import Sidebar from "@/components/sidebar/Sidebar";
import { SidebarItemType } from "@/components/sidebar/SidebarItem";
import Topbar from "@/components/topbar/Topbar";
import { useUserRole } from "@/hooks/useUserRole";
import {
  FileCheck,
  FileCheck2,
  FilePlus2,
  FileStack,
  LayoutDashboard,
  UsersRound,
} from "lucide-react";
import React, { useMemo } from "react";

function Layout({ children }: { children: React.ReactNode }) {
  const userRole = useUserRole();

  // href have to be absolute path name, otherwise the sidebard wont show it as active
  const items: SidebarItemType[] = useMemo(
    () =>
      userRole?.role === "reviewer"
        ? [
            {
              Icon: LayoutDashboard, 
              label: "Dashboard",
              href: "/reviewer/dashboard",
            },{
              Icon: FileStack,
              label: "Assigned",
              href: "/reviewer/assigned",
            },
            {
              Icon: FileCheck2,
              label: "Completed",
              href: "/reviewer/completed",
            }
          ]
        : userRole?.role === "editor"
        ? [
            {
              Icon: LayoutDashboard, 
              label: "Dashboard",
              href: "/editor/dashboard",
            },
            {
              Icon: UsersRound,
              label: "Reviewers",
              href: "/editor/reviewers",
            },
            {
              Icon: FileCheck,
              label: "Assigned",
              href: "/editor/assigned",
            }
          ]
        : [
            {
              Icon: LayoutDashboard, // Icon is just a Lucide Icon component
              label: "Dashboard",
              href: "/author/dashboard",
            },
            {
              Icon: FilePlus2,
              label: "New Proposal",
              href: "/author/proposal",
            },
            {
              Icon: FileStack,
              label: "Revisions",
              href: "/author/revisions",
            },
            {
              Icon: FileCheck2,
              label: "Completed",
              href: "/author/completed",
            },
          ],
    [userRole]
  );

  return (
    <Page>
      <Sidebar items={items} />
      <Column className="px-[55px] py-[40px] gap-[30px] flex-1 transition-all duration-200">
        <Topbar />
        {children}
      </Column>
    </Page>
  );
}

export default Layout;
