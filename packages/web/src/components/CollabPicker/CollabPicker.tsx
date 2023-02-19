import { Item } from "@holocure-builds/common";
import { styled } from "@stitches/react";
import React from "react";
import { CollabRow } from "../CollabRow/CollabRow";
import { Selectable } from "../Selectable/Selectable";

export interface CollabPickerProps {
	disabledWeaponIds: number[];
	collabs: Item[];
	onSelect: (collab: Item) => void;
}

export const CollabPicker = ({
	disabledWeaponIds,
	collabs,
	onSelect,
}: CollabPickerProps): React.ReactElement => {
	return (
		<CollabPickerContainer>
			{collabs.map((item) => {
				const disabledWeapons =
					item.requires?.filter((itemId) =>
						disabledWeaponIds.includes(itemId),
					) || [];
				const isDisabled =
					disabledWeaponIds.includes(item.id) || disabledWeapons.length > 0;

				return (
					<Selectable
						key={item.id}
						disabled={isDisabled}
						onClick={() => onSelect(item)}
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
		</CollabPickerContainer>
	);
};

const CollabPickerContainer = styled("div", {
	display: "grid",
	gridTemplateColumns: "1fr 1fr",
	rowGap: "$1",
	columnGap: "30px",
});
