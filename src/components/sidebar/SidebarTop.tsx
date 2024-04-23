import Image from "next/image";
import React from "react";
import EMLogo from "../EMLogo";
import Column from "../Column";
import SidebarItems from "./SidebarItems";
import { SidebarItemType } from "./SidebarItem";
import { useSidebar } from "@/hooks/useSidebar";
import Link from "next/link";
import { useUserRole } from "@/hooks/useUserRole";

type SidebarTopProps = {
  items: SidebarItemType[];
};

function SidebarTop({ items }: SidebarTopProps) {
  const userRole = useUserRole();
  const { isOpen } = useSidebar();
  return (
    <Link href={`/${userRole?.role.toLowerCase() || "author"}/dashboard`}>
      <Column className="gap-10 transition-all duration-200">
        <EMLogo size={40} variant={isOpen ? "long" : "short"} />
        <SidebarItems items={items} />
      </Column>
    </Link>
  );
}

export default SidebarTop;
