import classNames from "classnames";

import { getSpriteBackground } from "@/utils/getSpriteBackground";
import itemsSpriteSheet from "@/assets/items.png";
import skillsSpriteSheet from "@/assets/skills.png";
import upgradeSpriteSheet from "@/assets/upgrades.png";
import idolIconsSpriteSheet from "@/assets/idol-icons.png";
import idolModelsSpriteSheet from "@/assets/idol-models.png";

import "./Sprite.scss"

type SpriteType = "item" | "skill" | "upgrade" | "idol-icon" | "idol-model";

const defaultValues: Record<SpriteType, Required<Pick<SpriteProps, 'sprite' | 'width' | 'height'>>> = {
  item: {
    sprite: itemsSpriteSheet,
    width: 54,
    height: 54,
  },
  skill: {
    sprite: skillsSpriteSheet,
    width: 50,
    height: 50,
  },
  upgrade: {
    sprite: upgradeSpriteSheet,
    width: 50,
    height: 50,
  },
  "idol-icon": {
    sprite: idolIconsSpriteSheet,
    width: 86,
    height: 76,
  },
  "idol-model": {
    sprite: idolModelsSpriteSheet,
    width: 180,
    height: 190,
  },
}

export interface SpriteProps<T = unknown> {
  type: SpriteType;
  sprite?: string;
  width?: number;
  height?: number;
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
  width,
  height,
  offset = [0, 0],
  label,
  showBackground = true,
  selected = false,
  value,
  onSelected
}: SpriteProps<T>) => {
  const showLabel = !!label;

  width = width || defaultValues[type].width;
  height = height || defaultValues[type].height;
  sprite = sprite || defaultValues[type].sprite;

  const bgStyle = getSpriteBackground(sprite, width, height, offset);

  return (
    <div
      className={classNames("sprite", {
        selected,
        clickable: !!onSelected,
        'show-label': showLabel,
      })}
      onClick={onSelected ? () => onSelected(value!) : undefined}
      style={{
        width: `${width}px`,
        height: `${height}px`,
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