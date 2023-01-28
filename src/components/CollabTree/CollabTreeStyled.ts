import { styled } from "@/styles";

export const CollabContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	width: 180,
	padding: "$2",
	paddingBottom: 0,
});

export const ComponentsContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	gap: "$1",
});

export const Bars = styled("div", {
	$$lineColor: "rgba(0, 0, 0, 0.4)",
	$$height: "35px",
	$$parentLineHeight: "calc(2 * $sizes$spriteLabelOverflow)",

	position: "relative",
	height: "$$height",
	width: "100%",

	"&::before": {
		content: "",
		position: "absolute",
		backgroundColor: "$$lineColor",
		top: 0,
		left: "50%",
		width: 3,
		height: "$$parentLineHeight",
		transform: "translate(-1px, -$sizes$spriteLabelOverflow)",
	},

	"&::after": {
		$$distanceFromSide: "calc($sizes$spriteLabelOverflow + (54px / 2) - 1px)",

		content: "",
		position: "absolute",
		border: "3px solid $$lineColor",
		borderBottom: 0,
		borderTopLeftRadius: "3px",
		borderTopRightRadius: "3px",
		height: "calc($$height - 3px )",
		top: 0,
		left: "$$distanceFromSide",
		right: "$$distanceFromSide",
		transform: "translateY(calc($$parentLineHeight / 2))",
	},
});
