import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Item } from '@/models/Item';
import { Sprite, Box } from '@/components';
import { useItemsStore } from "@/stores/itemsStore";
import { CollabsList } from "./CollabsList/CollabsList";
import { ItemDetails } from "./ItemDetails/ItemDetails";

import "./ItemsPage.scss"

interface ItemSection {
  type: Item['type'];
  title: string;
}

const sections: ItemSection[] = [
  { type: "weapon", title: "Weapons" },
  { type: "item", title: "Items" },
]

export const ItemsPage = () => {
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [comboMode, setComboMode] = useState<boolean>(false);
  const [comboItems, setComboItems] = useState<Item[]>([]);
  const [loaded, loadItems, getItemById, getItemByType] = useItemsStore(state => [
    state.loaded,
    state.loadItems,
    state.getItemById,
    state.getItemByType,
  ])

  useEffect(() => {
    loadItems().then(() => {
      const itemId = searchParams.get('i');
      const selectedItem = itemId ? getItemById(itemId) : undefined;
      setSelectedItem(selectedItem);

      const comboItemIds = searchParams.get('c');
      if (comboItemIds !== null) {
        setComboMode(true);

        const validItems = comboItemIds
          .split(",")
          .map(id => getItemById(id))
          .filter(i => i !== undefined && i.type === "collab") as Item[];

        setComboItems(validItems);

      } else {
        setComboMode(false);
        setComboItems([]);
      }
    });
  }, [searchParams, getItemById])

  const updateUrlParams = (selectedItem?: Item, comboItems?: Item[]) => {
    const params = new URLSearchParams(searchParams);

    if (selectedItem === undefined) {
      params.delete("i")
    } else {
      params.set("i", selectedItem.id);
    }

    if (comboItems === undefined) {
      params.delete("c");
    } else {
      params.set("c", comboItems.map(i => i.id).join(","));
    }

    setSearchParams(params);
  }

  const handleItemClicked = (item: Item) => {
    updateUrlParams(item, comboItems.length > 0 ? comboItems : undefined);
  }

  const handleComboItemsChanged = (items: Item[]) => {
    updateUrlParams(selectedItem, items)
  }

  const handleComboModeChanged = (state: boolean) => {
    if (state) {
      if (selectedItem && selectedItem.type === "collab") {
        // If a collab item is selected, include it in the combo
        updateUrlParams(undefined, [selectedItem]);

      } else {
        // keep non-collab selected item
        updateUrlParams(selectedItem, []);
      }
    } else if (comboItems.length === 1) {
      // disable combo, only 1 item in the combo, selected it
      updateUrlParams(comboItems[0]);

    } else {
      // disable combo, keep selected item
      updateUrlParams(selectedItem);
    }
  }

  if (!loaded) {
    return null;
  }

  return (
    <div className="items-page flex-row content-container gap-10">
      <div className="sections">
        <Box label={
          <>
            <span>Collabs</span>

            <div>
              <label className="checkbox flex-row align-x-center">
                <input
                  type="checkbox"
                  checked={comboMode}
                  onChange={e => handleComboModeChanged(e.currentTarget.checked)}
                />
                Combo mode
              </label>
            </div>
          </>
        }>
          <CollabsList
            selectedItem={selectedItem}
            items={getItemByType("collab")}
            comboMode={comboMode}
            comboItems={comboItems}
            onItemClicked={handleItemClicked}
            onComboItemsChanged={handleComboItemsChanged}
          />
        </Box>

        {sections.map(section => (
          <Box label={section.title} key={section.type}>
            <div className="items-list gap-10">
              {getItemByType(section.type)
                .map(item => (
                  <Sprite
                    type="item"
                    offset={item.spritePos}
                    selected={item === selectedItem}
                    showBackground
                    label={item.name}
                    value={item}
                    onSelected={handleItemClicked}
                    key={item.id}
                  />
                ))
              }
            </div>
          </Box>
        ))}
      </div>

      <ItemDetails
        item={selectedItem}
        onItemSelected={handleItemClicked}
      />
    </div>
  );
}