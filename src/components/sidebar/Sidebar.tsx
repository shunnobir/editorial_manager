import React from "react";
import SidebarTop from "./SidebarTop";
import { SidebarItemType } from "./SidebarItem";
import SidebarBottom from "./SidebarBottom";

type SidebarProps = {
  items: SidebarItemType[];
};

function Sidebar({ items }: SidebarProps) {
  return (
    <nav className="flex flex-col py-[30px] px-5 border-r border-solid border-border transition-all duration-200 min-h-full justify-between">
      <SidebarTop items={items} />
      <SidebarBottom />
    </nav>
  );
}

export default Sidebar;
