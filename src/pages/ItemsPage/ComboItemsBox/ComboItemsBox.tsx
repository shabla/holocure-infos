import { Item } from "@/models";
import { Sprite, Box } from "@/components";
import { useItemsStore } from "@/stores";

export interface ComboItemsBoxProps {
	items: Item[];
	selectedItem?: Item;
	onItemClicked: (item: Item) => void;
	onClear: () => void;
}

export const ComboItemsBox = ({
	items,
	selectedItem,
	onItemClicked,
	onClear,
}: ComboItemsBoxProps) => {
	const getItemById = useItemsStore((state) => state.getItemById);

	return (
		<Box
			className="combo-items-box"
			label={
				<>
					Build-a-combo ({items.length} / 4)
					<button className="clear-btn" onClick={onClear} disabled={items.length === 0}>
						Clear
					</button>
				</>
			}
		>
			<div className="flex-row flex-fill align-center align-x-center gap-20">
				{items.length === 0 && <div>Click on collab items to add them to your combo</div>}

				{items.map((comboItem) => (
					<div className="flex-column align-x-center gap-10" key={comboItem.id}>
						<Sprite
							type="items"
							name={comboItem.name}
							selected={comboItem === selectedItem}
							showBackground
							label={comboItem.name}
							value={comboItem}
							onSelected={onItemClicked}
							key={comboItem.id}
						/>

						<div className="flex-row gap-5">
							{comboItem.requires?.map((id) => {
								const item = getItemById(id)!;

								return (
									<Sprite
										type="items"
										name={item.name}
										selected={item === selectedItem}
										showBackground
										label={item.name}
										value={item}
										onSelected={onItemClicked}
										key={item.id}
									/>
								);
							})}
						</div>
					</div>
				))}
			</div>
		</Box>
	);
};
