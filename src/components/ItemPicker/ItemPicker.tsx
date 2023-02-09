import { Item } from "@/models";
import { styled } from "@/styles";
import React from "react";
import { Selectable } from "../Selectable/Selectable";
import { Sprite } from "../Sprite/Sprite";

export interface ItemPickerProps {
	disabledItemIds: number[];
	items: Item[];
	onSelect: (item: Item) => void;
}

export const ItemPicker = ({
	disabledItemIds,
	items,
	onSelect,
}: ItemPickerProps): React.ReactElement => {
	return (
		<ItemPickerContainer>
			{items.map((item) => {
				const isDisabled = disabledItemIds.includes(item.id);

				return (
					<Selectable
						key={item.id}
						disabled={isDisabled}
						onClick={isDisabled ? undefined : () => onSelect(item)}
					>
						<Sprite
							type="items"
							name={item.name}
							disabled={isDisabled}
							showBackground
							label={item.name}
							value={item}
						/>
					</Selectable>
				);
			})}
		</ItemPickerContainer>
	);
};

const ItemPickerContainer = styled("div", {
	display: "flex",
	flexWrap: "wrap",
	gap: "$1",
});
