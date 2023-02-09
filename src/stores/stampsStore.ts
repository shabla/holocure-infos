import { create } from "zustand";
import { Stamp } from "@/models";

interface StampsStore {
	stamps: Stamp[];
	getStampById: (id: number) => Stamp | undefined;
	loadStamps: () => Promise<void>;
}

export const useStampsStore = create<StampsStore>((set, get) => ({
	stamps: [],
	getStampById: (id: number) => get().stamps.find((stamp) => stamp.id === id),
	loadStamps: async () => {
		try {
			const data = await fetch("/stamps.json");
			const stamps: Stamp[] = await data.json();

			set({ stamps });
		} catch (e) {
			set({ stamps: [] });
		}
	},
}));
