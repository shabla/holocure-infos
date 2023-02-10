import { create } from "zustand";
import { Idol, IdolGeneration } from "@/models";

type GenerationWithIdols = IdolGeneration & { idols: Idol[] };

interface IdolsStore {
	loaded: boolean;
	idols: Idol[];
	getGenerations: () => GenerationWithIdols[];
	getIdolById: (id?: number) => Idol | undefined;
	loadIdols: () => Promise<Idol[]>;
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
			idols: get().idols.filter((i) => i.gen === gen.name),
		})),
	getIdolById: (id?: number): Idol | undefined =>
		id ? get().idols.filter((idol) => idol.id === id)[0] : undefined,
	loadIdols: async () => {
		if (get().loaded) {
			return get().idols;
		}

		const json = await import("@/assets/data/idols.json");
		const idols = json.default as unknown as Idol[];

		set({ loaded: true, idols });

		return idols;
	},
}));
