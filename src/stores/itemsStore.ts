import create from "zustand"

import { Item } from "@/models/Item"

interface ItemsStore {
  loaded: boolean;
  items: Item[];
  itemsById: Record<string, Item>;
  loadItems: (force?: boolean) => Promise<void>;
  getItemById: (id: string) => Item | undefined;
  getItemUsage: (id: string) => Item[];
  getItemByType: (type: Item['type']) => Item[];
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
  getItemUsage: (id: string): Item[] => {
    return get().items.filter(i => i.requires?.includes(id));
  },
  // Filter by item type
  getItemByType: (type: string): Item[] => {
    return get().items.filter(i => i.type === type);
  },
  // Fetch items file
  loadItems: async (force?: boolean) => {
    if (get().loaded && !force) {
      return;
    }

    const data = await fetch('items.json');
    const items: Item[] = await data.json();

    set({
      loaded: true,
      items,
      itemsById: items.reduce((acc, item) => {
        acc[item.id] = item;

        return acc;
      }, {} as Record<string, Item>)
    })
  },
}))