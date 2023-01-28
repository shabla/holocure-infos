import { SpriteSheet } from "@/stores";

export const getSpriteBackground = (spriteSheet: SpriteSheet, name?: string): string => {
	if (name) {
		const offset = spriteSheet.offsets?.[name];

		if (offset) {
			const x = -(offset[0] || 0) * spriteSheet.width;
			const y = -(offset[1] || 0) * spriteSheet.height;

			return `url(${spriteSheet.file}) ${x}px ${y}px`;
		}
	}

	return `url(https://via.placeholder.com/${spriteSheet.width}x${spriteSheet.height}?text=???)`;
};
