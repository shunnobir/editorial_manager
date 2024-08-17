import { AuthContext } from "@/contexts/AuthContext";
import React, { useContext } from "react";

export default function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}
