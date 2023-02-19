import { ItemComponents, Selectable, WeaponPicker } from "@/components";
import { useDialogState } from "@/hooks/useDialogState";
import { Item, WeaponIdsList, WeaponsList } from "@holocure-builds/common";
import { useItemsStore } from "@/stores";
import React, { useEffect, useMemo } from "react";
import { EmptyMessage, Section } from "../BuilderStyled";

export interface WeaponsSectionProps {
	weaponIds: WeaponIdsList;
	onChange: (weapons: WeaponIdsList) => void;
}

type WeaponPickerDataType = {
	slotIndex: number;
	disabledItemIds: number[];
};

export const WeaponsSection = ({
	weaponIds,
	onChange,
}: WeaponsSectionProps): React.ReactElement => {
	const weaponPicker = useDialogState<WeaponPickerDataType>();

	const [slottedWeapons, usedWeaponIds] = useItemsStore((state) => [
		useMemo(
			() =>
				weaponIds.map((id) =>
					id ? state.getItemById(id) : undefined,
				) as WeaponsList,
			[weaponIds],
		),
		useMemo(() => state.getBaseItemIds(weaponIds as number[]), [weaponIds]),
	]);

	useEffect(() => {
		weaponPicker.close();
	}, [weaponIds]);

	const handleSlotClicked = (weapon: Item | undefined, index: number) => {
		if (weaponPicker.data?.slotIndex === index) {
			weaponPicker.close();
		} else {
			const data: WeaponPickerDataType = {
				slotIndex: index,
				disabledItemIds:
					weapon?.type === "weapon"
						? usedWeaponIds.filter((id) =>
								weapon?.requires
									? !weapon?.requires.includes(id)
									: weapon?.id !== id,
						  )
						: usedWeaponIds,
			};

			weaponPicker.open(data);
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
						selected={
							weaponPicker.isOpen && weaponPicker.data?.slotIndex === index
						}
						clearable={!!weapon}
						onClick={() => handleSlotClicked(weapon, index)}
						onClear={() => handleWeaponChange(undefined, index)}
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
				usedWeaponIds={weaponPicker.data?.disabledItemIds || usedWeaponIds}
				onSelect={(item) =>
					handleWeaponChange(item, weaponPicker.data?.slotIndex!)
				}
				onClose={weaponPicker.close}
			/>
		</>
	);
};
