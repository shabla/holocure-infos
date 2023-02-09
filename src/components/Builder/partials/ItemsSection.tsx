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
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
				placeItems: "center",

				"@bp1": {
					gridTemplateColumns: "1fr 1fr 1fr",
				},
				"@bp3": {
					display: "flex",
					flexDirection: "row",
				},
			}}
		>
			<ItemPickerDialog
				selectedItemIds={itemIds}
				open={itemDialog.isOpen}
				setOpen={itemDialog.setIsOpen}
				onChange={(item) => handleItemChange(item, itemDialog.data!)}
			/>

			{items?.map((item, index) => (
				<Selectable
					key={`item-${index}`}
					css={{ height: 100, minWidth: 100, width: "100%" }}
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
