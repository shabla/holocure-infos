import React from "react";

import "./Heading.scss"

export const Heading: React.FC<React.HTMLProps<HTMLHeadingElement>> = ({ children, ...props }) => {
  return <h2 className="heading" {...props}>{children}</h2>;
}