import { router, publicProcedure } from "../trpc";
import { listUpgrades, UpgradeInput, createUpgrade } from "../db/upgrade";

export const upgradesRouter = router({
	list: publicProcedure.query((req) => {
		const upgrades = listUpgrades();

		return upgrades;
	}),
	create: publicProcedure.input(UpgradeInput).mutation((req) => {
		const upgrade = req.input;
		console.log("upgrade input", upgrade);
		return createUpgrade(upgrade);
	}),
});
