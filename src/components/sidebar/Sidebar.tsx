import React from "react";
import SidebarTop from "./SidebarTop";
import { SidebarItemType } from "./SidebarItem";

type SidebarProps = {
  items: SidebarItemType[];
};

function Sidebar({ items }: SidebarProps) {
  return (
    <nav className="flex flex-col py-[30px] px-5 border-r border-solid border-border">
      <SidebarTop items={items} />
    </nav>
  );
}

export default Sidebar;
