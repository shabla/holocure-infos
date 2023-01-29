import { useMemo } from "react";

import { Sprite, SpriteProps, Box } from "@/components";
import { useItemsStore } from "@/stores";
import { Item } from "@/models";
import { getHighlightedElements } from "@/utils/getHighlightedElements";

export interface ItemDetailsBoxProps {
	item?: Item;
	onItemSelected: (item: Item) => void;
}

export const ItemDetailsBox = ({
	item,
	onItemSelected,
}: ItemDetailsBoxProps) => {
	const [getItemById, getItemsUsedBy] = useItemsStore((state) => [
		state.getItemById,
		state.getItemsUsedBy,
	]);

	const usedIn: Item[] = useMemo(() => {
		if (item) {
			return getItemsUsedBy(item.id);
		}
		return [];
	}, [item]);

	return (
		<Box
			className="item-details-box sticky"
			label={
				item ? (
					<>
						<div className="flex-row align-x-center">
							<Sprite
								type="items"
								name={item?.name}
								value={item}
								showBackground
								onSelected={onItemSelected}
							/>
							<span className="item-name">{item?.name}</span>
						</div>
						<span className="item-type">{item?.type}</span>
					</>
				) : (
					<div>
						<div className="item-name">-</div>
					</div>
				)
			}
		>
			{item ? (
				<table className="info-table">
					<tbody>
						{item?.requirement && (
							<tr>
								<td className="name">Requirement</td>
								<td className="value">{item.requirement}</td>
							</tr>
						)}

						<tr>
							<td className="name">
								{item?.levels ? "Level 1" : "Description"}
							</td>
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
								<td className="value">
									{/* FIXME: replace with same thing as SpriteListContainer in IdolGenerations */}
									{/* <SpriteList
										sprites={item.requires.map((itemId) => {
											const item = getItemById(itemId);
											return {
												type: "items",
												name: item?.name,
												value: item,
												label: item?.name,
												showBackground: true,
												onSelected: onItemSelected,
												key: itemId,
											} as SpriteProps;
										})}
									/> */}
								</td>
							</tr>
						)}

						{usedIn?.length > 0 && (
							<tr>
								<td className="name">Used In</td>
								<td className="value">
									<SpriteList
										sprites={usedIn.map(
											(item) =>
												({
													type: "items",
													name: item?.name,
													value: item,
													label: item.name,
													showBackground: true,
													onSelected: onItemSelected,
													key: item.name,
												}) as SpriteProps,
										)}
									/>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			) : (
				<div className="flex-column align-center align-x-center flex-fill p-20">
					Select an item to see more details
				</div>
			)}
		</Box>
	);
};
