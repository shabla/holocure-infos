import { keyframes } from "./stitches.config";

export const fadeIn = keyframes({
	"0%": { opacity: 0 },
	"100%": { opacity: 1 },
});

export const contentShow = keyframes({
	"0%": { opacity: 0, transform: "translate(-50%, -45%)" },
	"100%": { opacity: 1, transform: "translate(-50%, -50%)" },
});

export const slideDown = keyframes({
	"0%": { height: 0 },
	"100%": { height: "var(--radix-collapsible-content-height)" },
});

export const slideUp = keyframes({
	"0%": { height: "var(--radix-collapsible-content-height)" },
	"100%": { height: 0 },
});
