import { trpc } from "@/utils/trpc";
import { Upgrade } from "@holocure-builds/common";
import { UpgradeEditor } from "./UpgradeEditor";

export function UpgradesPage() {
	const trpcUtils = trpc.useContext();
	const { data: upgrades } = trpc.upgrades.all.useQuery(undefined, {
		refetchOnWindowFocus: false,
	});
	const { mutateAsync: createUpgrade } = trpc.upgrades.create.useMutation({
		onSuccess: () => trpcUtils.upgrades.all.invalidate(),
	});
	const { mutateAsync: updateUpgrade } = trpc.upgrades.update.useMutation({
		onSuccess: () => trpcUtils.upgrades.all.invalidate(),
	});
	const { mutateAsync: deleteUpgrade } = trpc.upgrades.delete.useMutation({
		onSuccess: () => trpcUtils.upgrades.all.invalidate(),
	});

	const handleCreateUpgrade = () => {
		createUpgrade({
			name: "helohelohelhole1",
			icon: "heart",
			desc: "sdfjasdf",
			costs: [1, 2, 3],
		});
	};

	const handleSave = async (upgrade: Upgrade) => {
		updateUpgrade({ id: upgrade.$loki!, upgrade });
	};

	const handleDelete = (upgrade: Upgrade) => {
		deleteUpgrade(upgrade.$loki!);
	};

	return (
		<div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<h2>Upgrades</h2>
				<button onClick={handleCreateUpgrade}>Add Upgrade</button>
			</div>

			<div className="Upgrades">
				{upgrades?.map((upgrade) => (
					<UpgradeEditor
						key={upgrade.$loki}
						upgrade={upgrade}
						onSave={handleSave}
						onDelete={handleDelete}
					/>
				))}
			</div>
		</div>
	);
}
