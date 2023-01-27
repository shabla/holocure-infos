import { Box, Sprite } from "@/components";
import { Idol, Item } from "@/models";
import React from "react";
import {
  BuildContainer,
  IdolContainer,
  ItemsContainer,
  SectionName,
  Stamp,
  StampsContainer,
  WeaponComponentsContainer,
  WeaponContainer,
  WeaponsContainer,
} from "./BuildStyled";

export interface BuildProps {
  idol?: Idol;
  weapons?: (Pick<Item, "name"> & { components: Pick<Item, "name">[] })[];
  items?: Item[];
}

export const Build = ({
  idol,
  weapons = [
    {
      name: "Idol Concert",
      components: [{ name: "Idol Concert" }, { name: "Idol Concert" }],
    },
    {
      name: "Idol Concert",
      components: [{ name: "Idol Concert" }, { name: "Idol Concert" }],
    },
    {
      name: "Idol Concert",
      components: [{ name: "Idol Concert" }, { name: "Idol Concert" }],
    },
    {
      name: "Idol Concert",
      components: [{ name: "Idol Concert" }, { name: "Idol Concert" }],
    },
  ],
  items,
}: BuildProps): React.ReactElement => {
  return (
    <Box label="Build">
      <BuildContainer>
        <SectionName>Idol & Stamps</SectionName>

        <IdolContainer>
          <Sprite
            type="idols-icon"
            name="Amelia Watson"
            label="Amelia Watson"
            onSelected={() => {
              console.log("open selection dialog");
            }}
          />

          <Sprite type="skills" name="Pistol Shot" label="Pistol Shot" />

          <StampsContainer>
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
          </StampsContainer>
        </IdolContainer>

        <div>
          <WeaponsContainer>
            <SectionName>Weapons</SectionName>

            {weapons.map((weapon) => (
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
          </WeaponsContainer>

          <ItemsContainer>
            <SectionName>Items</SectionName>

            <Sprite type="items" name="Sake" label="Sake" />
            <Sprite type="items" name="Sake" label="Sake" />
            <Sprite type="items" name="Sake" label="Sake" />
            <Sprite type="items" name="Sake" label="Sake" />
            <Sprite type="items" name="Sake" label="Sake" />
            <Sprite type="items" name="Sake" label="Sake" />
          </ItemsContainer>
        </div>
      </BuildContainer>
    </Box>
  );
};
