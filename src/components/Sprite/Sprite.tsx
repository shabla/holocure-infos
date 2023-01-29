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
	label?: string;
	alwaysIncludeLabelPadding?: boolean;
	value?: T;
	onSelected?: (value: T) => void;
	onMouseOver?: React.MouseEventHandler<HTMLDivElement>;
}

export const Sprite = <T extends unknown>({
	type,
	name,
	label,
	showBackground = false,
	scale = 1,
	selected = false,
	alwaysIncludeLabelPadding = false,
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

	const { height, width } = spriteSheet;
	const containerStyle: StyledCSS = {
		width:
			label != null || alwaysIncludeLabelPadding
				? `calc(${width}px + (2 * $sizes$spriteLabelOverflow))`
				: `${width}px`,
		height:
			label != null || alwaysIncludeLabelPadding
				? `calc(${height}px + (${
						alwaysIncludeLabelPadding ? 2 : 1
				  } * $sizes$spriteLabelOverflow))`
				: `${height}px`,
	};
	const spriteStyle: StyledCSS = {
		width: `${width}px`,
		height: `${height}px`,
		transform: `scale(${scale})`,
		background: `${getSpriteBackground(spriteSheet, name)}${
			showBackground ? ", rgba(0, 0, 0, 0.1)" : ""
		}`,
	};

	return (
		<SpriteContainer
			css={containerStyle}
			disabled={disabled}
			selected={selected}
			withLabel={label != null || alwaysIncludeLabelPadding}
			clickable={!!onSelected}
			onMouseOver={onMouseOver}
		>
			{label != null && <SpriteLabel>{label || ""}</SpriteLabel>}

			<SpriteImage
				css={spriteStyle}
				onClick={onSelected ? () => onSelected(value!) : undefined}
			/>
		</SpriteContainer>
	);
};
