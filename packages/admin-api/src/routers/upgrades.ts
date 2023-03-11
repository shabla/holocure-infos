import { router, publicProcedure } from "../trpc";
import {
	listUpgrades,
	UpgradeInput,
	createUpgrade,
	deleteUpgrade,
	getUpgradeById,
	updateUpgrade,
} from "../db/upgrade";
import { z } from "zod";

export const upgradesRouter = router({
	all: publicProcedure.query((req) => {
		console.log("list upgrades");
		return listUpgrades();
	}),

	byId: publicProcedure.input(z.number()).query((req) => {
		return getUpgradeById(req.input);
	}),

	create: publicProcedure.input(UpgradeInput).mutation((req) => {
		const upgrade = req.input;
		console.log("upgrade input", upgrade);
		return createUpgrade(upgrade);
	}),

	update: publicProcedure
		.input(z.object({ id: z.number(), upgrade: UpgradeInput }))
		.mutation((req) => {
			const { id, upgrade } = req.input;
			console.log("update", id, upgrade);

			return updateUpgrade(id, upgrade);
		}),

	delete: publicProcedure.input(z.number()).mutation((req) => {
		const id = req.input;
		console.log("delete upgrade", id);
		return deleteUpgrade(id);
	}),
});
