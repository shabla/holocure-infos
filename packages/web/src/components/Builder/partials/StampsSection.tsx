import { Selectable, Sprite } from "@/components";
import { StampIdsList } from "@holocure-builds/common";
import { useStampsStore } from "@/stores";
import { styled } from "@holocure-builds/common";
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
	position: "relative",
	"&:after": {
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: "100%",
		backgroundColor: "rgba(0,0,0,0.5)",
		content: "Coming Soon™",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		color: "white",
		// color: "$darkBlue",
		fontWeight: 700,
		fontSize: "22px",
	},
});

const StampContainer = styled("div", {
	height: 40,
	width: 40,
});
