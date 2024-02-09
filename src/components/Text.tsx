import React from "react";
import { HTMLAttributes } from "react";

type TextProps = {
  variant?: "primary" | "secondary" | "neutral" | "base";
} & HTMLAttributes<HTMLSpanElement>;

export default function Text(props: TextProps) {
  const { variant = "base", className, children, ...rest } = props;
  const variantClassNames = {
    primary: "text-primary",
    secondary: "text-secondary",
    neutral: "text-neutral-400",
    base: "text-base",
  };
  const mergedClassNames = `${variantClassNames[variant]} ${className}`;
  return (
    <span className={mergedClassNames} {...rest}>
      {children}
    </span>
  );
}
