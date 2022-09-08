import create from "zustand";

import { nameToId } from "@/utils/nameToId";
import { Idol } from "@/models";

interface IdolsStore {
  loaded: boolean;
  idols: Idol[];
  getIdolById: (id: string) => Idol | undefined;
  getIdolsByGen: (gen: string) => Idol[];
  loadIdols: (force?: boolean) => Promise<void>;
}

export const useIdolsStore = create<IdolsStore>((set, get) => ({
  loaded: false,
  idols: [],
  getIdolById: (id: string): Idol | undefined => {
    return get().idols.filter(idol => idol.id === id)[0];
  },
  getIdolsByGen: (gen: string): Idol[] => {
    return get().idols.filter(i => i.gen === gen);
  },
  loadIdols: async (force?: boolean) => {
    if (get().loaded && !force) {
      return;
    }

    const data = await fetch('idols.json');
    const idols: Idol[] = await data.json();

    set({
      loaded: true,
      idols: idols.map(idol => ({
        ...idol,
        id: nameToId(idol.name)
      }))
    });
  }
}));