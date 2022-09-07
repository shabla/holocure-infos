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

export const useSpriteOffsetsStore = create<SpriteOffsetsStore>((set, get) => ({
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

    const res = await fetch('sprites.json');
    const offsetsByType: SpriteOffsetsDict = await res.json();

    offsetsByType['idols'].file = idolModelsSpriteSheet;
    offsetsByType['idols-icon'].file = idolIconsSpriteSheet;
    offsetsByType['items'].file = itemsSpriteSheet;
    offsetsByType['upgrades'].file = upgradeSpriteSheet;
    offsetsByType['skills'].file = skillsSpriteSheet;

    set({
      loaded: true,
      offsetsByType,
    })

    return offsetsByType;
  },
}))