"use client";

import Column from "@/components/Column";
import Page from "@/components/Page";
import Sidebar from "@/components/sidebar/Sidebar";
import { SidebarItemType } from "@/components/sidebar/SidebarItem";
import Topbar from "@/components/topbar/Topbar";
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
  // href have to be absolute path name, otherwise the sidebard wont show it as active
  const items: SidebarItemType[] = useMemo(
    () => [
      {
        Icon: LayoutDashboard, // Icon is just a Lucide Icon component
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
      },
    ],
    []
  );

  return (
    <Page className="">
      <Sidebar items={items} />
      <Column className="px-[55px] py-[40px] gap-[30px] flex-1">
        <Topbar />
        {children}
      </Column>
    </Page>
  );
}

export default Layout;
