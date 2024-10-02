"use clinet";

import { AuthContext, AuthProp } from "@/contexts/AuthContext";
import React from "react";

export default function AuthProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: AuthProp | null;
}) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
