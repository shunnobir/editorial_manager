import React from "react";
import Column from "../Column";
import SidebarItem, { SidebarItemType } from "./SidebarItem";

type SidebarItemsProps = {
  items: SidebarItemType[];
};

function SidebarItems({ items }: SidebarItemsProps) {
  return (
    <Column className="gap-2.5">
      <span className="uppercase text-xs text-muted-foreground font-medium">
        quick links
      </span>
      <Column className="gap-1">
        {items.map((item, index) => {
          return <SidebarItem {...item} key={index} />;
        })}
      </Column>
    </Column>
  );
}

export default SidebarItems;
