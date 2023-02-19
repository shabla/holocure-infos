import React, { useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Item } from "@holocure-builds/common";
import { useItemsStore } from "@/stores";
import { ItemPicker } from "../ItemPicker/ItemPicker";
import { CollabPicker } from "../CollabPicker/CollabPicker";
import {
	ItemsContainer,
	Tab,
	TabCloseButton,
	Tabs,
	WeaponPickerContainer,
} from "./WeaponPickerStyled";

export interface WeaponPickerProps {
	open: boolean;
	usedWeaponIds: number[];
	onSelect: (item: Item) => void;
	onClose: () => void;
}

export const WeaponPicker = ({
	open,
	usedWeaponIds,
	onSelect,
	onClose,
}: WeaponPickerProps): React.ReactElement => {
	const [displayedItemType, setDisplayedItems] = useState("collab");
	const [collabs, weapons] = useItemsStore((state) => [
		state.getItemsByType("collab"),
		state.getItemsByType("weapon"),
	]);

	return (
		<Collapsible.Root open={open}>
			<WeaponPickerContainer>
				<Tabs>
					<Tab
						selected={displayedItemType === "collab"}
						onClick={() => setDisplayedItems("collab")}
					>
						Collabs
					</Tab>
					<Tab
						selected={displayedItemType === "weapon"}
						onClick={() => setDisplayedItems("weapon")}
					>
						Basic Weapons
					</Tab>

					<TabCloseButton onClick={onClose} />
				</Tabs>

				<ItemsContainer>
					{displayedItemType === "collab" ? (
						// TODO: remove selected item from disabled items
						<CollabPicker
							collabs={collabs}
							disabledWeaponIds={usedWeaponIds}
							onSelect={onSelect}
						/>
					) : displayedItemType === "weapon" ? (
						<ItemPicker
							items={weapons}
							disabledItemIds={usedWeaponIds}
							onSelect={onSelect}
						/>
					) : null}
				</ItemsContainer>
			</WeaponPickerContainer>
		</Collapsible.Root>
	);
};
