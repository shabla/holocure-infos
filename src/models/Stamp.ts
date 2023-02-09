import { Level } from "./Level";

export interface Stamp {
	id: number;
	name: string;
	levels: Level[];
}

export type StampsList = [
	Stamp | undefined,
	Stamp | undefined,
	Stamp | undefined,
];

export type StampIdsList = [
	number | undefined,
	number | undefined,
	number | undefined,
];
