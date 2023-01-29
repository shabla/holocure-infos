import { useItemsStore } from "@/stores";
import { Sprite } from "@/components";
import {
	Bars,
	ComponentsContainer,
	CollabContainer,
} from "./ItemComponentsStyled";

export interface ItemComponentsProps {
	itemId?: string;
}

export const ItemComponents = ({ itemId }: ItemComponentsProps) => {
	const getItemById = useItemsStore((state) => state.getItemById);

	if (!itemId) {
		return null;
	}

	const item = getItemById(itemId);

	if (!item) {
		return null;
	}

	const components = item.requires?.map((itemId) => getItemById(itemId)) || [];

	return (
		<CollabContainer>
			<Sprite type="items" name={item.name} label={item.name} showBackground />

			<Bars />

			<ComponentsContainer>
				{components.map((item, index) => (
					<Sprite
						key={item?.id || index}
						type="items"
						name={item?.name}
						label={item?.name}
						showBackground
					/>
				))}
			</ComponentsContainer>
		</CollabContainer>
	);
};
