import { Box, Sprite, IdolGenerations, IdolPickerDialog } from "@/components";
import { Idol, Item } from "@/models";
import { styled } from "@/styles";
import React, { useState } from "react";
import {
	BuildContainer,
	IdolContainer,
	ItemsContainer,
	SectionName,
	Stamp,
	IdolSpriteContainer,
	StampsContainer,
	WeaponComponentsContainer,
	WeaponContainer,
	WeaponsContainer,
} from "./BuildStyled";

export interface BuildProps {
	idol?: Idol;
	weapons?: Item[];
	items?: Item[];
	onIdolChange: (idol?: Idol) => void;
}

const ClearButton = styled("button", {
	all: "unset",
	position: "absolute",
	top: 0,
	right: 0,
	transform: "translate(25%, -25%)",
	width: 20,
	height: 20,
	lineHeight: "20px",
	backgroundColor: "black",
	color: "white",
	zIndex: 20,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: 5,
});

export const Build = ({
	idol,
	weapons,
	items,
	onIdolChange,
}: BuildProps): React.ReactElement => {
	const [open, setOpen] = useState(false);

	const handleIdolChange = (idol: Idol) => {
		onIdolChange(idol);
		setOpen(false);
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
				<SectionName>Idol & Stamps</SectionName>

				<IdolContainer>
					<IdolSpriteContainer onClick={() => setOpen(true)}>
						{idol && (
							<ClearButton
								onClick={(e) => {
									e.stopPropagation();
									onIdolChange(undefined);
								}}
							>
								x
							</ClearButton>
						)}
						<Sprite
							type="idols-icon"
							name={idol?.name}
							label={idol ? idol.name : ""}
							showLabel
						/>
					</IdolSpriteContainer>

					<Sprite type="skills" name={idol?.attack.name} showLabel />

					{/* <StampsContainer>
						<Sprite
							type="none"
							onSelected={() => {
								console.log("open stamp dialog");
							}}
						/>
						<Sprite
							type="none"
							onSelected={() => {
								console.log("open stamp dialog");
							}}
						/>
						<Sprite
							type="none"
							onSelected={() => {
								console.log("open stamp dialog");
							}}
						/>
					</StampsContainer> */}
				</IdolContainer>

				<div>
					{/* <WeaponsContainer>
						<SectionName>Weapons</SectionName>

						{weapons?.map((weapon) => (
							<WeaponContainer key={weapon.name}>
								<Sprite type="items" name={weapon.name} label={weapon.name} />

								<WeaponComponentsContainer>
									{weapon.components?.map((component) => (
										<Sprite
											type="items"
											name={component.name}
											label={component.name}
											key={component.name}
										/>
									))}
								</WeaponComponentsContainer>
							</WeaponContainer>
						))}
					</WeaponsContainer> */}

					{/* <ItemsContainer>
						<SectionName>Items</SectionName>

						{items?.map((item) => (
							<Sprite
								type="items"
								name={item.name}
								label={item.name}
								key={item.id}
							/>
						))}
					</ItemsContainer> */}
				</div>
			</BuildContainer>
		</Box>
	);
};
