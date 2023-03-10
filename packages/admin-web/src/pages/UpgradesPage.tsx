import { trpc } from "@/utils/trpc";
import { Upgrade } from "@holocure-builds/common";
import { useEffect, useState } from "react";

export function UpgradesPage() {
	const upgrades = trpc.upgrades.list.useQuery(null, {
		refetchOnWindowFocus: false,
	});
	const createMutation = trpc.upgrades.create.useMutation();

	const handleCreateUpgrade = async () => {
		const res = await createMutation.mutateAsync({
			name: "helohelohelhole1",
			icon: "heart",
			desc: "sdfjasdf",
			costs: [1, 2, 3],
		});
		upgrades.refetch();
		console.log(res);
	};

	const handleSave = (upgrade: Partial<Upgrade>) => {
		console.log("save", upgrade);
		// setUpgrades((current) =>
		// 	current.map((u) =>
		// 		u.$loki === upgrade.$loki ? (upgrade as Upgrade) : u,
		// 	),
		// );
	};

	return (
		<div>
			<button onClick={handleCreateUpgrade}>add</button>

			<h2>Upgrades</h2>
			<div className="Upgrades">
				status: {upgrades.status}
				{upgrades.data?.map((upgrade) => (
					<UpgradeEditor
						key={upgrade.$loki}
						upgrade={upgrade}
						onSave={handleSave}
					/>
				))}
			</div>
		</div>
	);
}

interface UpgradeFormProps {
	upgrade: Upgrade;
	onSave: (upgrade: Partial<Upgrade>) => void;
}

const UpgradeEditor = ({ upgrade, onSave }: UpgradeFormProps) => {
	const [modifiedUpgrade, setModifiedUpgrade] = useState<Partial<Upgrade>>({
		...upgrade,
	});

	useEffect(() => {
		console.log("upgrade changed", upgrade);
		setModifiedUpgrade({ ...upgrade });
	}, [upgrade]);

	const handleReset = () => {
		console.log("reset");
		setModifiedUpgrade({ ...upgrade });
	};

	return (
		<div className="UpgradeEditor">
			<TextInput
				value={modifiedUpgrade.icon}
				placeholder="icon name"
				className={modifiedUpgrade.icon !== upgrade.icon ? "dirty" : undefined}
				onChange={(value) => {
					setModifiedUpgrade((current) => ({
						...current,
						icon: value,
					}));
				}}
			/>
			<TextInput
				value={modifiedUpgrade.name}
				placeholder="upgrade name"
				className={modifiedUpgrade.name !== upgrade.name ? "dirty" : undefined}
				onChange={(name) => {
					setModifiedUpgrade((current) => ({
						...current,
						name: name,
					}));
				}}
			/>
			<input
				type="text"
				value={upgrade.desc}
				placeholder="upgrade description"
			/>
			<input
				type="text"
				value={upgrade.costs.join(", ")}
				placeholder="costs (csv)"
			/>
			<button type="button" onClick={handleReset}>
				Reset
			</button>
			<button type="button" onClick={() => onSave(modifiedUpgrade)}>
				Save
			</button>
		</div>
	);
};

interface TextInputProps
	extends Partial<
		Pick<HTMLInputElement, "value" | "placeholder" | "className">
	> {
	onChange: (value: string) => void;
}

const TextInput = ({
	onChange,
	className = "",
	...inputProps
}: TextInputProps) => {
	return (
		<input
			type="text"
			className={`TextInput ${className}`}
			onChange={(e) => onChange(e.currentTarget.value)}
			{...inputProps}
		/>
	);
};
