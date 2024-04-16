"use client";

import React from "react";

export const SidebarContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  isOpen: true,
  setIsOpen: () => {},
});
