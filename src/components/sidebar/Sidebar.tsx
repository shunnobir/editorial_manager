import React from "react";
import SidebarTop from "./SidebarTop";
import { SidebarItemType } from "./SidebarItem";
import SidebarBottom from "./SidebarBottom";

type SidebarProps = {
  items: SidebarItemType[];
};

function Sidebar({ items }: SidebarProps) {
  return (
    <nav className="sticky top-0 flex flex-col py-[30px] px-5 border-r border-solid border-border transition-all duration-200 justify-between min-h-full max-h-screen items-center">
      <SidebarTop items={items} />
      <SidebarBottom />
    </nav>
  );
}

export default Sidebar;
