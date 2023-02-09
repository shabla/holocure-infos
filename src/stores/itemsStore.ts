import { create } from "zustand";
import { Item } from "@/models";

interface ItemsStore {
	loaded: boolean;
	items: Item[];
	loadItems: () => Promise<Item[]>;
	getItemById: (id?: number) => Item | undefined;
	getItemsUsedBy: (id: number) => Item[];
	getItemsByType: (type: Item["type"]) => Item[];
	getBaseItemIds: (ids: number[]) => number[];
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
	// Fetch items file
	loadItems: async () => {
		try {
			const data = await fetch("items.json");
			const items: Item[] = await data.json();

			set({
				loaded: true,
				items,
			});

			return items;
		} catch (e) {
			set({ loaded: false, items: [] });

			return [];
		}
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
}));
