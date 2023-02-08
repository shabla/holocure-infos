import { Item } from "@/models";
import { styled } from "@/styles";
import { Sprite } from "@/components";
import { useItemsStore } from "@/stores";
import { PlusIcon, ArrowRightIcon } from "@radix-ui/react-icons";

export interface CollabRowProps {
	disabledWeapons?: number[];
	disabled?: boolean;
	item: Item;
}

const CollabRowContainer = styled("div", {
	display: "grid",
	gridTemplateColumns: "80px 20px 80px 20px 80px",
	justifyContent: "center",
	alignItems: "center",
});

const ComboOperator = styled("div", {
	width: 20,
	height: 20,
	marginTop: "10px",
});

export const CollabRow = ({
	disabled,
	disabledWeapons = [],
	item,
}: CollabRowProps) => {
	const getItemById = useItemsStore((state) => state.getItemById);

	if (!item.requires) {
		console.error(`Item "${item.name}" doesn't have any required items`, item);
		return null;
	}

	// TODO: length agnostic (maybe collabs with more than 2 components in the future)
	const firstItem = getItemById(item.requires[0]);
	const secondItem = getItemById(item.requires[1]);

	const isFirstItemDisabled = disabledWeapons.includes(firstItem!.id);
	const isSecondItemDisabled = disabledWeapons.includes(secondItem!.id);

	return (
		<CollabRowContainer>
			<Sprite
				type="items"
				name={firstItem?.name}
				label={firstItem?.name}
				showBackground
				disabled={isFirstItemDisabled}
			/>

			<ComboOperator as={PlusIcon} />

			<Sprite
				type="items"
				name={secondItem?.name}
				label={secondItem?.name}
				showBackground
				disabled={isSecondItemDisabled}
			/>

			<ComboOperator as={ArrowRightIcon} />

			<Sprite
				type="items"
				name={item.name}
				label={item.name}
				showBackground
				disabled={disabled}
			/>
		</CollabRowContainer>
	);
};
