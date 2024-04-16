import React from "react";
import Column from "../Column";
import SidebarItem, { SidebarItemType } from "./SidebarItem";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

type SidebarItemsProps = {
  items: SidebarItemType[];
};

function SidebarItems({ items }: SidebarItemsProps) {
  const { isOpen } = useSidebar();

  return (
    <Column className="gap-2.5 overflow-hidden transition-all duration-200">
      {!isOpen ? <span className="opacity-0 text-xs">n</span> : null}
      <span
        className={cn(
          "uppercase text-xs text-muted-foreground font-medium",
          !isOpen && "hidden"
        )}
      >
        quick links
      </span>
      <Column className="gap-1 transition-all duration-200">
        {items.map((item, index) => {
          return <SidebarItem {...item} key={index} />;
        })}
      </Column>
    </Column>
  );
}

export default SidebarItems;
