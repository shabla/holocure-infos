import loki from "lokijs";
import { Collections, initCollection } from "./collections";

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
