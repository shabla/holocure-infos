import { useItemsStore } from "@/stores";
import { styled } from "@/styles";
import { Sprite } from "@/components";

export interface CollabProps {
	itemId: string;
}

const CollabContainer = styled("div", {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	width: 180,
	backgroundColor: "rgba(255,255,255,0.1)",
	padding: "$2",
	paddingBottom: 0,
	borderRadius: "3px",
});

const ComponentsContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	gap: "$1",
});

const Bars = styled("div", {
	$$lineColor: "rgba(0, 0, 0, 0.4)",
	$$height: "35px",
	$$parentLineHeight: "calc(2 * $sizes$spriteLabelOverflow)",

	position: "relative",
	height: "$$height",
	width: "100%",

	"&::before": {
		content: "",
		position: "absolute",
		backgroundColor: "$$lineColor",
		top: 0,
		left: "50%",
		width: 3,
		height: "$$parentLineHeight",
		transform: "translate(-1px, -$sizes$spriteLabelOverflow)",
	},

	"&::after": {
		$$distanceFromSide: "calc($sizes$spriteLabelOverflow + (54px / 2) - 1px)",

		content: "",
		position: "absolute",
		border: "3px solid $$lineColor",
		borderBottom: 0,
		borderTopLeftRadius: "3px",
		borderTopRightRadius: "3px",
		height: "calc($$height - 3px )",
		top: 0,
		left: "$$distanceFromSide",
		right: "$$distanceFromSide",
		transform: "translateY(calc($$parentLineHeight / 2))",
	},
});

export const Collab = ({ itemId }: CollabProps) => {
	const getItemById = useItemsStore((state) => state.getItemById);
	const item = getItemById(itemId);

	if (!item) {
		return null;
	}

	return (
		<CollabContainer>
			<Sprite
				type="items"
				name={item.name}
				label={item.name}
				showLabel
				showBackground
			/>

			<Bars />

			<ComponentsContainer>
				{item.requires?.map((id) => {
					const item = getItemById(id)!;

					return (
						<Sprite
							key={item.id}
							type="items"
							name={item.name}
							showBackground
							showLabel
							label={item.name}
						/>
					);
				})}
			</ComponentsContainer>
		</CollabContainer>
	);
};
