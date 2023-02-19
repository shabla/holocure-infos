import { create } from "zustand";

export type SpriteType =
	| "idols"
	| "idols-icon"
	| "items"
	| "upgrades"
	| "skills"
	| "stamp"
	| "enchant";

export type SpriteSheet = {
	width: number;
	height: number;
	offsets: Record<string, [number, number]>;
	file: string;
};

interface SpriteOffsetsStore {
	loaded: boolean;
	byType: Record<string, SpriteSheet>;
	getSpriteSheet: (type: SpriteType) => SpriteSheet;
	loadSpriteSheets: () => Promise<Record<string, SpriteSheet>>;
}

const emptyType: SpriteSheet = {
	width: 0,
	height: 0,
	offsets: {},
	file: "",
};

export const useSpriteSheetsStore = create<SpriteOffsetsStore>((set, get) => ({
	loaded: false,
	byType: {
		idols: { ...emptyType },
		"idols-icon": { ...emptyType },
		items: { ...emptyType },
		skills: { ...emptyType },
		upgrades: { ...emptyType },
	},
	getSpriteSheet: (type: SpriteType): SpriteSheet => get().byType[type],
	loadSpriteSheets: async (): Promise<Record<string, SpriteSheet>> => {
		if (get().loaded) {
			return get().byType;
		}

		const [
			json,
			itemsSpriteSheet,
			skillsSpriteSheet,
			upgradeSpriteSheet,
			idolIconsSpriteSheet,
			idolModelsSpriteSheet,
		] = await Promise.all([
			import("@/assets/data/sprites.json"),
			import("@/assets/sprites/items.png"),
			import("@/assets/sprites/skills.png"),
			import("@/assets/sprites/upgrades.png"),
			import("@/assets/sprites/idol-icons.png"),
			import("@/assets/sprites/idol-models.png"),
		]);

		const spriteSheets = json.default as unknown as Record<string, SpriteSheet>;

		spriteSheets["items"].file = itemsSpriteSheet.default;
		spriteSheets["upgrades"].file = upgradeSpriteSheet.default;
		spriteSheets["skills"].file = skillsSpriteSheet.default;
		spriteSheets["idols"].file = idolModelsSpriteSheet.default;
		spriteSheets["idols-icon"].file = idolIconsSpriteSheet.default;

		// idols and idols icons use the space offsets (sketchy)
		spriteSheets["idols-icon"].offsets = spriteSheets["idols"].offsets;

		set({ byType: spriteSheets, loaded: true });

		return spriteSheets;
	},
}));
