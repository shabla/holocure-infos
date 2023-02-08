import { ItemPickerDialog, Selectable, Sprite } from "@/components";
import { useDialogState } from "@/hooks/useDialogState";
import { Item, ItemIdsList, ItemsList } from "@/models";
import { useItemsStore } from "@/stores";
import React, { useMemo } from "react";
import { EmptyMessage, Section } from "../BuilderStyled";

export interface ItemsSectionProps {
	itemIds: ItemIdsList;
	onChange: (itemIds: ItemIdsList) => void;
}

export const ItemsSection = ({
	itemIds,
	onChange,
}: ItemsSectionProps): React.ReactElement => {
	const itemDialog = useDialogState<number>();
	const items = useItemsStore((state) =>
		useMemo(
			() => (itemIds || []).map((id) => state.getItemById(id)) as ItemsList,
			[itemIds],
		),
	);

	const handleItemChange = (newItem: Item | undefined, index: number) => {
		const newItemIds: ItemIdsList = [...itemIds];
		newItemIds[index] = newItem?.id;
		itemDialog.close();
		onChange(newItemIds);
	};

	return (
		<Section
			title="Items"
			contentCss={{
				flexDirection: "row",
				gap: "$4",
				paddingTop: "$sizes$spriteLabelOverflow",
			}}
		>
			<ItemPickerDialog
				selectedItems={items}
				open={itemDialog.isOpen}
				setOpen={itemDialog.setIsOpen}
				onChange={(item) => handleItemChange(item, itemDialog.data!)}
			/>

			{items?.map((item, index) => (
				<Selectable
					key={`item-${index}`}
					height={100}
					width={100}
					onClick={() => itemDialog.open(index)}
					onClear={() => handleItemChange(undefined, index)}
					clearable={!!item}
				>
					{item ? (
						<Sprite
							type="items"
							name={item.name}
							label={item.name}
							showBackground
							alwaysIncludeLabelPadding
						/>
					) : (
						<EmptyMessage>Pick an item</EmptyMessage>
					)}
				</Selectable>
			))}
		</Section>
	);
};
