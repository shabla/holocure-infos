import { StampIdsList, WeaponIdsList, ItemIdsList } from "@/models";

type BuildIdsV1 = {
	idolId: number | undefined;
	stampIds: StampIdsList;
	weaponIds: WeaponIdsList;
	itemIds: ItemIdsList;
};

export class Build {
	static currentVersion = 1;
	static parserByVersion: Record<number, (build: string) => BuildIdsV1> = {
		1: parseBuildV1,
	};

	static parse(build: string): BuildIdsV1 {
		const version = this.getVersion(build);
		const parser = this.parserByVersion[version];

		if (!parser) {
			console.error(`Couldn't find parser for version ${version}`);
			return {
				idolId: undefined,
				stampIds: this.getStampIds(),
				weaponIds: this.getWeaponIds(),
				itemIds: this.getItemIds(),
			};
		}
		return parser(build);
	}

	// use latest version as default id generator
	static generate(
		idolId: number | undefined,
		stamps: StampIdsList,
		weaponIds: WeaponIdsList,
		itemIds: ItemIdsList,
	): string {
		const version = `${this.currentVersion}`.padStart(2, "0");

		const idolIdStr = `${idolId || ""}`.padStart(2, "0");

		const stampsIds = stamps.reduce(
			(acc: string[], stampId: number | undefined) => {
				return [...acc, `${stampId || ""}`.padStart(2, "0")];
			},
			[],
		);

		const itemsIds = [...weaponIds, ...itemIds].reduce(
			(acc: string[], itemId: number | undefined) => {
				return [...acc, `${itemId || ""}`.padStart(2, "0")];
			},
			[],
		);

		return `${version}${idolIdStr}${stampsIds.join("")}${itemsIds.join("")}`;
	}

	// Parse the first 2 digits as the build format version
	static getVersion(build: string): number {
		const match = build.match(/$\d{2}/);

		if (match?.groups?.version) {
			return parseInt(match?.groups.version, 10);
		}

		return this.currentVersion;
	}

	static getStampIds(...ids: (number | undefined)[]): StampIdsList {
		return [ids[0], ids[1], ids[2]];
	}

	static getWeaponIds(...ids: (number | undefined)[]): WeaponIdsList {
		return [ids[0], ids[1], ids[2], ids[3], ids[4]];
	}

	static getItemIds(...ids: (number | undefined)[]): ItemIdsList {
		return [ids[0], ids[1], ids[2], ids[3], ids[4], ids[5]];
	}
}

function parseBuildV1(build: string): BuildIdsV1 {
	// 00       00    000000  0000000000  000000000000
	// version  idol  stamps  weapons     items
	// Ex: 01020102030003000005430000000046
	const buildIdRegex =
		/^(?<version>\d{2})(?<idol>\d{2})(?<stamps>\d{6})(?<items>\d{22})/;
	const match = build.match(buildIdRegex);

	const idolId = parseInt(match?.groups?.idol || "", 10) || undefined;

	const stampIds = Build.getStampIds(
		...(match?.groups?.stamps.match(/(\d{2})/g) || []).map(
			(strId) => parseInt(strId, 10) || undefined,
		),
	);

	const allItemIds = (match?.groups?.items.match(/(\d{2})/g) || []).map(
		(strId) => parseInt(strId, 10) || undefined,
	);

	return {
		idolId,
		stampIds,
		weaponIds: Build.getWeaponIds(...allItemIds.slice(0, 5)),
		itemIds: Build.getItemIds(...allItemIds.slice(5)),
	};
}
