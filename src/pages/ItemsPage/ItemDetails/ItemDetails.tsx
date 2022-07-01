import { useMemo } from "react";

import { Sprite, SpriteProps, SpriteList, Box } from "@/components";
import { Item } from "@/models/Item";
import { useItemsStore } from "@/stores/itemsStore";

import "./ItemDetails.scss"

export interface ItemDetailsProps {
  item?: Item;
  onItemSelected: (item: Item) => void;
}

export const ItemDetails = ({
  item,
  onItemSelected
}: ItemDetailsProps) => {
  const [getItemById, getItemUsage] = useItemsStore(state => [state.getItemById, state.getItemUsage]);

  const usedIn: Item[] = useMemo(() => {
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
          <div className="flex-row align-x-center">
            <Sprite
              type="item"
              offset={item?.spritePos}
              value={item}
              showBackground
              onSelected={onItemSelected}
            />
            <span className="item-name">{item?.name}</span>
          </div>
          <span className="item-type">{item?.type}</span>
        </>
      }
    >

      <table className="info-table">
        <tbody>
          {item?.requirement && (
            <tr>
              <td className="name">Requirement</td>
              <td className="value">{item.requirement}</td>
            </tr>
          )}

          <tr>
            <td className="name">{item?.levels ? 'Level 1' : 'Description'}</td>
            <td className="value">{item?.desc}</td>
          </tr>

          {item?.levels?.map(level => (
            <tr key={level.level}>
              <td className="name">Level {level.level}</td>
              <td className="value">{level.desc}</td>
            </tr>
          ))}

          {item?.requires && (
            <tr>
              <td className="name">Requires</td>
              <td className="value">
                <SpriteList
                  sprites={
                    item.requires.map(itemId => {
                      const item = getItemById(itemId);
                      return {
                        type: "item",
                        offset: item?.spritePos,
                        value: item,
                        label: item?.name,
                        showBackground: true,
                        onSelected: onItemSelected,
                        key: itemId,
                      } as SpriteProps;
                    })
                  }
                />
              </td>
            </tr>
          )}

          {usedIn?.length > 0 && (
            <tr>
              <td className="name">Used In</td>
              <td className="value">
                <SpriteList
                  sprites={
                    usedIn.map(item => ({
                      type: "item",
                      offset: item.spritePos,
                      value: item,
                      label: item.name,
                      showBackground: true,
                      onSelected: onItemSelected,
                      key: item.name,
                    } as SpriteProps))
                  }
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Box>
  )
}