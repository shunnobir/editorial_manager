"use client";

import { SidebarContext } from "@/contexts/SidebarContext";
import React, { useState } from "react";
import Footer from "../Footer";

function RootLayoutBody({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
      <Footer />
    </SidebarContext.Provider>
  );
}

export default RootLayoutBody;
