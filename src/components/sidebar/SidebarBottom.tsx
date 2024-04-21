import React from "react";
import Row from "../Row";
import Image from "next/image";
import Column from "../Column";
import Text from "../Text";
import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { useUserRole } from "@/hooks/useUserRole";

function SidebarBottom() {
  const { isOpen } = useSidebar();
  const userRole = useUserRole();
  return (
    <Row className="w-full transition-all duration-200 gap-3 items-center p-2.5 bg-muted rounded-xl">
      <Image src="/rudra-sir.png" alt="rudra-sir" width={40} height={40} />
      <Column
        className={cn(
          isOpen && "animate-slide-right",
          !isOpen && "animate-slide-left"
        )}
      >
        <Text className="font-medium leading-5">Dr. Rudra Pratap</Text>
        <Text variant="muted" className="text-xs capitalize">
          {userRole?.role || "Author"}
        </Text>
      </Column>
    </Row>
  );
}

export default SidebarBottom;
