import loki from "lokijs";
import { Upgrade } from "@holocure-builds/common";

type Collections = {
	upgrades: loki.Collection<Upgrade>;
};

export let db: loki;
export let collections: Collections;

export async function initDb(): Promise<void> {
	return new Promise((resolve) => {
		const dbPath = "./db/holocure.db";

		db = new loki(dbPath, {
			verbose: true,
			autosave: true,
			autosaveInterval: 2000,
			autoload: true,
			autoloadCallback: () => {
				collections = {
					upgrades: initCollection(db, "upgrades"),
				};

				resolve();
			},
		});
	});
}

function initCollection<DocumentType extends object>(
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
