interface Level {
  level: number;
  desc: string;
}

interface Skill {
  name: string;
  spriteOffset?: [number, number];
  levels: Level[]
}

interface Special {
  name: string;
  desc: string;
  spriteOffset: [number, number];
}

type Stats = Record<"hp" | "atk" | "spd" | "crt", number>

export interface Idol {
  id: string;
  name: string;
  gen: string;
  // spriteOffset is used for both idol model and icon, so the corresponding spritesheet has to be arranged accordingly
  spriteOffset: [number, number];
  stats: Stats;
  notes?: string[];
  attack: Skill;
  special: Special;
  skills: Skill[];
}