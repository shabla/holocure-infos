import { Sprite2, Sprite2Props } from "../Sprite/Sprite2";

import "./SpriteList.scss";

export interface SpriteListProps {
  sprites: Sprite2Props[];
  direction?: "row" | "column";
}

export const SpriteList = ({ sprites, direction = "row" }: SpriteListProps) => {
  return (
    <div className={`sprite-list flex-${direction}`}>
      {sprites.map(spriteProps => <Sprite2 {...spriteProps} />)}
    </div>
  )
}