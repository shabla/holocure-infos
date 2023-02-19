import { create } from "zustand";
import { Idol } from "@holocure-builds/common";

type GenerationWithIdols = { name: string; idols: Idol[] };

interface IdolsStore {
	loaded: boolean;
	idols: Idol[];
	getGenerations: () => GenerationWithIdols[];
	getIdolById: (id?: number) => Idol | undefined;
	loadIdols: () => Promise<Idol[]>;
}

const gens: string[] = [
	"Myth",
	"Council",
	"Hope",
	"Gamers",
	"Gen 0",
	"Gen 1",
	"Gen 2",
];

export const useIdolsStore = create<IdolsStore>((set, get) => ({
	loaded: false,
	idols: [],
	getGenerations: (): GenerationWithIdols[] =>
		gens.map((genName) => ({
			name: genName,
			idols: get().idols.filter((i) => i.gen === genName),
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
