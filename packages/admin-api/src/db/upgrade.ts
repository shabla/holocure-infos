import { z } from "zod";
import { collections } from "./init";

export const UpgradeInput = z.object({
	icon: z.string(),
	name: z.string(),
	desc: z.string(),
	costs: z.array(z.number()),
});

export type UpgradeInputType = z.infer<typeof UpgradeInput>;

export const listUpgrades = async () => {
	return collections.upgrades.find();
};

export const createUpgrade = async (input: UpgradeInputType) => {
	return collections.upgrades.insert(input);
};
