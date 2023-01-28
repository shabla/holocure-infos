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
	theme: {
		colors: {
			blue: "#4abef9",
			pink: "#ff9ec6",
			darkBlue: "#21546f",
		},
		sizes: {
			spriteLabelOverflow: "12px",
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
