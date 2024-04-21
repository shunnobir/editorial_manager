"use client";

import Column from "@/components/Column";
import Page from "@/components/Page";
import Sidebar from "@/components/sidebar/Sidebar";
import { SidebarItemType } from "@/components/sidebar/SidebarItem";
import Topbar from "@/components/topbar/Topbar";
import {
  FileCheck2,
  FilePlus2,
  FileStack,
  LayoutDashboard,
} from "lucide-react";
import React, { useMemo } from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return <Page>{children}</Page>;
}

export default Layout;
