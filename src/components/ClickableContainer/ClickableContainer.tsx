import { styled, StyledCSS } from "@/styles";
import React from "react";

export interface ClickableContainerProps {
	children: React.ReactNode;
	width?: StyledCSS["width"];
	height?: StyledCSS["height"];
	onClick: () => void;
}

export const Container = styled("div", {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	backgroundColor: "rgba(255,255,255,0.1)",
	padding: "$2",
	borderRadius: "3px",
	position: "relative",

	// FIXME: sketchy?
	"& .ClearButton": {
		display: "none",
	},
	"&:hover": {
		backgroundColor: "rgba(255,255,255,0.3)",
		cursor: "pointer",

		".ClearButton": {
			display: "flex",
		},
	},
});

export const ClickableContainer = ({
	children,
	width,
	height,
	onClick,
}: ClickableContainerProps): React.ReactElement => {
	return (
		<Container onClick={onClick} css={{ width, height }}>
			{children}
		</Container>
	);
};
