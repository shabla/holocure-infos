import { Item } from "@/models";
import { useItemsStore } from "@/stores";
import { styled } from "@/styles";
import React, { useState } from "react";
import { ChevronUpIcon } from "@radix-ui/react-icons";
import { ItemPicker } from "../ItemPicker/ItemPicker";
import { CollabPicker } from "../CollabPicker/CollabPicker";

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
		<WeaponPickerContainer open={open}>
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

				<CloseButton onClick={onClose}>
					<ChevronUpIcon />
				</CloseButton>
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
	);
};

const Tabs = styled("div", {
	position: "relative",
	backgroundColor: "$darkBlue",
	display: "flex",
	flexDirection: "row",
	height: 40,
});

const Tab = styled("button", {
	all: "unset",
	color: "white",
	padding: "$2 $4",
	cursor: "pointer",

	variants: {
		selected: {
			true: {
				background: "white",
				color: "$darkBlue",
				fontWeight: 700,
			},
		},
	},
});

const CloseButton = styled("div", {
	position: "absolute",
	top: 0,
	right: 0,
	height: 40,
	width: 40,
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",

	svg: {
		display: "block",
		height: 30,
		width: 30,
	},

	"&:hover": {
		cursor: "pointer",
		backgroundColor: "rgba(255,255,255,0.1)",
	},
});

const WeaponPickerContainer = styled("div", {
	border: "1px solid white",
	backgroundColor: "$darkBlueHalfOpacity",
	overflow: "hidden",
	transition: "max-height 0.3s ease-out, transform 0.25s ease",
	maxHeight: 0,
	transform: "scaleY(0)",
	transformOrigin: "top",

	variants: {
		open: {
			true: {
				maxHeight: 1200,
				transform: "scaleY(1)",
			},
		},
	},
});

const ItemsContainer = styled("div", {
	padding: "$3",
});
