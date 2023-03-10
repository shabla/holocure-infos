import loki from "lokijs";
import { Upgrade } from "@holocure-builds/common";

export type Collections = {
	upgrades: Collection<Upgrade>;
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
