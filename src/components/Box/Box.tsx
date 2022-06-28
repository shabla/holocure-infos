import React from "react";
import classNames from "classnames";

import "./Box.scss"

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
}

export const Box: React.FC<BoxProps> = ({
  label,
  className,
  children,
  ...props
}) => {
  return (
    <div className={classNames("box flex-column", className)} {...props}>
      <header className="flex-row align-center justify-space-between">{label}</header>
      <main className="flex-column flex-fill">{children}</main>
    </div>
  )
}