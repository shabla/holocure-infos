import { redirect, RouteObject } from "react-router-dom";
import { App } from "@/components";
import { BuildPage, UpgradesPage } from "@/pages";
import {
	useIdolsStore,
	useItemsStore,
	useSpriteSheetsStore,
	useStampsStore,
	useUpgradesStore,
} from "@/stores";
import { defaultRoute } from "@/config";

export const routes: RouteObject[] = [
	{
		path: "/",
		element: <App />,
		loader: async () => {
			return useSpriteSheetsStore.getState().loadSpriteSheets();
		},
		children: [
			{
				path: "build",
				element: <BuildPage />,
				loader: async () => {
					return await Promise.all([
						useIdolsStore.getState().loadIdols(),
						useItemsStore.getState().loadItems(),
						useStampsStore.getState().loadStamps(),
					]);
				},
			},
			{
				path: "upgrades",
				element: <UpgradesPage />,
				loader: async () => {
					return useUpgradesStore.getState().loadUpgrades();
				},
			},
		],
	},
	{
		path: "*",
		loader: () => redirect(defaultRoute),
	},
];
