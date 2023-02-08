import { Selectable, Sprite } from "@/components";
import { Skill, StampIdsList } from "@/models";
import { useStampsStore } from "@/stores";
import React, { useMemo } from "react";
import {
	EmptyMessage,
	Section,
	StampContainer,
	StampsContainer,
} from "../BuilderStyled";

export interface AttackAndStampsSectionProps {
	attack?: Skill;
	stampIds: StampIdsList;
	onChange: (stampIds: StampIdsList) => void;
}

export const AttackAndStampsSection = ({
	attack,
	stampIds,
	onChange,
}: AttackAndStampsSectionProps): React.ReactElement => {
	const stamps = useStampsStore((state) =>
		useMemo(
			() =>
				stampIds.map((stampId) =>
					stampId ? state.getStampById(stampId) : undefined,
				),
			[stampIds],
		),
	);

	// TODO: add stamps dialog

	const handleStampChange = (stampId: number | undefined, index: number) => {
		const newStamps: StampIdsList = [...stampIds];
		newStamps[index] = stampId;
		onChange(newStamps);
	};

	return (
		<Section title="Stamps" contentCss={{ gap: "$3" }}>
			<Sprite
				type="skills"
				name={attack?.name}
				label={attack?.name}
				alwaysIncludeLabelPadding
			/>

			<StampsContainer>
				{stamps.map((stamp, index) => (
					<Selectable
						key={`stamp-${index}`}
						height={70}
						width={70}
						onClick={() => console.log("open stamp dialog")}
						onClear={() => handleStampChange(undefined, index)}
						clearable={!!stamp}
					>
						{stamp ? (
							<StampContainer>
								<Sprite type="stamp" name={stamp.name} label={stamp.name} />
							</StampContainer>
						) : (
							<EmptyMessage>Pick a stamp</EmptyMessage>
						)}
					</Selectable>
				))}
			</StampsContainer>
		</Section>
	);
};
