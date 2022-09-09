import create from "zustand"

import itemsSpriteSheet from "@/assets/items.png";
import skillsSpriteSheet from "@/assets/skills.png";
import upgradeSpriteSheet from "@/assets/upgrades.png";
import idolIconsSpriteSheet from "@/assets/idol-icons.png";
import idolModelsSpriteSheet from "@/assets/idol-models.png";

export type SpriteType = 'idols' | 'idols-icon' | 'items' | 'upgrades' | 'skills';
type SpriteOffset = [number, number];

export type SpriteSheet = {
  width: number;
  height: number;
  offsets: Record<string, SpriteOffset>;
  file: string; // set at runtime
}

type SpriteOffsetsDict = Record<string, SpriteSheet>;

interface SpriteOffsetsStore {
  loaded: boolean;
  offsetsByType: SpriteOffsetsDict;
  loadSpriteOffsets: (force?: boolean) => Promise<SpriteOffsetsDict>;
  getSpriteSheet: (type: SpriteType) => SpriteSheet;
}

const emptyType = {
  width: 0,
  height: 0,
  offsets: {},
  file: '',
};

export const useSpriteSheetStore = create<SpriteOffsetsStore>((set, get) => ({
  loaded: false,
  offsetsByType: {
    idols: { ...emptyType },
    'idols-icon': { ...emptyType },
    items: { ...emptyType },
    skills: { ...emptyType },
    upgrades: { ...emptyType }
  },
  getSpriteSheet: (type: SpriteType): SpriteSheet => {
    return get().offsetsByType[type];
  },
  loadSpriteOffsets: async (force?: boolean): Promise<SpriteOffsetsDict> => {
    if ((get().loaded && !force)) {
      return get().offsetsByType;
    }

    try {
      const res = await fetch('sprites.json');
      const offsetsByType: SpriteOffsetsDict = await res.json();

      offsetsByType['items'].file = itemsSpriteSheet;
      offsetsByType['upgrades'].file = upgradeSpriteSheet;
      offsetsByType['skills'].file = skillsSpriteSheet;
      offsetsByType['idols'].file = idolModelsSpriteSheet;
      offsetsByType['idols-icon'].file = idolIconsSpriteSheet;

      // idols and idols icons use the space offsets (sketchy)
      offsetsByType['idols-icon'].offsets = offsetsByType['idols'].offsets;

      set({
        loaded: true,
        offsetsByType,
      })

      return offsetsByType;
    } catch (e) {
      set({
        loaded: false,
        offsetsByType: {},
      })

      return {}
    }

  },
}))