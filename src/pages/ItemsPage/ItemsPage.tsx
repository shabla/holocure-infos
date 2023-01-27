import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Item } from "@/models";
import { Sprite, Box } from "@/components";
import { useItemsStore } from "@/stores";
import { CollabsList } from "./CollabsList/CollabsList";
import { ItemDetailsBox } from "./ItemDetailsBox/ItemDetailsBox";
import { ComboItemsBox } from "./ComboItemsBox/ComboItemsBox";
import { Build } from "./Build/Build";

interface ItemSection {
  type: Item["type"];
  title: string;
}

const sections: ItemSection[] = [
  { type: "weapon", title: "Weapons" },
  { type: "item", title: "Items" },
];

export const ItemsPage = () => {
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [comboMode, setComboMode] = useState<boolean>(false);
  const [comboItems, setComboItems] = useState<Item[]>([]);

  const [getItemById, getItemsByType] = useItemsStore((state) => [
    state.getItemById,
    state.getItemsByType,
  ]);

  useEffect(() => {
    const itemId = searchParams.get("i");
    const selectedItem = itemId ? getItemById(itemId) : undefined;
    setSelectedItem(selectedItem);

    const comboItemIds = searchParams.get("c");
    if (comboItemIds !== null) {
      setComboMode(true);

      const validItems = comboItemIds
        .split(",")
        .map((id) => getItemById(id))
        .filter((i) => i !== undefined && i.type === "collab") as Item[];

      setComboItems(validItems);
    } else {
      setComboMode(false);
      setComboItems([]);
    }
  }, [searchParams, getItemById]);

  const updateUrlParams = (selectedItem?: Item, comboItems?: Item[]) => {
    const params = new URLSearchParams(searchParams);

    if (selectedItem === undefined) {
      params.delete("i");
    } else {
      params.set("i", selectedItem.id);
    }

    if (comboItems === undefined) {
      params.delete("c");
    } else {
      params.set("c", comboItems.map((i) => i.id).join(","));
    }

    setSearchParams(params);
  };

  const handleItemClicked = (item: Item) => {
    updateUrlParams(item, comboItems.length > 0 ? comboItems : undefined);
  };

  const handleComboItemsChanged = (items: Item[]) => {
    updateUrlParams(selectedItem, items);
  };

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
  };

  return (
    <div className="items-page flex-column content-container gap-content">
      <Build />

      <ComboItemsBox
        items={comboItems}
        selectedItem={selectedItem}
        onItemClicked={handleItemClicked}
        onClear={() => setComboItems([])}
      />

      <div className="flex-row gap-content">
        <div className="item-sections">
          <Box label="Collabs">
            <CollabsList
              selectedItem={selectedItem}
              items={getItemsByType("collab")}
              comboMode={comboMode}
              comboItems={comboItems}
              onItemClicked={handleItemClicked}
              onComboItemsChanged={handleComboItemsChanged}
            />
          </Box>

          {sections.map((section) => (
            <Box label={section.title} key={section.type}>
              <div className="items-list gap-10">
                {getItemsByType(section.type).map((item) => (
                  <Sprite
                    type="items"
                    name={item.name}
                    selected={item === selectedItem}
                    showBackground
                    label={item.name}
                    value={item}
                    onSelected={handleItemClicked}
                    key={item.id}
                  />
                ))}
              </div>
            </Box>
          ))}
        </div>

        <ItemDetailsBox
          item={selectedItem}
          onItemSelected={handleItemClicked}
        />
      </div>
    </div>
  );
};
