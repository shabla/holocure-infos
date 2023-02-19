import express from "express";
import cors from "cors";
import { initDb } from "./db/init";
import { logMiddleware } from "./middleware/logMiddleware";
import { createUpgradesRouter } from "./routes/upgrades";

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use(logMiddleware);

initDb((db, collections) => {
	app.set("collections", collections);

	app.use(createUpgradesRouter());

	app.listen(port, () => {
		console.log(`Server running on port ${port}`);
	});
});
