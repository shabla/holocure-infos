import { useCallback } from "react";

import { useSpriteSheetsStore, SpriteType } from "@/stores";
import { getSpriteBackground } from "./getSpriteBackground";
import { SpriteContainer, SpriteLabel, SpriteImage } from "./SpriteStyled";

export interface SpriteProps<T = unknown> {
	type: SpriteType;
	name?: string;
	selected?: boolean;
	showBackground?: boolean;
	disabled?: boolean;
	scale?: number;
	label?: string;
	value?: T;
	onSelected?: (value: T) => void;
}

export const Sprite = <T,>({
	type,
	name,
	label,
	showBackground = false,
	scale = 1,
	selected = false,
	value,
	disabled,
	onSelected,
}: SpriteProps<T>) => {
	const spriteSheet = useSpriteSheetsStore(
		useCallback((state) => state.getSpriteSheet(type), [type]),
	);
	const showLabel = !!label;

	return (
		<SpriteContainer
			css={{
				// FIXME: calc + token how
				...(showLabel
					? {
							width: `calc(${spriteSheet.width}px + (2 * var(--sprite-label-overflow)))`,
							height: `calc(${spriteSheet.height}px + var(--sprite-label-overflow))`,
					  }
					: undefined),
				...(type === "none"
					? {
							backgroundColor: "rgba(100,100,100,0.5)",
							height: 80,
							width: 80,
					  }
					: undefined),
			}}
			disabled={disabled}
			selected={selected}
			clickable={!!onSelected}
			withLabel={showLabel}
		>
			{showLabel && <SpriteLabel>{label}</SpriteLabel>}

			{type !== "none" && name && (
				<SpriteImage
					onClick={onSelected ? () => onSelected(value!) : undefined}
					css={{
						width: `${spriteSheet.width}px`,
						height: `${spriteSheet.height}px`,
						transform: `scale(${scale})`,
						background: `${getSpriteBackground(spriteSheet, name)}${
							showBackground ? ", rgba(0, 0, 0, 0.1)" : ""
						}`,
					}}
				/>
			)}
		</SpriteContainer>
	);
};
