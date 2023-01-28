import { useCallback } from "react";

import { StyledCSS } from "@/styles";
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
	showLabel?: boolean;
	label?: string;
	value?: T;
	onSelected?: (value: T) => void;
	onMouseOver?: React.MouseEventHandler<HTMLDivElement>;
}

export const Sprite = <T,>({
	type,
	name,
	showLabel = false,
	label = name,
	showBackground = false,
	scale = 1,
	selected = false,
	value,
	disabled,
	onSelected,
	onMouseOver,
}: SpriteProps<T>) => {
	const spriteSheet = useSpriteSheetsStore(
		useCallback((state) => state.getSpriteSheet(type), [type]),
	);

	if (!spriteSheet) {
		return null;
	}

	const containerStyle: StyledCSS = {
		...(showLabel
			? {
					width: `calc(${spriteSheet.width}px + (2 * $sizes$spriteLabelOverflow))`,
					height: `calc(${spriteSheet.height}px + (2 * $sizes$spriteLabelOverflow))`,
			  }
			: {
					width: `${spriteSheet.width}px`,
					height: `${spriteSheet.height}px`,
			  }),
	};
	const spriteStyle: StyledCSS = {
		width: `${spriteSheet.width}px`,
		height: `${spriteSheet.height}px`,
		transform: `scale(${scale})`,
		background: `${getSpriteBackground(spriteSheet, name)}${
			showBackground ? ", rgba(0, 0, 0, 0.1)" : ""
		}`,
		borderRadius: "3px",
	};

	return (
		<SpriteContainer
			css={containerStyle}
			disabled={disabled}
			selected={selected}
			withLabel={showLabel}
			clickable={!!onSelected}
			onMouseOver={onMouseOver}
		>
			{showLabel && !!label && <SpriteLabel>{label}</SpriteLabel>}

			<SpriteImage
				css={spriteStyle}
				onClick={onSelected ? () => onSelected(value!) : undefined}
			/>
		</SpriteContainer>
	);
};
