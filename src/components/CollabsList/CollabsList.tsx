import React from "react";

import { ItemIcon } from "@/components";
import { Item } from "@/models/Item";

import "./CollabsList.scss";

export interface CollabsListProps {
  items: Item[];
  itemsById: Record<string, Item>;
  selectedItem?: Item;
  onItemClicked: (item: Item) => void;
}

export const CollabsList: React.FC<CollabsListProps> = ({
  items,
  selectedItem,
  itemsById,
  onItemClicked
}) => {
  return (
    <div className="collabs-list">
      {items
        .filter(i => i.type === "collab")
        .map(item => {
          if (!item.requires) {
            console.error(`collab item "${item.name}" doesn't have any required items`, item);
            return null;
          }

          const firstItem = itemsById[item.requires[0]];
          const secondItem = itemsById[item.requires[1]];

          return (
            <React.Fragment key={item.name}>
              <ItemIcon
                item={firstItem}
                selected={firstItem === selectedItem}
                onSelected={() => onItemClicked(firstItem!)}
              />

              <div className="operator">+</div>

              <ItemIcon
                item={secondItem}
                selected={secondItem === selectedItem}
                onSelected={() => onItemClicked(secondItem!)}
              />

              <div className="operator">=</div>

              <ItemIcon
                item={item}
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