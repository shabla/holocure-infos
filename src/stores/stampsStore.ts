import { create } from "zustand";
import { Stamp } from "@/models";

interface StampsStore {
	loaded: boolean;
	stamps: Stamp[];
	getStampById: (id: number) => Stamp | undefined;
	loadStamps: () => Promise<Stamp[]>;
}

export const useStampsStore = create<StampsStore>((set, get) => ({
	loaded: false,
	stamps: [],
	getStampById: (id: number) => get().stamps.find((stamp) => stamp.id === id),
	loadStamps: async (): Promise<Stamp[]> => {
		if (get().loaded) {
			return get().stamps;
		}

		const json = await import("@/assets/data/stamps.json");
		const stamps = json.default as unknown as Stamp[];

		set({ loaded: true, stamps });

		return stamps;
	},
}));
