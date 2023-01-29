import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Idol, Item, ItemsList, StampsList, WeaponsList } from "@/models";
import { ContentContainer, ItemDetailsBox } from "@/components";
import { useItemsStore, useIdolsStore } from "@/stores";
import { Build } from "./Build/Build";
import { styled } from "@/styles";
import { IdolProfileBox } from "@/components/IdolProfileBox/IdolProfileBox";

const PageSections = styled("div", {
	display: "flex",
	flexDirection: "row",
	width: "100%",
	gap: "15px",
});

const PageSection = styled("div", {});

export function BuildPage() {
	const [selectedItem, setSelectedItem] = useState<Item | undefined>();
	const [searchParams, setSearchParams] = useSearchParams();
	const [comboMode, setComboMode] = useState<boolean>(false);
	const [comboItems, setComboItems] = useState<Item[]>([]);

	const getIdolById = useIdolsStore((state) => state.getIdolById);
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

	const [idol, setIdol] = useState<Idol | undefined>(getIdolById("gawr-gura")!);
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
		getItemById("halu")!,
		getItemById("limiter")!,
		getItemById("gws-pill")!,
		getItemById("just-bandage")!,
		getItemById("uber-sheep")!,
		getItemById("sake")!,
	]);

	return (
		<ContentContainer
			css={{
				flexDirection: "column",
				gap: "15px",
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

			<PageSections>
				<PageSection css={{ flex: "1 1 40%" }}>
					<IdolProfileBox idol={idol} />
				</PageSection>

				<PageSection css={{ flex: "1 1 60%" }}>
					<ItemDetailsBox
						item={getItemById("frozen-sea")}
						onItemSelected={(item) => console.log(item)}
					/>
				</PageSection>
			</PageSections>
		</ContentContainer>
	);
}
