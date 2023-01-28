import { Box, Sprite, IdolPickerDialog, Collab } from "@/components";
import { Idol, Item, Stamp, StampsList } from "@/models";
import React, { useState } from "react";
import {
	BuildContainer,
	StampContainer,
	IdolContainer,
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

	const handleStampChange = (newStamp: Stamp, index: number) => {};

	const handleStampCleared = (index: number) => {
		const newStamps: StampsList = [...stamps];
		newStamps[index] = undefined;
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
					<Section title="Idol" css={{ flex: "1 1 auto" }}>
						<IdolContainer onClick={() => setOpen(true)}>
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
								label={idol ? idol.name : ""}
								showLabel
							/>
						</IdolContainer>
					</Section>

					<Section title="Stamps">
						<Sprite type="skills" name={idol?.attack.name} showLabel />
						<StampsContainer>
							{stamps?.map((stamp, index) => (
								<StampContainer key={stamp?.name || index}>
									{stamp && (
										<ClearButton onClick={() => handleStampCleared(index)} />
									)}
									<Sprite
										type="stamp"
										name={stamp?.name}
										label={stamp?.name}
										showLabel
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
							<Collab itemId={weaponId} key={weaponId}>
								<ClearButton
									onClick={() => {
										console.log("clear weapon", weaponId);
									}}
								/>
							</Collab>
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
								showLabel
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
