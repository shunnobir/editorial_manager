"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { LogOut, Settings } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { Axios } from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function SettingsPopover() {
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    const session_id = localStorage.getItem("session_id");
    localStorage.removeItem("session_id");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    Axios.post("/logout", {} as any, {
      headers: {
        Authorization: `Bearer ${session_id}`,
      },
    })
      .then((res) => res.data)
      .then((_) => router.replace("/"));
  };

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className={"shadow-md rounded-sm"}>
          <Settings
            size={16}
            className={"transition-all duration-500 ease-in-out"}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-64">
        <div className="flex flex-col">
          <div className="p-4">
            <h4 className="font-medium leading-none">Settings</h4>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex flex-row w-full items-center gap-4">
              <Button
                variant="ghost"
                className="flex-1 items-center justify-start gap-2 rounded-none"
                onClick={handleLogout}
              >
                <LogOut
                  size={16}
                  className="transition-all duration-500 ease-in-out"
                />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
