import React from "react";
import { Selectable, CollabRow, Dialog } from "@/components";
import { Item, WeaponsList } from "@/models";
import { useItemsStore } from "@/stores";

export interface WeaponPickerDialogProps {
	selectedItems: WeaponsList;
	open: boolean;
	setOpen: (value: boolean) => void;
	onChange: (item: Item) => void;
}

// TODO: add simple weapons
export const WeaponPickerDialog = ({
	selectedItems,
	open,
	setOpen,
	onChange,
}: WeaponPickerDialogProps): React.ReactElement => {
	const [collabs, weapons] = useItemsStore((state) => [
		state.getItemsByType("collab"),
		state.getItemsByType("weapon"),
	]);

	const usedWeapons = (selectedItems.filter((item) => !!item) as Item[])
		.flatMap((item) => (item?.requires ? item?.requires : item.id))
		// remove duplicates
		.filter((value, index, array) => array.indexOf(value) === index);

	return (
		<Dialog
			open={open}
			setOpen={setOpen}
			title="Collabs"
			contentCss={{
				display: "grid",
				gridTemplateColumns: "1fr",
				rowGap: "$1",
				columnGap: "30px",

				"@desktop": {
					gridTemplateColumns: "1fr 1fr",
				},
			}}
		>
			{collabs.map((item) => {
				const disabledWeapons =
					item.requires?.filter((itemId) => usedWeapons.includes(itemId)) || [];
				const isDisabled =
					usedWeapons.includes(item.id) || disabledWeapons.length > 0;

				return (
					<Selectable
						key={item.id}
						disabled={isDisabled}
						onClick={() => onChange(item)}
					>
						<CollabRow
							key={item.id}
							item={item}
							disabledWeapons={disabledWeapons}
							disabled={isDisabled}
						/>
					</Selectable>
				);
			})}
		</Dialog>
	);
};
