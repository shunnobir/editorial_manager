import React from "react";

export type UserRoleContextType = {
  role: string;
  setRole: React.Dispatch<React.SetStateAction<string>>;
};

export const UserRoleContext = React.createContext<UserRoleContextType | null>(
  null
);
