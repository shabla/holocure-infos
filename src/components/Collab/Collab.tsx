import { useItemsStore } from "@/stores";
import { Sprite } from "@/components";
import { Bars, CollabContainer, ComponentsContainer } from "./CollabStyled";

export interface CollabProps {
	itemId: string;
	children?: React.ReactNode;
}

export const Collab = ({ itemId, children }: CollabProps) => {
	const getItemById = useItemsStore((state) => state.getItemById);
	const item = getItemById(itemId);

	if (!item) {
		return null;
	}

	const components = item.requires?.map((itemId) => getItemById(itemId)) || [];

	return (
		<CollabContainer>
			{children}

			<Sprite
				type="items"
				name={item.name}
				label={item.name}
				showLabel
				showBackground
			/>

			<Bars />

			<ComponentsContainer>
				{components.map((item, index) => (
					<Sprite
						key={item?.id || index}
						type="items"
						name={item?.name}
						showBackground
						showLabel
						label={item?.name}
					/>
				))}
			</ComponentsContainer>
		</CollabContainer>
	);
};
