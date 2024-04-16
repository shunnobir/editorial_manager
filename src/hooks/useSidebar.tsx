"use client";

import { SidebarContext } from "@/contexts/SidebarContext";
import React from "react";

export function useSidebar() {
  return React.useContext(SidebarContext);
}
