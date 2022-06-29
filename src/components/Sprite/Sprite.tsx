import classNames from "classnames";

import { getSpriteBackground } from "@/utils/getSpriteBackground";
import itemsSpriteSheet from "@/assets/items.png";
import skillsSpriteSheet from "@/assets/skills.png";
import upgradeSpriteSheet from "@/assets/upgrades.png";

import "./Sprite.scss"

type SpriteType = "item" | "skill" | "upgrade";

const defaultValues: Record<SpriteType, Required<Pick<SpriteProps, 'sprite' | 'size'>>> = {
  item: {
    sprite: itemsSpriteSheet,
    size: 54,
  },
  skill: {
    sprite: skillsSpriteSheet,
    size: 50,
  },
  upgrade: {
    sprite: upgradeSpriteSheet,
    size: 50,
  },
}

export interface SpriteProps<T = unknown> {
  type: SpriteType;
  sprite?: string;
  size?: number;
  offset?: [number, number];
  selected?: boolean;
  showBackground?: boolean;
  label?: string;
  value?: T;
  onSelected?: (value: T) => void;
}

export const Sprite = <T,>({
  type,
  sprite,
  size,
  offset = [0, 0],
  label,
  showBackground = true,
  selected = false,
  value,
  onSelected
}: SpriteProps<T>) => {
  const showLabel = !!label;

  size = size || defaultValues[type].size;
  sprite = sprite || defaultValues[type].sprite;

  const bgStyle = getSpriteBackground(sprite, size, offset);

  return (
    <div
      className={classNames("sprite", {
        selected,
        clickable: !!onSelected,
        'show-label': showLabel,
      })}
      onClick={onSelected ? () => onSelected(value!) : undefined}
      style={{
        height: `${size}px`,
        width: `${size}px`,
        background: `${bgStyle}${showBackground ? ', rgba(0, 0, 0, 0.1)' : ''}`
      }}
    >
      {showLabel && (
        <div className="name flex-column align-center justify-center">
          {label}
        </div>
      )}
    </div>
  );
}