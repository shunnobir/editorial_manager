"use clinet";

import { AuthContext, AuthValue } from "@/contexts/AuthContext";
import React from "react";

export default function AuthProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: AuthValue | null;
}) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
