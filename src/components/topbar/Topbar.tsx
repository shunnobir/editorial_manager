import React, { useMemo } from "react";
import Row from "../Row";
import { Button } from "../ui/button";
import { Bell, Home, Menu, Settings } from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";
import Column from "../Column";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { usePathname } from "next/navigation";

function Topbar() {
  return (
    <Column className="gap-[30px]">
      <TopbarTop />
      <TopbarBottom />
    </Column>
  );
}

function TopbarTop() {
  const { isOpen, setIsOpen } = useSidebar();

  return (
    <Row className="w-full justify-between">
      <Button
        variant="ghost"
        size="icon"
        className={"shadow-md rounded-sm"}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Menu
          size={16}
          className={
            "transition-all duration-500 ease-in-out " +
            (isOpen ? "rotate-90" : "rotate-0")
          }
        />
      </Button>

      <Row className="items-center gap-3">
        <Button variant="ghost" size="icon" className={"shadow-md rounded-sm"}>
          <Bell
            size={16}
            className={"transition-all duration-500 ease-in-out"}
          />
        </Button>

        <Button variant="ghost" size="icon" className={"shadow-md rounded-sm"}>
          <Settings
            size={16}
            className={"transition-all duration-500 ease-in-out"}
          />
        </Button>
      </Row>
    </Row>
  );
}

function TopbarBottom() {
  const pathname = usePathname();
  const pathnameSegments = useMemo(() => {
    return pathname.split("/");
  }, [pathname]);
  return (
    <Row>
      <Breadcrumb>
        <BreadcrumbList>
          {pathnameSegments.map((segment, index) => {
            return (
              <Row className="items-center gap-2" key={index}>
                <BreadcrumbItem key={index}>
                  {index < pathnameSegments.length - 1 ? (
                    <BreadcrumbLink
                      href={pathnameSegments.slice(0, index + 1).join("/")}
                    >
                      {index === 0 ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          className={"w-6 h-6 shadow-md rounded-sm"}
                        >
                          <Home size={16} />
                        </Button>
                      ) : (
                        segment
                      )}
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{segment}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < pathnameSegments.length - 1 && <BreadcrumbSeparator />}
              </Row>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </Row>
  );
}

export default Topbar;
