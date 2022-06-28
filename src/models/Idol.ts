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

export interface Idol {
  name: string;
  image: string;
  gen: string;
  special: Special;
  attack: Skill;
  skills: Skill[];
}