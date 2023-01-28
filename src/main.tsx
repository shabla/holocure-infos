import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createHashRouter, redirect } from "react-router-dom";

import { App } from "@/components";
import { ItemsPage, UpgradesPage } from "@/pages";
import { useIdolsStore, useItemsStore, useSpriteSheetsStore, useUpgradesStore } from "@/stores";

import "normalize.css";

const router = createHashRouter([
	{
		path: "/",
		element: <App />,
		loader: async () => {
			return await Promise.all([
				useIdolsStore.getState().loadIdols(),
				useSpriteSheetsStore.getState().loadSpriteSheets(),
			]);
		},
		children: [
			{
				path: "items",
				element: <ItemsPage />,
				loader: async () => {
					return useItemsStore.getState().loadItems();
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
		loader: () => redirect("items"),
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
