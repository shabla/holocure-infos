import loki from "lokijs";
import { Collections, initCollection } from "./collections";

export function initDb(callback: (db: loki, collections: Collections) => void) {
	const dbPath = "./db/holocure.db";
	const db = new loki(dbPath, {
		verbose: true,
		autosave: true,
		autosaveInterval: 2000,
		autoload: true,
		autoloadCallback: loadHandler,
	});

	function loadHandler() {
		const collections: Collections = {
			upgrades: initCollection(db, "upgrades"),
		};

		callback(db, collections);
	}
}
