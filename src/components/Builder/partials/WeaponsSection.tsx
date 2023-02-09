import { ItemComponents, Selectable, WeaponPickerDialog } from "@/components";
import { useDialogState } from "@/hooks/useDialogState";
import { Item, WeaponIdsList, WeaponsList } from "@/models";
import { useItemsStore } from "@/stores";
import React, { useMemo } from "react";
import { EmptyMessage, Section } from "../BuilderStyled";

export interface WeaponsSectionProps {
	weaponIds: WeaponIdsList;
	onChange: (weapons: WeaponIdsList) => void;
}

export const WeaponsSection = ({
	weaponIds,
	onChange,
}: WeaponsSectionProps): React.ReactElement => {
	const weaponDialog = useDialogState<number>();
	const weapons = useItemsStore((state) =>
		useMemo(
			() =>
				weaponIds.map((id) =>
					id ? state.getItemById(id) : undefined,
				) as WeaponsList,
			[weaponIds],
		),
	);

	const handleWeaponChange = (newWeapon: Item | undefined, index: number) => {
		const newCollabs: WeaponIdsList = [...weaponIds];
		newCollabs[index] = newWeapon?.id;
		weaponDialog.close();
		onChange(newCollabs);
	};

	return (
		<Section
			title="Weapons"
			contentCss={{
				flexDirection: "row",
				flexWrap: "wrap",

				"@desktop": {
					flexWrap: "nowrap",
				},
			}}
		>
			<WeaponPickerDialog
				selectedItems={weapons}
				open={weaponDialog.isOpen}
				setOpen={weaponDialog.setIsOpen}
				onChange={(weapon) => handleWeaponChange(weapon, weaponDialog.data!)}
			/>

			{weapons.map((weapon, index) => (
				<Selectable
					key={`weapon-slot-${index}`}
					css={{
						flex: "1 1 30%", // for max 3 per row
						minWidth: 170,
						width: 170,
						height: 190,
					}}
					onClick={() => weaponDialog.open(index)}
					onClear={() => handleWeaponChange(undefined, index)}
					clearable={!!weapon}
				>
					{weapon ? (
						<ItemComponents item={weapon} />
					) : (
						<EmptyMessage>Pick a weapon</EmptyMessage>
					)}
				</Selectable>
			))}
		</Section>
	);
};
