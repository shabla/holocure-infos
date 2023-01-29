import {
	Box,
	Sprite,
	IdolPickerDialog,
	CollabTree,
	ClickableContainer,
} from "@/components";
import { Idol, Item, Stamp, StampsList } from "@/models";
import React, { useState } from "react";
import {
	BuildContainer,
	StampContainer,
	StampsContainer,
	SectionsContainer,
	Section,
	ClearButton,
} from "./BuildStyled";

export interface BuildProps {
	idol?: Idol;
	stamps?: StampsList;
	weapons?: string[];
	items?: Item[];
	onIdolChange: (idol?: Idol) => void;
	onStampsChange: (stamps: StampsList) => void;
}

export const Build = ({
	idol,
	stamps = [undefined, undefined, undefined],
	weapons,
	items,
	onIdolChange,
	onStampsChange,
}: BuildProps): React.ReactElement => {
	const [open, setOpen] = useState(false);

	const handleIdolChange = (idol: Idol) => {
		onIdolChange(idol);
		setOpen(false);
	};

	const handleStampChange = (newStamp: Stamp | undefined, index: number) => {
		const newStamps: StampsList = [...stamps];
		newStamps[index] = newStamp;
		onStampsChange(newStamps);
	};

	return (
		<Box label="Build">
			<IdolPickerDialog
				idol={idol}
				open={open}
				setOpen={setOpen}
				onChange={handleIdolChange}
			/>

			<BuildContainer>
				<SectionsContainer>
					<Section title="Idol">
						<ClickableContainer onClick={() => setOpen(true)}>
							{idol && (
								<ClearButton
									onClick={() => {
										onIdolChange(undefined);
									}}
								/>
							)}
							<Sprite
								type="idols-icon"
								name={idol?.name}
								label={idol?.name ?? "Pick an idol"}
								alwaysIncludeLabelPadding
							/>
						</ClickableContainer>
					</Section>

					<Section title="Stamps" contentCss={{ gap: "$3" }}>
						<Sprite
							type="skills"
							name={idol?.attack.name}
							label={idol?.attack?.name}
							alwaysIncludeLabelPadding
						/>

						<StampsContainer>
							{stamps?.map((stamp, index) => (
								<StampContainer key={stamp?.name || index}>
									{stamp && (
										<ClearButton
											onClick={() => handleStampChange(undefined, index)}
										/>
									)}
									<Sprite
										type="stamp"
										name={stamp?.name}
										label={stamp?.name}
										onSelected={() => {
											console.log("open stamp dialog");
										}}
									/>
								</StampContainer>
							))}
						</StampsContainer>
					</Section>
				</SectionsContainer>

				<SectionsContainer css={{ flex: "1 1 auto" }}>
					<Section
						title="Weapons"
						contentCss={{ flexDirection: "row", gap: "$4" }}
					>
						{weapons?.map((weaponId) => (
							<ClickableContainer
								key={weaponId}
								onClick={() => {
									console.log("collab clicked ", weaponId);
								}}
							>
								<ClearButton
									onClick={() => {
										console.log("clear weapon", weaponId);
									}}
								/>
								<CollabTree itemId={weaponId} />
							</ClickableContainer>
						))}
					</Section>

					<Section
						title="Items"
						contentCss={{
							flexDirection: "row",
							gap: "$4",
							paddingTop: "$sizes$spriteLabelOverflow",
						}}
					>
						{items?.map((item) => (
							<Sprite
								type="items"
								name={item.name}
								label={item.name}
								showBackground
								key={item.id}
							/>
						))}
					</Section>
				</SectionsContainer>
			</BuildContainer>
		</Box>
	);
};
