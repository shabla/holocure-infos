import { useIdolsStore } from "@/stores";
import { Idol } from "@/models";
import { Sprite } from "@/components";
import {
	IdolGenerationsContainer,
	IdolGenerationName,
	SpriteListContainer,
} from "./IdolGenerationsTyped";

export interface IdolGenerationsProps {
	selectedIdol?: Idol;
	onSelected: (idol: Idol) => void;
	onIdolOver?: (idol: Idol) => void;
}

export const IdolGenerations = ({
	selectedIdol,
	onSelected,
	onIdolOver,
}: IdolGenerationsProps) => {
	const generations = useIdolsStore((state) => state.getGenerations());

	return (
		<IdolGenerationsContainer>
			{generations.map((generation) => {
				return (
					<section key={generation.name}>
						<IdolGenerationName>{generation.name}</IdolGenerationName>

						<SpriteListContainer>
							{generation.idols.map((idol) => (
								<Sprite
									key={idol.id}
									type="idols-icon"
									name={idol.name}
									value={idol}
									selected={idol.name === selectedIdol?.name}
									onSelected={onSelected}
									onMouseOver={onIdolOver ? () => onIdolOver(idol) : undefined}
								/>
							))}
						</SpriteListContainer>
					</section>
				);
			})}
		</IdolGenerationsContainer>
	);
};
