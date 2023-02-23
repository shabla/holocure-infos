import { styled } from "@holocure-builds/common";

export const CollabContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	width: 165,
});

export const ComponentsContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	gap: "$1",
});

export const Bars = styled("div", {
	$$lineColor: "rgba(0, 0, 0, 0.4)",
	$$parentLineHeight: "calc($sizes$spriteLabelHeight / 2)", // 12
	$$height: "calc($$parentLineHeight + 3px + $$parentLineHeight)", // 12 + 3 + 12
	$$distanceFromSide: "calc($sizes$spriteLabelOverflow + (54px / 2) + 1px)", // 12 + (54/2) + 1

	position: "relative",
	height: "$$height",
	width: "100%",

	"&::before": {
		content: "",
		position: "absolute",
		backgroundColor: "$$lineColor",
		top: 0,
		left: "50%",
		width: 2,
		height: "$$parentLineHeight",
		transform: "translateX(-1px)",
	},

	"&::after": {
		content: "",
		position: "absolute",
		border: "2px solid $$lineColor",
		borderBottom: 0,
		borderTopLeftRadius: "3px",
		borderTopRightRadius: "3px",
		height: "calc((2 * $$parentLineHeight) + 1px)",
		top: "$$parentLineHeight",
		left: "$$distanceFromSide",
		right: "$$distanceFromSide",
	},
});
