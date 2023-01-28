import { keyframes } from "./stitches.config";

export const fadeIn = keyframes({
	"0%": { opacity: 0 },
	"100%": { opacity: 1 },
});

export const contentShow = keyframes({
	"0%": { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
	"100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});
