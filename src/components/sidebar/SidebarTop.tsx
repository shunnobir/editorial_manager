import Image from "next/image";
import React from "react";
import EMLogo from "../EMLogo";
import Column from "../Column";
import SidebarItems from "./SidebarItems";
import { SidebarItemType } from "./SidebarItem";
import { useSidebar } from "@/hooks/useSidebar";
import Link from "next/link";
import { useUserRole } from "@/hooks/useUserRole";
import { useRouter } from "next/navigation";

type SidebarTopProps = {
  items: SidebarItemType[];
};

function SidebarTop({ items }: SidebarTopProps) {
  const userRole = useUserRole();
  const { isOpen } = useSidebar();
  const router = useRouter();
  return (
    <Column className="gap-10 transition-all duration-200">
      <EMLogo
        size={40}
        variant={isOpen ? "long" : "short"}
        onClick={() =>
          router.push(`/${userRole?.role.toLowerCase() || "author"}/dashboard`)
        }
      />
      <SidebarItems items={items} />
    </Column>
  );
}

export default SidebarTop;
