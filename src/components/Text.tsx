import { cn } from "@/lib/utils";
import React from "react";
import { HTMLAttributes } from "react";

type TextProps = {
  variant?: "primary" | "secondary" | "base" | "muted";
} & HTMLAttributes<HTMLSpanElement>;

export default function Text(props: TextProps) {
  const { variant = "base", className, children, ...rest } = props;
  const variantClassNames = {
    primary: "text-primary",
    secondary: "text-secondary",
    muted: "text-muted-foreground",
    base: "text-foreground",
  };
  const mergedClassNames = cn(variantClassNames[variant], className);
  return (
    <span className={mergedClassNames} {...rest}>
      {children}
    </span>
  );
}
