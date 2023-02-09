import { ItemComponents, Selectable, WeaponPicker } from "@/components";
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
	const weaponPicker = useDialogState<number>();

	const [slottedWeapons, usedWeaponIds] = useItemsStore((state) => [
		useMemo(
			() =>
				weaponIds.map((id) =>
					id ? state.getItemById(id) : undefined,
				) as WeaponsList,
			[weaponIds],
		),
		state.getBaseItemIds(weaponIds as number[]),
	]);

	const handleSlotClicked = (index: number) => {
		if (weaponPicker.data === index) {
			weaponPicker.close();
		} else {
			weaponPicker.open(index);
		}
	};

	const handleWeaponChange = (newWeapon: Item | undefined, index: number) => {
		const newCollabs: WeaponIdsList = [...weaponIds];
		newCollabs[index] = newWeapon?.id;
		weaponPicker.close();
		onChange(newCollabs);
	};

	return (
		<>
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
				{slottedWeapons.map((weapon, index) => (
					<Selectable
						key={`weapon-slot-${index}`}
						css={{
							flex: "1 1 30%", // for max 3 per row
							minWidth: 170,
							width: 170,
							height: 190,
						}}
						selected={weaponPicker.isOpen && weaponPicker.data === index}
						onClick={() => handleSlotClicked(index)}
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

			<WeaponPicker
				open={weaponPicker.isOpen}
				usedWeaponIds={usedWeaponIds}
				onSelect={(item) => handleWeaponChange(item, weaponPicker.data!)}
				onClose={weaponPicker.close}
			/>
		</>
	);
};
