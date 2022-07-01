import create from "zustand";

import { Upgrade } from "@/models/Upgrade";

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

    const data = await fetch('upgrades.json');
    const upgrades: Upgrade[] = await data.json();

    set({ loaded: true, upgrades });

    return upgrades;
  }
}));