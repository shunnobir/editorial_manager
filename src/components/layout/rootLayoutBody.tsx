"use client";

import { SidebarContext } from "@/contexts/SidebarContext";
import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import { UserRoleContext } from "@/contexts/UserRoleContext";
import { usePathname, useRouter } from "next/navigation";

function RootLayoutBody({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(true);
  const [role, setRole] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const r = localStorage.getItem("role");
    if (r) {
      setRole(r);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("role", role);
  }, [role]);

  return (
    <UserRoleContext.Provider value={{ role, setRole }}>
      <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
        {children}
        <Footer />
      </SidebarContext.Provider>
    </UserRoleContext.Provider>
  );
}

export default RootLayoutBody;
