"use client";

import Page from "@/components/Page";
import React, { useMemo } from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return <Page>{children}</Page>;
}

export default Layout;
