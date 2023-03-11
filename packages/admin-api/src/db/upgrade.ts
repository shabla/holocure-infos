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

export const getUpgradeById = async (id: number) => {
	return collections.upgrades.by("$loki", id);
};

export const createUpgrade = async (input: UpgradeInputType) => {
	return collections.upgrades.insert(input);
};

export const updateUpgrade = async (id: number, input: UpgradeInputType) => {
	const doc = await getUpgradeById(id);

	return collections.upgrades.update({ ...doc, ...input });
};

export const deleteUpgrade = async (id: number) => {
	collections.upgrades.remove(id);
};
