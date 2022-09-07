import classNames from "classnames";

import { SpriteSheet } from "@/stores/spritesStore";

import "./Sprite.scss"

export interface Sprite2Props<T = unknown> {
  spriteSheet: SpriteSheet;
  name: string;
  selected?: boolean;
  showBackground?: boolean;
  className?: string;
  label?: string;
  value?: T;
  onSelected?: (value: T) => void;
}

const getSpriteBackground = (spriteSheet: SpriteSheet, name: string): string => {
  const offset = spriteSheet.offsets?.[name] || [0, 0];
  const x = -(offset[0] || 0) * spriteSheet.width;
  const y = -(offset[1] || 0) * spriteSheet.height;

  return `url(${spriteSheet.file}) ${x}px ${y}px`;
}

export const Sprite2 = <T,>({
  spriteSheet,
  name,
  label,
  showBackground = false,
  className,
  selected = false,
  value,
  onSelected
}: Sprite2Props<T>) => {
  const showLabel = !!label;
  const bgStyle = getSpriteBackground(spriteSheet, name);
  const containerStyle: React.CSSProperties | undefined = showLabel ? {
    width: `calc(${spriteSheet.width}px + (2 * var(--sprite-label-overflow)))`,
    height: `calc(${spriteSheet.height}px + var(--sprite-label-overflow))`
  } : undefined;
  const imageStyle: React.CSSProperties = {
    width: `${spriteSheet.width}px`,
    height: `${spriteSheet.height}px`,
    background: `${bgStyle}${showBackground ? ', rgba(0, 0, 0, 0.1)' : ''}`
  };

  return (
    <div
      className={classNames("sprite", className, {
        selected,
        clickable: !!onSelected,
        'show-label': showLabel,
      })}
      style={containerStyle}
    >
      {showLabel && (
        <div className="label flex-column align-center align-x-center">
          {label}
        </div>
      )}

      <div
        className="image"
        onClick={onSelected ? () => onSelected(value!) : undefined}
        style={imageStyle}
      />
    </div>
  );
}