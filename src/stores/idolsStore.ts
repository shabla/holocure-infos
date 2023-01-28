import { create } from "zustand";

import { nameToId } from "@/utils/nameToId";
import { Idol, IdolGeneration } from "@/models";

type GenerationWithIdols = IdolGeneration & { idols: Idol[] };

interface IdolsStore {
	loaded: boolean;
	idols: Idol[];
	getGenerations: () => GenerationWithIdols[];
	getIdolById: (id: string) => Idol | undefined;
	getIdolsByGen: (gen: string) => Idol[];
	loadIdols: (force?: boolean) => Promise<void>;
}

const gens: IdolGeneration[] = [
	{ name: "Myth" },
	{ name: "Council" },
	{ name: "Hope" },
	{ name: "Gamers" },
	{ name: "Gen 0" },
	{ name: "Gen 1" },
	{ name: "Gen 2" },
];

export const useIdolsStore = create<IdolsStore>((set, get) => ({
	loaded: false,
	idols: [],
	getGenerations: (): GenerationWithIdols[] => {
		return gens.map((gen) => ({
			name: gen.name,
			idols: get().getIdolsByGen(gen.name),
		}));
	},
	getIdolById: (id: string): Idol | undefined => {
		return get().idols.filter((idol) => idol.id === id)[0];
	},
	getIdolsByGen: (gen: string): Idol[] => {
		return get().idols.filter((i) => i.gen === gen);
	},
	loadIdols: async () => {
		try {
			const data = await fetch("idols.json");
			const idols: Idol[] = await data.json();

			set({
				loaded: true,
				idols: idols.map((idol) => ({
					...idol,
					id: nameToId(idol.name),
				})),
			});
		} catch (e) {
			set({ loaded: false, idols: [] });
		}
	},
}));
