import React from "react";
import { styled } from "@/styles";

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
}

const BoxContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  border: "1px solid white",
  borderTop: 0,
  backgroundColor: "rgba(0, 0, 0, 0.13)",
});

const BoxHeader = styled("header", {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: "56px",
  backgroundColor: "white",
  fontWeight: 300,
  fontSize: "22px",
  color: "$blue",
  textTransform: "uppercase",
  padding: "0 10px",
});

const BoxContent = styled("main", {
  display: "flex",
  flexDirection: "column",
  flex: "1 1 auto",
  padding: "$2",
  color: "white",
  fontSize: "16px",
  overflowY: "auto",
});

export const Box = ({ label, className, children, ...props }: BoxProps) => {
  return (
    <BoxContainer {...props}>
      <BoxHeader>{label}</BoxHeader>
      <BoxContent>{children}</BoxContent>
    </BoxContainer>
  );
};
