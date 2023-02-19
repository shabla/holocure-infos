import { create } from "zustand";
import { Item } from "@holocure-builds/common";

interface ItemsStore {
	loaded: boolean;
	items: Item[];
	getItemById: (id?: number) => Item | undefined;
	getItemsUsedBy: (id: number) => Item[];
	getItemsByType: (type: Item["type"]) => Item[];
	getBaseItemIds: (ids: number[]) => number[];
	loadItems: () => Promise<Item[]>;
}

export const useItemsStore = create<ItemsStore>((set, get) => ({
	loaded: false,
	items: [],
	getItemById: (id?: number): Item | undefined => {
		return id ? get().items.find((item) => item.id === id) : undefined;
	},
	// Get the list of items that uses item id passed (collabs)
	getItemsUsedBy: (id: number): Item[] => {
		return get().items.filter((i) => i.requires?.includes(id));
	},
	// Filter by item type
	getItemsByType: (type: string): Item[] => {
		return get().items.filter((i) => i.type === type);
	},
	getBaseItemIds: (ids: number[]): number[] => {
		return ids
			.flatMap((id) => {
				const item = get().getItemById(id);

				if (item?.requires) {
					return item?.requires;
				}

				return id;
			})
			.filter(
				(value, index, array) =>
					value != null && array.indexOf(value) === index,
			); // remove duplicates and undefined
	},
	// Fetch items file
	loadItems: async () => {
		if (get().loaded) {
			return get().items;
		}

		const json = await import("@/assets/data/items.json");
		const items = json.default as unknown as Item[];

		set({ loaded: true, items });

		return items;
	},
}));
