import create from "zustand";

import { Upgrade } from "@/models";

interface UpgradesStore {
  loaded: boolean;
  upgrades: Upgrade[];
  loadUpgrades: (force?: boolean) => Promise<Upgrade[]>;
}

export const useUpgradesStore = create<UpgradesStore>((set, get) => ({
  loaded: false,
  upgrades: [],
  loadUpgrades: async (force?: boolean): Promise<Upgrade[]> => {
    if (get().loaded && !force) {
      return get().upgrades;
    }

    try {
      const data = await fetch('upgrades.json');
      const upgrades: Upgrade[] = await data.json();

      set({ loaded: true, upgrades });

      return upgrades;
    } catch (e) {
      set({ loaded: false, upgrades: [] });

      return []
    }
  }
}));