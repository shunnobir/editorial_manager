import React from "react"

export default function Row(props) {
  const { children, className, ...rest } = props;
  return (
    <div className={`flex flex-col ${className}`} {...rest}>
      {children}
    </div>
  )
}