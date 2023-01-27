import { create } from "zustand";

import { nameToId } from "@/utils/nameToId";
import { Item } from "@/models";

interface ItemsStore {
	loaded: boolean;
	items: Item[];
	itemsById: Record<string, Item>;
	loadItems: (force?: boolean) => Promise<Item[]>;
	getItemById: (id: string) => Item | undefined;
	getItemsUsedBy: (id: string) => Item[];
	getItemsByType: (type: Item["type"]) => Item[];
}

export const useItemsStore = create<ItemsStore>((set, get) => ({
	loaded: false,
	items: [],
	itemsById: {},
	// Get item with given id
	getItemById: (id: string): Item | undefined => {
		return get().itemsById[id];
	},
	// Get the list of items that uses item id passed (collabs)
	getItemsUsedBy: (id: string): Item[] => {
		return get().items.filter((i) => i.requires?.includes(id));
	},
	// Filter by item type
	getItemsByType: (type: string): Item[] => {
		return get().items.filter((i) => i.type === type);
	},
	// Fetch items file
	loadItems: async (force?: boolean) => {
		if (get().loaded && !force) {
			return get().items;
		}

		try {
			const data = await fetch("items.json");
			const items: Item[] = await data.json();

			// generate id based on item name
			items.forEach((item) => {
				item.id = nameToId(item.name);
			});

			set({
				loaded: true,
				items,
				itemsById: items.reduce((acc, item) => {
					acc[item.id] = item;

					return acc;
				}, {} as Record<string, Item>),
			});

			return items;
		} catch (e) {
			set({ loaded: false, items: [], itemsById: {} });

			return [];
		}
	},
}));
