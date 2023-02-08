import { create } from "zustand";
import { Stamp } from "@/models";
import stampsJSON from "@/assets/stamps.json";

interface StampsStore {
	stamps: Stamp[];
	getStampById: (id: number) => Stamp | undefined;
}

export const useStampsStore = create<StampsStore>((set, get) => ({
	stamps: stampsJSON as Stamp[],
	getStampById: (id: number) => get().stamps.find((stamp) => stamp.id === id),
}));
