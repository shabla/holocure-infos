import { useIdolsStore } from "@/stores";
import { Idol } from "@/models";
import { Sprite } from "@/components";
import {
	IdolGenerationsContainer,
	IdolGenerationName,
} from "./IdolGenerationsTyped";
import { styled } from "@/styles";

export interface IdolGenerationsProps {
	selectedIdol?: Idol;
	onSelected: (idol: Idol) => void;
	onIdolOver?: (idol: Idol) => void;
	onIdolOut?: (idol: Idol) => void;
}

const SpriteListContainer = styled("div", {
	display: "flex",
	flexDirection: "row",
	gap: "$2",
});

export const IdolGenerations = ({
	selectedIdol,
	onSelected,
	onIdolOver,
	onIdolOut,
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
									onMouseLeave={onIdolOut ? () => onIdolOut(idol) : undefined}
								/>
							))}
						</SpriteListContainer>
					</section>
				);
			})}
		</IdolGenerationsContainer>
	);
};
