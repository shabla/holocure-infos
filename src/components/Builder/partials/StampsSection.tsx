import { Selectable, Sprite } from "@/components";
import { StampIdsList } from "@/models";
import { useStampsStore } from "@/stores";
import { styled } from "@/styles";
import React, { useMemo } from "react";
import { EmptyMessage, Section } from "../BuilderStyled";

export interface StampsSectionProps {
	stampIds: StampIdsList;
	onChange: (stampIds: StampIdsList) => void;
}

export const StampsSection = ({
	stampIds,
	onChange,
}: StampsSectionProps): React.ReactElement => {
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
		<Section
			title="Stamps"
			contentCss={{
				gap: "$3",
			}}
		>
			<StampSlots>
				{stamps.map((stamp, index) => (
					<Selectable
						key={`stamp-${index}`}
						css={{ height: 70, width: 70 }}
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
			</StampSlots>
		</Section>
	);
};

const StampSlots = styled("div", {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	gap: 10,
});

const StampContainer = styled("div", {
	height: 40,
	width: 40,
});
