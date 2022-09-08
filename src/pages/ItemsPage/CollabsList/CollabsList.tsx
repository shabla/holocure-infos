import React, { useMemo } from "react";
import classNames from "classnames";

import { Sprite } from "@/components";
import { Item } from "@/models";
import { useItemsStore, useSpriteOffsetsStore } from "@/stores";

import "./CollabsList.scss";

export interface CollabsListProps {
  items: Item[];
  selectedItem?: Item;
  comboItems?: Item[];
  comboMode?: boolean;
  onItemClicked: (item: Item) => void;
  onComboItemsChanged: (items: Item[]) => void;
}

export const CollabsList = ({
  items,
  selectedItem,
  comboItems = [],
  comboMode = false,
  onItemClicked,
  onComboItemsChanged,
}: CollabsListProps) => {
  const getItemById = useItemsStore(state => state.getItemById);
  const getSpriteSheet = useSpriteOffsetsStore(state => state.getSpriteSheet);
  const itemsSpriteSheet = getSpriteSheet('items');

  const disabledCollabs = useMemo(() => {
    return items
      .filter(item => {
        // Is a combo item, don't disable
        if (comboItems.some(ci => item.id === ci.id)) {
          return false;
        }

        // does this item have parts already picked in current combo items' parts
        return comboItems.reduce((val, ci) => {
          const hasSamePart = item.requires!.some(id => ci.requires!.some(cid => id === cid))
          return val || hasSamePart;
        }, false);
      })
  }, [items, comboItems]);

  const handleCollabItemClicked = (item: Item) => {
    if (comboMode) {
      let newCombo = comboItems;

      const id = comboItems.indexOf(item);
      if (id > -1) {
        newCombo = comboItems.filter(ci => ci !== item);
      } else if (comboItems.length < 4) {
        newCombo = [...comboItems, item]
      }

      onComboItemsChanged(newCombo);

    } else {
      onItemClicked(item)
    }
  }

  return (
    <div className="collabs-list">
      {items.map(item => {
        if (!item.requires) {
          console.error(`Collab item "${item.name}" doesn't have any required items`, item);
          return null;
        }

        const firstItem = getItemById(item.requires[0]);
        const secondItem = getItemById(item.requires[1]);

        // Don't check all of this if combo mode is not enabled
        let isInCombo, isFirstItemDisabled, isSecondItemDisabled, isCollabItemDisabled;
        if (comboMode) {
          isInCombo = comboItems.includes(item);
          isFirstItemDisabled = firstItem && !!comboItems.find(ci => ci.requires!.includes(firstItem.id));
          isSecondItemDisabled = secondItem && !!comboItems.find(ci => ci.requires!.includes(secondItem.id));
          isCollabItemDisabled = disabledCollabs.includes(item);
        }

        if (!firstItem || !secondItem || !item) {
          return null
        }

        return (
          <React.Fragment key={item.name}>
            <Sprite
              spriteSheet={itemsSpriteSheet}
              name={firstItem.name}
              value={firstItem}
              label={firstItem.name}
              showBackground
              className={classNames({ "disabled": isFirstItemDisabled })}
              selected={firstItem === selectedItem}
              onSelected={
                comboMode && isFirstItemDisabled
                  ? undefined
                  : () => onItemClicked(firstItem!)
              }
            />

            <div className="operator">+</div>

            <Sprite
              spriteSheet={itemsSpriteSheet}
              name={secondItem.name}
              value={secondItem}
              label={secondItem.name}
              showBackground
              className={classNames({ "disabled": isSecondItemDisabled })}
              selected={secondItem === selectedItem}
              onSelected={
                comboMode && isSecondItemDisabled
                  ? undefined
                  : () => onItemClicked(secondItem!)
              }
            />

            <div className="operator">=</div>

            <Sprite
              spriteSheet={itemsSpriteSheet}
              name={item.name}
              value={item}
              label={item.name}
              showBackground
              className={classNames({
                "combo": comboMode && isInCombo,
                "disabled": comboMode && isCollabItemDisabled
              })}
              selected={
                comboMode
                  ? comboItems.includes(item)
                  : item === selectedItem
              }
              onSelected={
                comboMode && isCollabItemDisabled
                  ? undefined
                  : handleCollabItemClicked
              }
            />
          </React.Fragment>
        )
      })
      }
    </div>
  )
}