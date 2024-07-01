import React from "react";
import Row from "./Row";
import Column from "./Column";
import { cn } from "@/lib/utils";

type EMLogoProps = {
  size?: number;
  variant?: "long" | "short";
} & React.HTMLAttributes<HTMLDivElement>;

// Default size 64
export default function EMLogo({
  size = 64,
  variant = "short",
  ...rest
}: EMLogoProps) {
  return (
    <Row
      className={cn(
        "items-center overflow-hidden relative gap-3 transition-all duration-200 cursor-pointer"
        // variant !== "long" && "w-fit"
      )}
      {...rest}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 6C0 2.68629 2.68629 0 6 0H34C37.3137 0 40 2.68629 40 6V34C40 37.3137 37.3137 40 34 40H6C2.68629 40 0 37.3137 0 34V6Z"
          fill="#F1F4F3"
        />
        <path
          d="M6.76295 26.6V12.7818H15.7502V14.8802H9.26615V18.6316H15.2846V20.7299H9.26615V24.5016H15.8041V26.6H6.76295ZM18.304 12.7818H21.3672L25.4694 22.7946H25.6314L29.7337 12.7818H32.7969V26.6H30.3949V17.1067H30.2667L26.4478 26.5595H24.653L20.8341 17.0865H20.706V26.6H18.304V12.7818Z"
          fill="#0C4A6E"
        />
      </svg>
      {/* {variant === "long" ? ( */}
      <Column
        style={{ height: size }}
        className={cn(
          variant === "long" && "animate-slide-right",
          variant !== "long" && "animate-slide-left"
        )}
      >
        <span className="text-xl font-semibold leading-6">
          <span className="text-primary">Editorial </span>
          <span className="text-muted-foreground">Manager</span>
        </span>
        <span className="text-muted-foreground text-xs">
          University of Chittagong
        </span>
      </Column>
      {/* ) : null} */}
    </Row>
  );
}
