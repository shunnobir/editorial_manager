import Link from "next/link";
import React, { useMemo } from "react";
import Row from "../Row";
import { ChevronRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

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

  return (
    <Link
      href={href}
      className={
        "hover:bg-muted rounded-xl p-2.5 " +
        (active ? "bg-muted" : "bg-background")
      }
    >
      <Row
        className={
          "items-center " + (active ? "text-primary" : "text-foreground")
        }
      >
        <Row className="gap-3 items-center">
          <Icon size="24" strokeWidth={1.5} />
          <span>{label}</span>
        </Row>
        {active ? (
          <ChevronRight size="24" className="ml-auto" strokeWidth={1.5} />
        ) : null}
      </Row>
    </Link>
  );
}

export default SidebarItem;
