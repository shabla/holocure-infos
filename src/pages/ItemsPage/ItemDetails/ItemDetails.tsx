import React from "react";

import { Sprite, Box } from "@/components";
import { Item } from "@/models/Item";
import { useItemsStore } from "@/stores/itemsStore";

import "./ItemDetails.scss"

export interface ItemDetailsProps {
  item?: Item;
  onItemSelected: (item: Item) => void;
}

export const ItemDetails: React.FC<ItemDetailsProps> = ({
  item,
  onItemSelected
}) => {
  const [getItemById, getItemUsage] = useItemsStore(state => [state.getItemById, state.getItemUsage]);

  const usedIn: Item[] = React.useMemo(() => {
    if (item) {
      return getItemUsage(item.id);
    }
    return [];
  }, [item])

  return (
    <Box
      className="item-details"
      label={
        <>
          <div className="flex-row align-center">
            <Sprite
              type="item"
              offset={item?.spritePos}
              value={item}
              onSelected={onItemSelected}
            />
            <span className="item-name">{item?.name}</span>
          </div>
          <span className="item-type">{item?.type}</span>
        </>
      }
    >
      {item?.requirement && (
        <div className="entry">
          <div className="entry__name">Requirement</div>
          <div className="entry__value">
            {item.requirement}
          </div>
        </div>
      )}

      <div className="entry">
        <div className="entry__name">{item?.levels ? 'Level 1' : 'Description'}</div>
        <div className="entry__value">{item?.desc}</div>
      </div>

      {item?.levels?.map(level => (
        <div className="entry" key={level.level}>
          <>
            <div className="entry__name">Level {level.level}</div>
            <div className="entry__value">{level.desc}</div>
          </>
        </div>
      ))}

      {item?.requires && (
        <div className="entry">
          <div className="entry__name">Requires</div>
          <div className="entry__value">
            {item.requires.map(itemId => {
              const item = getItemById(itemId);
              return (
                <Sprite
                  type="item"
                  offset={item?.spritePos}
                  value={item}
                  label={item?.name}
                  onSelected={onItemSelected}
                  key={itemId}
                />
              )
            })}
          </div>
        </div>
      )}

      {usedIn?.length > 0 && (
        <div className="entry">
          <div className="entry__name">Used In</div>
          <div className="entry__value">
            {usedIn.map(item => {
              return (
                <Sprite
                  type="item"
                  offset={item.spritePos}
                  value={item}
                  label={item.name}
                  onSelected={onItemSelected}
                  key={item.name}
                />
              )
            })}
          </div>
        </div>
      )}
    </Box>
  )
}