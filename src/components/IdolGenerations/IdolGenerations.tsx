import { useIdolsStore } from "@/stores";
import { Idol } from "@/models";
import { SpriteProps, SpriteList } from "@/components";
import { IdolGenerationsContainer, IdolGenerationName } from "./IdolGenerationsTyped";

export interface IdolGenerationsProps {
	selectedIdol?: Idol;
	onSelected: (idol: Idol) => void;
}

export const IdolGenerations = ({ selectedIdol, onSelected }: IdolGenerationsProps) => {
	const generations = useIdolsStore((state) => state.getGenerations());

	return (
		<IdolGenerationsContainer>
			{generations.map((generation) => {
				const sprites: SpriteProps<Idol>[] = generation.idols.map(
					(idol) =>
						({
							key: idol.id,
							type: "idols-icon",
							name: idol.name,
							value: idol,
							selected: idol.name === selectedIdol?.name,
							onSelected,
						}) as SpriteProps<Idol>,
				);

				return (
					<section key={generation.name}>
						<IdolGenerationName>{generation.name}</IdolGenerationName>
						<SpriteList sprites={sprites} />
					</section>
				);
			})}
		</IdolGenerationsContainer>
	);
};
