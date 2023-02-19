import { Upgrade } from "@holocure-builds/common";
import { create } from "zustand";

interface UpgradesStore {
	loaded: boolean;
	upgrades: Upgrade[];
	loadUpgrades: () => Promise<Upgrade[]>;
}

export const useUpgradesStore = create<UpgradesStore>((set, get) => ({
	loaded: false,
	upgrades: [],
	loadUpgrades: async (): Promise<Upgrade[]> => {
		if (get().loaded) {
			return get().upgrades;
		}

		const json = await import("@/assets/data/upgrades.json");
		const upgrades = json.default as unknown as Upgrade[];

		set({ loaded: true, upgrades });

		return upgrades;
	},
}));
