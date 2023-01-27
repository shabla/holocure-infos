import { create } from "zustand";

import itemsSpriteSheet from "@/assets/items.png";
import skillsSpriteSheet from "@/assets/skills.png";
import upgradeSpriteSheet from "@/assets/upgrades.png";
import idolIconsSpriteSheet from "@/assets/idol-icons.png";
import idolModelsSpriteSheet from "@/assets/idol-models.png";

export type SpriteType =
  | "idols"
  | "idols-icon"
  | "items"
  | "upgrades"
  | "skills"
  | "none";

export type SpriteSheet = {
  width: number;
  height: number;
  offsets: Record<string, [number, number]>;
  file: string; // set at runtime
};

interface SpriteOffsetsStore {
  loaded: boolean;
  byType: Record<string, SpriteSheet>;
  loadSpriteSheets: (force?: boolean) => Promise<Record<string, SpriteSheet>>;
  getSpriteSheet: (type: SpriteType) => SpriteSheet;
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
  getSpriteSheet: (type: SpriteType): SpriteSheet => {
    return get().byType[type];
  },
  loadSpriteSheets: async (
    force?: boolean
  ): Promise<Record<string, SpriteSheet>> => {
    if (get().loaded && !force) {
      return get().byType;
    }

    try {
      const res = await fetch("sprites.json");
      const byType: Record<string, SpriteSheet> = await res.json();

      byType["items"].file = itemsSpriteSheet;
      byType["upgrades"].file = upgradeSpriteSheet;
      byType["skills"].file = skillsSpriteSheet;
      byType["idols"].file = idolModelsSpriteSheet;
      byType["idols-icon"].file = idolIconsSpriteSheet;

      // idols and idols icons use the space offsets (sketchy)
      byType["idols-icon"].offsets = byType["idols"].offsets;

      set({
        loaded: true,
        byType,
      });

      return byType;
    } catch (e) {
      set({
        loaded: false,
        byType: {},
      });

      return {};
    }
  },
}));
