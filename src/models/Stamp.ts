export interface Stamp {
	id: number;
	name: string;
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
