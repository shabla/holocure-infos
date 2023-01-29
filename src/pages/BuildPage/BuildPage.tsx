import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Idol, Item, ItemsList, StampsList, WeaponsList } from "@/models";
import { ContentContainer } from "@/components";
import { useItemsStore } from "@/stores";
import { ItemDetailsBox } from "./ItemDetailsBox/ItemDetailsBox";
import { Build } from "./Build/Build";

interface ItemSection {
	type: Item["type"];
	title: string;
}

const sections: ItemSection[] = [
	{ type: "weapon", title: "Weapons" },
	{ type: "item", title: "Items" },
];

export const BuildPage = () => {
	const [selectedItem, setSelectedItem] = useState<Item | undefined>();
	const [searchParams, setSearchParams] = useSearchParams();
	const [comboMode, setComboMode] = useState<boolean>(false);
	const [comboItems, setComboItems] = useState<Item[]>([]);

	const [getItemById, getItemsByType] = useItemsStore((state) => [
		state.getItemById,
		state.getItemsByType,
	]);

	useEffect(() => {
		const itemId = searchParams.get("i");
		const selectedItem = itemId ? getItemById(itemId) : undefined;
		setSelectedItem(selectedItem);

		const comboItemIds = searchParams.get("c");
		if (comboItemIds !== null) {
			setComboMode(true);

			const validItems = comboItemIds
				.split(",")
				.map((id) => getItemById(id))
				.filter((i) => i !== undefined && i.type === "collab") as Item[];

			setComboItems(validItems);
		} else {
			setComboMode(false);
			setComboItems([]);
		}
	}, [searchParams, getItemById]);

	const updateUrlParams = (selectedItem?: Item, comboItems?: Item[]) => {
		const params = new URLSearchParams(searchParams);

		if (selectedItem === undefined) {
			params.delete("i");
		} else {
			params.set("i", selectedItem.id);
		}

		if (comboItems === undefined) {
			params.delete("c");
		} else {
			params.set("c", comboItems.map((i) => i.id).join(","));
		}

		setSearchParams(params);
	};

	const handleItemClicked = (item: Item) => {
		updateUrlParams(item, comboItems.length > 0 ? comboItems : undefined);
	};

	const handleComboItemsChanged = (items: Item[]) => {
		updateUrlParams(selectedItem, items);
	};

	const handleComboModeChanged = (state: boolean) => {
		if (state) {
			if (selectedItem && selectedItem.type === "collab") {
				// If a collab item is selected, include it in the combo
				updateUrlParams(undefined, [selectedItem]);
			} else {
				// keep non-collab selected item
				updateUrlParams(selectedItem, []);
			}
		} else if (comboItems.length === 1) {
			// disable combo, only 1 item in the combo, selected it
			updateUrlParams(comboItems[0]);
		} else {
			// disable combo, keep selected item
			updateUrlParams(selectedItem);
		}
	};

	const [idol, setIdol] = useState<Idol>();
	const [stamps, setStamps] = useState<StampsList>([
		undefined,
		{ name: "BOB" },
		undefined,
	]);
	const [weapons, setWeapons] = useState<WeaponsList>([
		getItemById("micomet"),
		getItemById("frozen-sea"),
		getItemById("rap-dog"),
		getItemById("idol-concert"),
		getItemById("spider-cooking"),
	]);
	const [items, setItems] = useState<ItemsList>([
		getItemById("stolen-piggy-bank")!,
		getItemById("limiter")!,
		getItemById("gws-pill")!,
		getItemById("just-bandage")!,
		getItemById("halu")!,
		getItemById("sake")!,
	]);

	return (
		<ContentContainer
			css={{
				flexDirection: "column",
				gap: "$content",
			}}
		>
			<Build
				idol={idol}
				stamps={stamps}
				weapons={weapons}
				items={items}
				onIdolChange={setIdol}
				onStampsChange={setStamps}
				onWeaponsChanged={setWeapons}
				onItemsChanged={setItems}
			/>

			{/* <div className="flex-row gap-content">
				<div className="item-sections">
					

				</div>

				<ItemDetailsBox item={selectedItem} onItemSelected={handleItemClicked} />
			</div> */}
		</ContentContainer>
	);
};
