import React from "react";

import { Sprite } from "@/components";
import { Item } from "@/models/Item";
import { useItemsStore } from "@/stores/itemsStore";

import "./CollabsList.scss";

export interface CollabsListProps {
  items: Item[];
  selectedItem?: Item;
  onItemClicked: (item: Item) => void;
}

export const CollabsList: React.FC<CollabsListProps> = ({
  items,
  selectedItem,
  onItemClicked
}) => {
  const getItemById = useItemsStore(state => state.getItemById);

  return (
    <div className="collabs-list">
      {items
        .map(item => {
          if (!item.requires) {
            console.error(`collab item "${item.name}" doesn't have any required items`, item);
            return null;
          }

          const firstItem = getItemById(item.requires[0]);
          const secondItem = getItemById(item.requires[1]);

          return (
            <React.Fragment key={item.name}>
              <Sprite
                type="item"
                offset={firstItem?.spritePos}
                value={firstItem}
                label={firstItem?.name}
                showBackground
                selected={firstItem === selectedItem}
                onSelected={() => onItemClicked(firstItem!)}
              />

              <div className="operator">+</div>

              <Sprite
                type="item"
                offset={secondItem?.spritePos}
                value={secondItem}
                label={secondItem?.name}
                showBackground
                selected={secondItem === selectedItem}
                onSelected={() => onItemClicked(secondItem!)}
              />

              <div className="operator">=</div>

              <Sprite
                type="item"
                offset={item.spritePos}
                value={item}
                label={item.name}
                showBackground
                selected={item === selectedItem}
                onSelected={() => onItemClicked(item)}
              />
            </React.Fragment>
          )
        })
      }
    </div>
  )
}