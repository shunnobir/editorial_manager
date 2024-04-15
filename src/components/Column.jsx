import { cn } from "@/lib/utils";
import React from "react"

export default function Column(props) {
  const { children, className, ...rest } = props;
  return (
    <div className={cn("flex flex-col ", className)} {...rest}>
      {children}
    </div>
  )
}