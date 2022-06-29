import create from "zustand";

import { Upgrade } from "@/models/Upgrade";

interface UpgradesStore {
  loading: boolean;
  upgrades: Upgrade[];
  loadUpgrades: () => Promise<Upgrade[]>;
}

export const useUpgradesStore = create<UpgradesStore>((set, get) => ({
  loading: false,
  upgrades: [],
  loadUpgrades: async () => {
    set({ loading: true });

    const data = await fetch('/upgrades.json');
    const upgrades: Upgrade[] = await data.json();

    set({ loading: false, upgrades });

    return upgrades;
  }
}));