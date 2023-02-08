export interface ItemLevel {
	level: number;
	desc: string;
}

export interface Item {
	id: number;
	type: "weapon" | "item" | "collab";
	spritePos: [number, number];
	name: string;
	desc: string;
	levels: ItemLevel[];
	requires?: number[];
	requirement?: string;
}

export type WeaponsList = [
	Item | undefined,
	Item | undefined,
	Item | undefined,
	Item | undefined,
	Item | undefined,
];

export type WeaponIdsList = [
	number | undefined,
	number | undefined,
	number | undefined,
	number | undefined,
	number | undefined,
];

export type ItemsList = [
	Item | undefined,
	Item | undefined,
	Item | undefined,
	Item | undefined,
	Item | undefined,
	Item | undefined,
];

export type ItemIdsList = [
	number | undefined,
	number | undefined,
	number | undefined,
	number | undefined,
	number | undefined,
	number | undefined,
];
