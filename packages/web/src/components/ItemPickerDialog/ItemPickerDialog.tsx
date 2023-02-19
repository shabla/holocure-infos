import React from "react";
import { Dialog, ItemPicker } from "@/components";
import { Item, ItemIdsList } from "@holocure-builds/common";
import { useItemsStore } from "@/stores";

export interface ItemPickerDialogProps {
	selectedItemIds: ItemIdsList;
	open: boolean;
	setOpen: (value: boolean) => void;
	onChange: (item: Item) => void;
}

export const ItemPickerDialog = ({
	selectedItemIds,
	open,
	setOpen,
	onChange,
}: ItemPickerDialogProps): React.ReactElement => {
	const items = useItemsStore((state) => state.getItemsByType("item"));

	return (
		<Dialog open={open} setOpen={setOpen} title="Items">
			<ItemPicker
				items={items}
				disabledItemIds={selectedItemIds as number[]}
				css={{ placeContent: "center" }}
				onSelect={onChange}
			/>
		</Dialog>
	);
};
