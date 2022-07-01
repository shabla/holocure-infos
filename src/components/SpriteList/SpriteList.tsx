import { Sprite, SpriteProps } from "../Sprite/Sprite";

import "./SpriteList.scss";

export interface SpriteListProps {
  sprites: SpriteProps[];
  direction?: "row" | "column";
}

export const SpriteList = ({
  sprites,
  direction = "row"
}: SpriteListProps) => {
  return (
    <div className={`sprite-list flex-${direction}`}>
      {sprites.map(spriteProps => <Sprite {...spriteProps} />)}
    </div>
  )
}