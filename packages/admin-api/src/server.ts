import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { initDb } from "./db/init";
import { createContext } from "./trpc";
import { appRouter } from "./routers/app";
import cors from "cors";

const port = 5000;
const app = express();
app.use(cors());

app.use(
	"/trpc",
	trpcExpress.createExpressMiddleware({
		router: appRouter,
		createContext,
	}),
);

app.listen(port, async () => {
	console.log(`Server running on port ${port}`);

	await initDb();
});
