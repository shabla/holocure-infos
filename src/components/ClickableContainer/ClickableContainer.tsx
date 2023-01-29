import { styled } from "@/styles";
import React from "react";

export interface ClickableContainerProps {
	children: React.ReactNode;
	onClick: () => void;
}

export const Container = styled("div", {
	display: "flex",
	flexDirection: "column",
	backgroundColor: "rgba(255,255,255,0.1)",
	padding: "$2",
	borderRadius: "3px",
	position: "relative",
	"&:hover": {
		backgroundColor: "rgba(255,255,255,0.3)",
		cursor: "pointer",
	},
});

export const ClickableContainer = ({
	children,
	onClick,
}: ClickableContainerProps): React.ReactElement => {
	return <Container onClick={onClick}>{children}</Container>;
};
