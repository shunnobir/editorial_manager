import { Role, Teacher, User } from "@/types";
import { createContext } from "react";

export type UserType = {
  user: User & Teacher;
  // role: "Author" | "Editor" | "Reviewer";
  role: Role[];
  session_id: string;
};

export type AuthProp = {
  user: (User & Teacher) | null;
  setUser: (s: User & Teacher) => void;
};
export const AuthContext = createContext<AuthProp | null>(null);
