import React from "react";
import Row from "../Row";
import { Button } from "../ui/button";
import { Bell, Menu, Settings } from "lucide-react";
import { useSidebar } from "@/hooks/useSidebar";

function Topbar() {
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

export default Topbar;
