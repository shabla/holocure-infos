import express from "express";
import { Collections } from "../db/collections";

export function createUpgradesRouter(): express.Router {
	const router = express.Router();

	router
		.route("/upgrades")
		.get((req, res) => {
			const collections: Collections = req.app.get("collections");
			const results = collections.upgrades.find();

			res.status(200).send(results);
		})
		.post((req, res) => {
			const collections: Collections = req.app.get("collections");
			const upgrade = req.body;
			console.log(upgrade, req.headers);
			const document = collections.upgrades.insert(upgrade);

			res.status(200).send(document);
		});

	return router;
}
