// stitches.config.ts
import { createStitches, CSS as StyledCSS } from "@stitches/react";

export type { StyledCSS };

export const {
	styled,
	css,
	globalCss,
	keyframes,
	getCssText,
	theme,
	createTheme,
	config,
} = createStitches({
	media: {
		bp1: "(min-width: 620px)",
		bp2: "(min-width: 800px)",
		bp3: "(min-width: 1100px)",
		desktop: "(min-width: 1300px)",
	},
	theme: {
		colors: {
			blue: "#4abef9",
			blueHalfOpacity: "#4abef980",
			pink: "#ff9ec6",
			darkBlue: "#21546f",
			darkBlueHalfOpacity: "#21546f80",
		},
		sizes: {
			spriteLabelOverflow: "12px",
			spriteLabelHeight: "24px",
			navbarHeight: "50px",
		},
		space: {
			0: "0",
			1: "5px",
			2: "10px",
			3: "15px",
			4: "20px",
			content: "5px",
		},
	},
});
