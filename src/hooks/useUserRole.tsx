import { UserRoleContext } from "@/contexts/UserRoleContext";
import React from "react";

export function useUserRole() {
  return React.useContext(UserRoleContext);
}
