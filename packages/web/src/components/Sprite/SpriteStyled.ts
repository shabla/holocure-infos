import { styled } from "@holocure-builds/common";

export const SpriteImage = styled("div", {
	borderRadius: "3px",
});

export const SpriteContainer = styled("div", {
	position: "relative",
	flex: "0 0 auto",

	variants: {
		withLabel: {
			true: {
				padding: "$sizes$spriteLabelOverflow",
				paddingBottom: 0,
			},
		},
		clickable: {
			true: {
				"&:hover": {
					cursor: "pointer",
				},
			},
		},
		selected: {
			true: {
				[`& ${SpriteImage}`]: {
					outline: "5px solid white",
				},
			},
		},
		disabled: {
			true: {
				opacity: 0.3,
			},
		},
	},
});

export const SpriteLabel = styled("div", {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	zIndex: 10,
	fontSize: "11px",
	textAlign: "center",
	backgroundColor: "rgba(0,0,0,0.4)",
	color: "white",
	borderRadius: "3px",
	padding: "1px 0",
	lineHeight: "10px",
	height: "$spriteLabelHeight",
	pointerEvents: "none",
});
