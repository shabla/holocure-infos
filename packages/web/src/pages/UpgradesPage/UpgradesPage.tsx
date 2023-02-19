import { Box, ContentContainer, Sprite } from "@/components";
import { Upgrade } from "@holocure-builds/common";
import { useUpgradesStore } from "@/stores";
import {
	Table,
	NameCol,
	DescCol,
	TotalCol,
	RanksContainer,
	RanksCol,
} from "./UpgradesPageStyled";

export default function UpgradesPage() {
	const [upgrades] = useUpgradesStore((state) => [state.upgrades]);

	const getUpgradeTotalCost = (upgrade: Upgrade): number => {
		return upgrade.costs.reduce((acc, cost) => acc + cost, 0);
	};

	return (
		<ContentContainer
			css={{ gap: "$2", display: "flex", flexDirection: "row" }}
		>
			<Box label="Upgrades">
				<Table>
					<thead>
						<tr>
							<th />
							<NameCol as="th">Name</NameCol>
							<DescCol as="th">Description</DescCol>
							<RanksCol as="th">Ranks</RanksCol>
							<TotalCol as="th">Total Cost</TotalCol>
						</tr>
					</thead>

					<tbody>
						{(() => {
							let total = 0;
							return (
								<>
									{upgrades.map((upgrade) => {
										const upgradeTotal = getUpgradeTotalCost(upgrade);
										total += upgradeTotal;

										return (
											<tr key={upgrade.name}>
												<td>
													<Sprite
														type="upgrades"
														name={upgrade.name}
														showBackground={false}
													/>
												</td>

												<NameCol>{upgrade.name}</NameCol>

												<DescCol>{upgrade.desc}</DescCol>

												<td>
													<RanksContainer>
														<Sprite
															type="upgrades"
															name="Money Gain Up"
															scale={0.5}
														/>
														{upgrade.costs
															.map((cost) => cost.toLocaleString())
															.join(" / ")}
													</RanksContainer>
												</td>

												<TotalCol>{upgradeTotal.toLocaleString()}</TotalCol>
											</tr>
										);
									})}

									<tr key="total min-content">
										<TotalCol colSpan={4} style={{ paddingRight: "10px" }}>
											<b>Total:</b>
										</TotalCol>
										<TotalCol>{total.toLocaleString()}</TotalCol>
									</tr>
								</>
							);
						})()}
					</tbody>
				</Table>
			</Box>
		</ContentContainer>
	);
}
