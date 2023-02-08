import { create } from "zustand";
import { Idol, IdolGeneration } from "@/models";

type GenerationWithIdols = IdolGeneration & { idols: Idol[] };

interface IdolsStore {
	loaded: boolean;
	idols: Idol[];
	getGenerations: () => GenerationWithIdols[];
	getIdolById: (id?: number) => Idol | undefined;
	getIdolsByGen: (gen: string) => Idol[];
	loadIdols: () => Promise<void>;
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
	getGenerations: (): GenerationWithIdols[] =>
		gens.map((gen) => ({
			name: gen.name,
			idols: get().getIdolsByGen(gen.name),
		})),
	getIdolById: (id?: number): Idol | undefined =>
		id ? get().idols.filter((idol) => idol.id === id)[0] : undefined,
	getIdolsByGen: (gen: string): Idol[] =>
		get().idols.filter((i) => i.gen === gen),
	loadIdols: async () => {
		try {
			const data = await fetch("idols.json");
			const idols: Idol[] = await data.json();

			set({
				loaded: true,
				idols: idols,
			});
		} catch (e) {
			set({ loaded: false, idols: [] });
		}
	},
}));
