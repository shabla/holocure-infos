import { styled } from "@/styles";
import { Sprite, SpriteProps } from "./Sprite/Sprite";

export interface SpriteListProps<T = unknown> {
	sprites: SpriteProps<T>[];
	direction?: "row" | "column";
}

const SpriteListContainer = styled("div", {
	display: "flex",
	gap: "$2",
	variants: {
		direction: {
			row: {
				flexDirection: "row",
			},
			column: {
				flexDirection: "column",
			},
		},
	},
});

export const SpriteList = <T,>({ sprites, direction = "row" }: SpriteListProps<T>) => {
	return (
		<SpriteListContainer direction={direction}>
			{sprites.map((spriteProps, index) => (
				<Sprite {...spriteProps} key={index} />
			))}
		</SpriteListContainer>
	);
};
