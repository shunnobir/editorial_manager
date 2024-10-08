import { cn } from "@/lib/utils";
import React from "react"

export default function Row(props) {
  const { children, className, ...rest } = props;
  return (
    <div className={cn("flex flex-row ", className)} {...rest}>
      {children}
    </div>
  )
}