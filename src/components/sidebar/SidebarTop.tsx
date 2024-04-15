import Image from "next/image";
import React from "react";
import EMLogo from "../EMLogo";
import Column from "../Column";
import SidebarItems from "./SidebarItems";
import { SidebarItemType } from "./SidebarItem";

type SidebarTopProps = {
  items: SidebarItemType[];
};

function SidebarTop({ items }: SidebarTopProps) {
  return (
    <Column className="gap-10">
      <EMLogo size={40} variant="long" />
      <SidebarItems items={items} />
    </Column>
  );
}

export default SidebarTop;
