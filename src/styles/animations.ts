import { keyframes } from "./stitches.config";

export const fadeIn = keyframes({
	"0%": { opacity: 0 },
	"100%": { opacity: 1 },
});

export const contentShow = keyframes({
	"0%": { opacity: 0, transform: "translate(-50%, -45%)" },
	"100%": { opacity: 1, transform: "translate(-50%, -50%)" },
});

export const slideFromLeft = keyframes({
	"0%": { opacity: 0, transform: "translateX(-80%)" },
	"100%": { opacity: 1, transform: "translateX(0)" },
});

export const height = keyframes({
	"0%": { height: 0 },
	"100%": { height: "initial" },
});
