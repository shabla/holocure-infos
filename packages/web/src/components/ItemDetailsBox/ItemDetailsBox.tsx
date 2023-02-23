import { useMemo } from "react";
import { Sprite, Box, InfoTable } from "@/components";
import { useItemsStore } from "@/stores";
import { Item } from "@holocure-builds/common";
import { getHighlightedElements } from "@/utils/getHighlightedElements";
import { styled } from "@holocure-builds/common";

export interface ItemDetailsBoxProps {
	item?: Item;
	onItemSelected: (item: Item) => void;
}

const ItemDetailsBoxContainer = styled(Box, {
	header: {
		paddingLeft: 0,
		".item-name": {
			marginLeft: "15px",
			flex: "1 1 auto",
		},
		".item-type": {
			fontSize: "16px",
			color: "#aaa",
		},
	},
	main: {
		padding: 0,
		minHeight: "150px",
	},
});

export const ItemDetailsBox = ({
	item,
	onItemSelected,
}: ItemDetailsBoxProps) => {
	const [getItemById, getItemsUsedBy] = useItemsStore((state) => [
		state.getItemById,
		state.getItemsUsedBy,
	]);

	const usedIn: Item[] = useMemo(
		() => (item ? getItemsUsedBy(item.id) : []),
		[item],
	);

	return (
		<ItemDetailsBoxContainer
			label={
				<>
					{item ? (
						<>
							<Sprite
								type="items"
								name={item?.name}
								value={item}
								showBackground
							/>
							<span className="item-name">{item?.name}</span>
							<span className="item-type">{item?.type}</span>
						</>
					) : (
						<div className="item-name">-</div>
					)}
				</>
			}
		>
			<InfoTable small>
				<tbody>
					{item?.requirement && (
						<tr>
							<td className="name">Requirement</td>
							<td className="value">{item.requirement}</td>
						</tr>
					)}

					<tr>
						<td className="name">{item?.levels ? "Level 1" : "Description"}</td>
						<td className="value">
							{item && getHighlightedElements(item.desc)}
						</td>
					</tr>

					{item?.levels?.map((level) => (
						<tr key={level.level}>
							<td className="name">Level {level.level}</td>
							<td className="value">{getHighlightedElements(level.desc)}</td>
						</tr>
					))}

					{item?.requires && (
						<tr>
							<td className="name">Requires</td>
							<td className="value row">
								{item.requires.map((itemId) => {
									const item = getItemById(itemId);
									return (
										<Sprite
											key={itemId}
											type="items"
											name={item?.name}
											label={item?.name}
											showBackground
											value={item}
											onSelected={onItemSelected}
										/>
									);
								})}
							</td>
						</tr>
					)}

					{usedIn?.length > 0 && (
						<tr>
							<td className="name">Used In</td>
							<td className="value">
								{usedIn.map((item) => (
									<Sprite
										type={"items"}
										name={item?.name}
										value={item}
										label={item.name}
										showBackground={true}
										onSelected={onItemSelected}
										key={item.name}
									/>
								))}
							</td>
						</tr>
					)}
				</tbody>
			</InfoTable>
		</ItemDetailsBoxContainer>
	);
};
