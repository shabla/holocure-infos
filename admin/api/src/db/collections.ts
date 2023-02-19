import loki from "lokijs";

export type UpgradeDocument = {
	name: string;
	desc: string;
	costs: number[];
};

export type Collections = {
	upgrades: Collection<UpgradeDocument>;
};

export function initCollection<DocumentType extends object>(
	db: loki,
	name: string,
): loki.Collection<DocumentType> {
	let collection = db.getCollection<DocumentType>(name);
	if (collection === null) {
		console.log(`Collection "${name}"  doesn't exist, create it`);
		collection = db.addCollection<DocumentType>(name);

		// default data
		collection.insert({
			name: "Test",
			desc: "test desc",
			costs: [1, 2, 3, 4],
		} as DocumentType);
	} else {
		console.log(`Collection "${name}" autoloaded`);
	}

	return collection;
}
