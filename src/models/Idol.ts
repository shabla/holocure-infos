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
  stats: Stats;
  attack: Skill;
  special: Special;
  skills: Skill[];
}