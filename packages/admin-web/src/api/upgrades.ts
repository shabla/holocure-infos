import { Upgrade } from "../models/Upgrade";
import { Api } from "./Api";

export const fetchUpgrades = async (): Promise<Upgrade[]> => {
	return await Api.get<Upgrade[]>("/upgrades");
};

export const addUpgrade = async (upgrade: Upgrade): Promise<Upgrade> => {
	return await Api.post<Upgrade>("/upgrades", JSON.stringify(upgrade));
};
