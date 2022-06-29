import React from "react";
import classNames from "classnames";

import { Item } from "@/models/Item";
import itemsSpriteSheet from "@/assets/items.png";
import { getSpriteBackground } from "@/utils/getSpriteBackground";

import "./ItemIcon.scss"

export interface ItemIconProps {
  item?: Item;
  selected?: boolean;
  showLabel?: boolean;
  onSelected?: (item: Item) => void;
}

const SPRITE_SIZE = 54;

export const ItemIcon: React.FC<ItemIconProps> = ({
  item,
  selected = false,
  showLabel = true,
  onSelected
}) => {
  let bgStyle = '';
  if (item) {
    bgStyle = getSpriteBackground(itemsSpriteSheet, SPRITE_SIZE, item.spritePos);
  }

  return (
    <div
      className={classNames("item-icon", {
        selected,
        clickable: !!onSelected,
        'show-label': showLabel,
      })}
      onClick={onSelected ? () => onSelected(item!) : undefined}
      style={{
        background: `${bgStyle}, rgba(0, 0, 0, 0.1)`
      }}
    >
      {showLabel && <div className="name flex-column align-center justify-center">{item?.name || '??'}</div>}
    </div>
  );
}