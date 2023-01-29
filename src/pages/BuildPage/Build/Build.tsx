import {
	Box,
	Sprite,
	IdolPickerDialog,
	CollabTree,
	Selectable,
	ItemPickerDialog,
	WeaponPickerDialog,
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
import {
	BuildContainer,
	StampContainer,
	StampsContainer,
	SectionsContainer,
	ResetButton,
	Section,
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
	const itemDialog = useDialogState<number>();
	const weaponDialog = useDialogState<number>();

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
		weaponDialog.close();
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

					<ResetButton type="button" onClick={handleReset}>
						Reset
					</ResetButton>
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
				onChange={(item) => handleItemChange(item, itemDialog.data!)}
			/>
			<WeaponPickerDialog
				selectedItems={weapons}
				open={weaponDialog.isOpen}
				setOpen={weaponDialog.setIsOpen}
				onChange={(weapon) => handleWeaponChange(weapon, weaponDialog.data!)}
			/>

			<BuildContainer>
				<SectionsContainer>
					{/* Idol */}
					<Section title="Idol">
						<Selectable
							onClick={idolDialog.open}
							onClear={() => handleIdolChange(undefined)}
							clearable={!!idol}
						>
							<Sprite
								type="idols-icon"
								name={idol?.name}
								label={idol?.name ?? "Pick an idol"}
								alwaysIncludeLabelPadding
							/>
						</Selectable>
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
								<Selectable
									key={stamp?.name || index}
									onClick={() => console.log("open stamp dialog")}
									onClear={() => handleStampChange(undefined, index)}
									clearable={!!stamp}
								>
									<StampContainer>
										<Sprite
											type="stamp"
											name={stamp?.name}
											label={stamp?.name}
										/>
									</StampContainer>
								</Selectable>
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
							<Selectable
								key={weapon?.id || index}
								width={170}
								height={190}
								onClick={() => weaponDialog.open(index)}
								onClear={() => handleWeaponChange(undefined, index)}
								clearable={!!weapon}
							>
								{!weapon?.id && <div>Pick a weapon</div>}
								<CollabTree itemId={weapon?.id} />
							</Selectable>
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
							<Selectable
								key={item?.id || index}
								height={90}
								width={100}
								onClick={() => itemDialog.open(index)}
								onClear={() => handleItemChange(undefined, index)}
								clearable={!!item}
							>
								<Sprite
									type="items"
									name={item?.name}
									label={item?.name}
									showBackground
									alwaysIncludeLabelPadding
								/>
							</Selectable>
						))}
					</Section>
				</SectionsContainer>
			</BuildContainer>
		</Box>
	);
};
