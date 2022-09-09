export interface Level {
  level: number;
  desc: string;
}

export interface Skill {
  name: string;
  note?: string;
  levels: Level[]
}

export interface Special {
  name: string;
  desc: string;
}

export type Stats = Record<"hp" | "atk" | "spd" | "crt", number>

export interface Idol {
  id: string; // generated at runtime
  name: string;
  gen: string;
  stats: Stats;
  notes?: string[];
  attack: Skill;
  special: Special;
  skills: Skill[];
}