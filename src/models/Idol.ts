interface Level {
  level: number;
  desc: string;
}

interface Skill {
  name: string;
  levels: Level[]
}

interface Special {
  name: string;
  desc: string;
}

type Stats = Record<"hp" | "atk" | "spd" | "crt", number>

export interface Idol {
  id: string;
  name: string;
  gen: string;
  stats: Stats;
  special: Special;
  attack: Skill;
  skills: Skill[];
}