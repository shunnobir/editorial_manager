import Image from "next/image";
import React from "react";
import EMLogo from "../EMLogo";
import Column from "../Column";
import SidebarItems from "./SidebarItems";
import { SidebarItemType } from "./SidebarItem";
import { useSidebar } from "@/hooks/useSidebar";

type SidebarTopProps = {
  items: SidebarItemType[];
};

function SidebarTop({ items }: SidebarTopProps) {
  const { isOpen } = useSidebar();
  return (
    <Column className="gap-10 transition-all duration-200">
      <EMLogo size={40} variant={isOpen ? "long" : "short"} />
      <SidebarItems items={items} />
    </Column>
  );
}

export default SidebarTop;
