"use client";

import Page from "@/components/Page";
import Sidebar from "@/components/sidebar/Sidebar";
import { SidebarItemType } from "@/components/sidebar/SidebarItem";
import {
  FileCheck2,
  FilePlus2,
  FileStack,
  LayoutDashboard,
} from "lucide-react";
import React, { useMemo } from "react";

function Layout({ children }: { children: React.ReactNode }) {
  // href have to be absolute path name, otherwise the sidebard wont show it as active
  const items: SidebarItemType[] = useMemo(
    () => [
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
    []
  );

  return (
    <Page className="">
      <Sidebar items={items} />
      {children}
    </Page>
  );
}

export default Layout;
