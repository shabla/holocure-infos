import React from "react";
import classNames from "classnames";

import "./Box.scss"

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
}

export const Box = ({
  label,
  className,
  children,
  ...props
}: BoxProps) => {
  return (
    <div className={classNames("box flex-column", className)} {...props}>
      <header className="flex-row align-x-center align-space-between">{label}</header>
      <main className="flex-column flex-fill">{children}</main>
    </div>
  )
}