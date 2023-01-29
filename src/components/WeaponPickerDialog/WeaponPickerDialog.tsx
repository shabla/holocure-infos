import React from "react";
import { Box, ClickableContainer, CollabRow, Dialog } from "@/components";
import { Item, WeaponsList } from "@/models";
import { useItemsStore } from "@/stores";
import { styled } from "@/styles";

export interface WeaponPickerDialogProps {
	selectedItems: WeaponsList;
	open: boolean;
	setOpen: (value: boolean) => void;
	onChange: (item: Item) => void;
}

const CollabsContainer = styled("div", {
	display: "grid",
	gridTemplateColumns: "1fr",
	rowGap: "10px",
	columnGap: "30px",
});

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
		<Dialog open={open} setOpen={setOpen}>
			<Box label="Collabs">
				<CollabsContainer>
					{collabs.map((item) => {
						const disabledWeapons =
							item.requires?.filter((itemId) => usedWeapons.includes(itemId)) ||
							[];
						const isDisabled =
							usedWeapons.includes(item.id) || disabledWeapons.length > 0;

						const row = (
							<CollabRow
								key={item.id}
								item={item}
								disabledWeapons={disabledWeapons}
								disabled={isDisabled}
							/>
						);

						if (isDisabled) {
							return row;
						} else {
							return (
								<ClickableContainer
									key={item.id}
									onClick={() => onChange(item)}
								>
									{row}
								</ClickableContainer>
							);
						}
					})}
				</CollabsContainer>
			</Box>
		</Dialog>
	);
};
