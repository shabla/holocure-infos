import { Level } from "./Level";

export interface Idol {
	id: number;
	name: string;
	gen: string;
	stats: Stats;
	notes?: string[];
	attack: Skill;
	special: Special;
	skills: Skill[];
}

export interface Skill {
	name: string;
	note?: string;
	levels: Level[];
}

export interface Special {
	name: string;
	desc: string;
}

export type Stats = Record<"hp" | "atk" | "spd" | "crt", number>;
