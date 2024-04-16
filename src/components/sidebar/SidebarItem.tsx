import Link from "next/link";
import React, { useMemo } from "react";
import Row from "../Row";
import { ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";

export interface SidebarItemType {
  href: string;
  Icon: React.ElementType;
  label: string;
}

type SidebarItemProps = SidebarItemType;

function SidebarItem({ href, Icon, label }: SidebarItemProps) {
  const pathname = usePathname();
  const active = useMemo(() => {
    return pathname === href.toLowerCase();
  }, [href, pathname]);
  const router = useRouter();
  const { isOpen } = useSidebar();

  return (
    <Link
      href={href}
      className={cn(
        "transition-all duration-300 ease-in-out hover:bg-muted rounded-xl p-2.5 overflow-hidden ",
        active ? "bg-muted" : "bg-background"
      )}
    >
      <Row
        className={cn(
          "items-center overflow-hidden ",
          active ? "text-primary" : "text-foreground"
        )}
      >
        <Row className={cn("items-center overflow-hidden relative gap-3")}>
          <Icon size="24" strokeWidth={1.5} />
          <span
            className={cn(
              "transition-all duration-300 ease-in-out",
              isOpen && "animate-slide-right",
              !isOpen && "animate-slide-left"
            )}
          >
            {label}
          </span>
        </Row>
        {active && isOpen ? (
          <ChevronRight size="24" className="ml-auto" strokeWidth={1.5} />
        ) : null}
      </Row>
    </Link>
  );
}

export default SidebarItem;
