import create from "zustand";

import { Idol } from "@/models/Idol";

interface IdolsStore {
  loading: boolean;
  idols: Idol[];
  loadIdols: () => Promise<void>;
  getIdolsByGen: (gen: string) => Idol[];
}

export const useIdolsStore = create<IdolsStore>((set, get) => ({
  loading: false,
  idols: [],
  getIdolsByGen: (gen: string): Idol[] => {
    return get().idols.filter(i => i.gen === gen);
  },
  loadIdols: async () => {
    set({ loading: true });

    const data = await fetch('idols.json');
    const idols: Idol[] = await data.json();

    set({ loading: false, idols });
  }
}));