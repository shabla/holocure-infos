import create from "zustand";

import { Idol } from "@/models/Idol";

interface IdolsStore {
  loaded: boolean;
  idols: Idol[];
  getIdolsByGen: (gen: string) => Idol[];
  loadIdols: (force?: boolean) => Promise<void>;
}

export const useIdolsStore = create<IdolsStore>((set, get) => ({
  loaded: false,
  idols: [],
  getIdolsByGen: (gen: string): Idol[] => {
    return get().idols.filter(i => i.gen === gen);
  },
  loadIdols: async (force?: boolean) => {
    if (get().loaded && !force) {
      return;
    }

    const data = await fetch('idols.json');
    const idols: Idol[] = await data.json();

    set({ loaded: true, idols });
  }
}));