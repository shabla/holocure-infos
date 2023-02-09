import React from "react";
import { Dialog, Selectable, Sprite } from "@/components";
import { Item, ItemIdsList } from "@/models";
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
		<Dialog
			open={open}
			setOpen={setOpen}
			title="Items"
			contentCss={{
				display: "grid",
				gridTemplateColumns: "repeat(3, 1fr)",
				justifyContent: "center",
				alignItems: "center",
				gap: "$1",

				"@bp1": {
					gridTemplateColumns: "repeat(4, 1fr)",
				},
				"@bp2": {
					gridTemplateColumns: "repeat(5, 1fr)",
				},
				"@bp3": {
					gridTemplateColumns: "repeat(6, 1fr)",
				},
				"@desktop": {
					gridTemplateColumns: "repeat(7, 1fr)",
				},
			}}
		>
			{items.map((item) => {
				const isDisabled = selectedItemIds.includes(item.id);

				return (
					<Selectable
						key={item.id}
						disabled={isDisabled}
						onClick={isDisabled ? undefined : () => onChange(item)}
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
		</Dialog>
	);
};
