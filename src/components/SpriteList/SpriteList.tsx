import React from "react";

import { Sprite, SpriteProps } from "../Sprite/Sprite";

import "./SpriteList.scss";

export interface SpriteListProps {
  sprites: SpriteProps[];
  direction?: "row" | "column";
}

export const SpriteList: React.FC<SpriteListProps> = ({
  sprites,
  direction = "row"
}) => {
  return (
    <div className={`sprite-list flex-${direction}`}>
      {sprites.map(spriteProps => <Sprite {...spriteProps} />)}
    </div>
  )
}