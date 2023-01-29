import {
	Box,
	Sprite,
	IdolPickerDialog,
	CollabTree,
	ClickableContainer,
	ItemPickerDialog,
} from "@/components";
import { useDialogState } from "@/hooks/useDialogState";
import {
	Idol,
	Item,
	ItemsList,
	Stamp,
	StampsList,
	WeaponsList,
} from "@/models";
import React, { useState } from "react";
import {
	BuildContainer,
	StampContainer,
	StampsContainer,
	SectionsContainer,
	Section,
	ClearButton,
} from "./BuildStyled";

export interface BuildProps {
	idol?: Idol;
	stamps?: StampsList;
	weapons?: WeaponsList;
	items?: ItemsList;
	onIdolChange: (idol?: Idol) => void;
	onStampsChange: (stamps: StampsList) => void;
	onWeaponsChanged: (weapons: WeaponsList) => void;
	onItemsChanged: (items: ItemsList) => void;
}

export const Build = ({
	idol,
	stamps = [undefined, undefined, undefined],
	weapons = [undefined, undefined, undefined, undefined, undefined],
	items = [undefined, undefined, undefined, undefined, undefined, undefined],
	onIdolChange,
	onStampsChange,
	onWeaponsChanged,
	onItemsChanged,
}: BuildProps): React.ReactElement => {
	const idolDialog = useDialogState();
	// remember the index of the item we clicked on
	const itemDialog = useDialogState<number>();

	const handleIdolChange = (idol?: Idol) => {
		onIdolChange(idol);
		idolDialog.close();
	};

	const handleStampChange = (newStamp: Stamp | undefined, index: number) => {
		console.log(`changing stamp index ${index} to`, newStamp?.name);
		const newStamps: StampsList = [...stamps];
		newStamps[index] = newStamp;
		onStampsChange(newStamps);
	};

	const handleWeaponChange = (newWeapon: Item | undefined, index: number) => {
		console.log(`changing collab index ${index} to`, newWeapon?.id);
		const newCollabs: WeaponsList = [...weapons];
		newCollabs[index] = newWeapon;
		onWeaponsChanged(newCollabs);
	};

	const handleItemChange = (newItem: Item | undefined, index: number) => {
		console.log(`changing item index ${index} to`, newItem?.id);
		const newItems: ItemsList = [...items];
		newItems[index] = newItem;
		onItemsChanged(newItems);
		itemDialog.close();
	};

	const handleReset = () => {
		handleIdolChange(undefined);
		onStampsChange([undefined, undefined, undefined]);
		onWeaponsChanged([undefined, undefined, undefined, undefined, undefined]);
		onItemsChanged([
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
			undefined,
		]);
	};

	return (
		<Box
			label={
				<>
					<span>Build</span>

					<button type="button" onClick={handleReset}>
						Reset
					</button>
				</>
			}
		>
			<IdolPickerDialog
				idol={idol}
				open={idolDialog.isOpen}
				setOpen={idolDialog.setIsOpen}
				onChange={handleIdolChange}
			/>
			<ItemPickerDialog
				selectedItems={items}
				open={itemDialog.isOpen}
				setOpen={itemDialog.setIsOpen}
				onChange={(item) => {
					handleItemChange(item, itemDialog.data!);
				}}
			/>

			<BuildContainer>
				<SectionsContainer>
					{/* Idol */}
					<Section title="Idol">
						<ClickableContainer onClick={idolDialog.open}>
							{idol && <ClearButton onClick={() => onIdolChange(undefined)} />}
							<Sprite
								type="idols-icon"
								name={idol?.name}
								label={idol?.name ?? "Pick an idol"}
								alwaysIncludeLabelPadding
							/>
						</ClickableContainer>
					</Section>

					{/* Attack & Stamps */}
					<Section title="Stamps" contentCss={{ gap: "$3" }}>
						<Sprite
							type="skills"
							name={idol?.attack.name}
							label={idol?.attack?.name}
							alwaysIncludeLabelPadding
						/>

						<StampsContainer>
							{stamps?.map((stamp, index) => (
								<ClickableContainer
									key={stamp?.name || index}
									onClick={() => {
										console.log("open stamp dialog");
									}}
								>
									{stamp && (
										<ClearButton
											onClick={() => handleStampChange(undefined, index)}
										/>
									)}
									<StampContainer>
										<Sprite
											type="stamp"
											name={stamp?.name}
											label={stamp?.name}
										/>
									</StampContainer>
								</ClickableContainer>
							))}
						</StampsContainer>
					</Section>
				</SectionsContainer>

				<SectionsContainer css={{ flex: "1 1 auto" }}>
					{/* Collabs & Weapons */}
					<Section
						title="Weapons"
						contentCss={{ flexDirection: "row", gap: "$4" }}
					>
						{weapons?.map((weapon, index) => (
							<ClickableContainer
								key={weapon?.id || index}
								width={170}
								height={190}
								onClick={() => {
									console.log("collab clicked ", weapon?.id);
								}}
							>
								{weapon && (
									<ClearButton
										onClick={() => handleWeaponChange(undefined, index)}
									/>
								)}
								{!weapon?.id && <div>Pick a weapon</div>}
								<CollabTree itemId={weapon?.id} />
							</ClickableContainer>
						))}
					</Section>

					{/* Items */}
					<Section
						title="Items"
						contentCss={{
							flexDirection: "row",
							gap: "$4",
							paddingTop: "$sizes$spriteLabelOverflow",
						}}
					>
						{items?.map((item, index) => (
							<ClickableContainer
								key={item?.id || index}
								height={90}
								width={100}
								onClick={() => itemDialog.open(index)}
							>
								{item && (
									<ClearButton
										onClick={() => handleItemChange(undefined, index)}
									/>
								)}
								<Sprite
									type="items"
									name={item?.name}
									label={item?.name}
									showBackground
									alwaysIncludeLabelPadding
								/>
							</ClickableContainer>
						))}
					</Section>
				</SectionsContainer>
			</BuildContainer>
		</Box>
	);
};
