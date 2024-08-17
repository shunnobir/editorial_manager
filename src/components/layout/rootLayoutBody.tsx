"use client";

import { SidebarContext } from "@/contexts/SidebarContext";
import React, { useEffect, useReducer, useState } from "react";
import Footer from "../Footer";
import { UserRoleContext } from "@/contexts/UserRoleContext";
import { usePathname, useRouter } from "next/navigation";
import { AuthContext, UserType } from "@/contexts/AuthContext";
import { Teacher, User } from "@/types";

function RootLayoutBody({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(true);
  const [role, setRole] = useState("");

  const [user, setUser] = useState<(User & Teacher) | null>(null);

  useEffect(() => {
    const r = localStorage.getItem("role");
    if (r) {
      setRole(r);
    }

    const u = localStorage.getItem("user");
    if (u) {
      setUser(JSON.parse(u));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <UserRoleContext.Provider value={{ role, setRole }}>
        <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
          {children}
          <Footer />
        </SidebarContext.Provider>
      </UserRoleContext.Provider>
    </AuthContext.Provider>
  );
}

export default RootLayoutBody;
