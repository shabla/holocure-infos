import { Box, Sprite } from "@/components";
import { Idol } from "@holocure-builds/common";
import hpIcon from "@/assets/sprites/stat-hp.png";
import crtIcon from "@/assets/sprites/stat-crt.png";
import atkIcon from "@/assets/sprites/stat-atk.png";
import spdIcon from "@/assets/sprites/stat-spd.png";
import { styled } from "@holocure-builds/common";

export interface IdolProfileBoxProps {
	idol?: Idol;
}

interface IdolStat {
	name: string;
	image: string;
	key: "hp" | "atk" | "spd" | "crt";
	format?: (value: number) => string;
}

const stats: IdolStat[] = [
	{ name: "HP", key: "hp", image: hpIcon },
	{
		name: "ATK",
		key: "atk",
		image: atkIcon,
		format: (val: number) => `${val.toFixed(2)}x`,
	},
	{
		name: "SPD",
		key: "spd",
		image: spdIcon,
		format: (val: number) => `${val.toFixed(2)}x`,
	},
	{
		name: "CRT",
		key: "crt",
		image: crtIcon,
		format: (val: number) => `${val * 100}%`,
	},
];

const IdolProfileBoxContainer = styled(Box, {
	main: {
		alignSelf: "center",
		overflowY: "inherit",
	},
});

const ModelContainer = styled("div", {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	height: 190,
});

const StatsContainer = styled("div", {
	marginTop: "20px",
	minWidth: "250px",
	maxWidth: "300px",
	padding: "20px",
});

const StatContainer = styled("div", {
	marginBottom: "10px",
	display: "flex",
	alignItems: "center",

	img: {
		height: "32px",
		width: "32px",
		display: "block",
		marginRight: "10px",
	},

	".text": {
		display: "flex",
		justifyContent: "space-between",
		flex: "1 1 auto",
		fontSize: "22px",
		borderBottom: "1px solid white",
	},
});

export function IdolProfileBox({ idol }: IdolProfileBoxProps) {
	return (
		<IdolProfileBoxContainer label={idol?.name}>
			<ModelContainer>
				{idol && (
					<Sprite type="idols" name={idol.name} showBackground={false} />
				)}
			</ModelContainer>

			<StatsContainer>
				{stats.map((stat) => {
					const value = idol?.stats?.[stat.key];

					return (
						<StatContainer key={stat.key}>
							<img src={stat.image} alt={stat.name} />
							<div className="text">
								<div>{stat.name}</div>
								<div>{stat.format && value ? stat.format(value) : value}</div>
							</div>
						</StatContainer>
					);
				})}
			</StatsContainer>
		</IdolProfileBoxContainer>
	);
}
