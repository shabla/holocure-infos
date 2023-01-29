import React from "react";
import { Box, Dialog, Sprite } from "@/components";
import { Item, ItemsList } from "@/models";
import { useItemsStore } from "@/stores";
import { styled } from "@/styles";

export interface ItemPickerDialogProps {
	selectedItems: ItemsList;
	open: boolean;
	setOpen: (value: boolean) => void;
	onChange: (item: Item) => void;
}

const ItemsGrid = styled("div", {
	display: "grid",
	gridTemplateColumns: "repeat(7, 74px)",
	justifyContent: "center",
	alignItems: "center",
	gap: "$2",
});

export const ItemPickerDialog = ({
	selectedItems,
	open,
	setOpen,
	onChange,
}: ItemPickerDialogProps): React.ReactElement => {
	const items = useItemsStore((state) => state.getItemsByType("item"));

	return (
		<Dialog open={open} setOpen={setOpen}>
			<Box label="Items">
				<ItemsGrid>
					{items.map((item) => {
						const isSelected = selectedItems.includes(item);

						return (
							<Sprite
								type="items"
								name={item.name}
								selected={isSelected}
								disabled={isSelected}
								showBackground
								label={item.name}
								value={item}
								onSelected={isSelected ? undefined : (item) => onChange(item)}
								key={item.id}
							/>
						);
					})}
				</ItemsGrid>
			</Box>
		</Dialog>
	);
};
