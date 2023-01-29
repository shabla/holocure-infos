import { useItemsStore } from "@/stores";
import { Sprite } from "@/components";
import {
	Bars,
	ComponentsContainer,
	CollabContainer,
} from "./ItemComponentsStyled";
import { Item } from "@/models";

export interface ItemComponentsProps {
	item: Item;
}

export const ItemComponents = ({ item }: ItemComponentsProps) => {
	const getItemById = useItemsStore((state) => state.getItemById);

	const components =
		(item.requires
			?.map((itemId) => getItemById(itemId))
			.filter((item) => !!item) as Item[]) || [];

	return (
		<CollabContainer>
			<Sprite type="items" name={item.name} label={item.name} showBackground />

			{components.length > 0 && (
				<>
					<Bars />

					<ComponentsContainer>
						{components.map((item) => (
							<Sprite
								key={item.id}
								type="items"
								name={item.name}
								label={item.name}
								showBackground
							/>
						))}
					</ComponentsContainer>
				</>
			)}
		</CollabContainer>
	);
};
