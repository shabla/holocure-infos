import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Item } from "@/models";
import { Sprite, Box } from "@/components";
import { useItemsStore } from "@/stores";
import { CollabsList } from "./CollabsList/CollabsList";
import { ItemDetailsBox } from "./ItemDetailsBox/ItemDetailsBox";
import { ComboItemsBox } from "./ComboItemsBox/ComboItemsBox";

import "./ItemsPage.scss";

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
  const [loaded, loadItems, getItemById, getItemsByType] = useItemsStore(
    (state) => [
      state.loaded,
      state.loadItems,
      state.getItemById,
      state.getItemsByType,
    ]
  );

  useEffect(() => {
    loadItems().then(() => {
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
    });
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

  if (!loaded) {
    return null;
  }

  return (
    <div className="items-page flex-column content-container gap-content">
      <Box label="Build">
        <div className="build">
          <div className="section-name">Idol & Stamps</div>

          <div className="idol">
            <Sprite
              type="idols-icon"
              name="Amelia Watson"
              label="Amelia Watson"
              onSelected={() => {
                console.log("open selection dialog");
              }}
            />

            <Sprite type="skills" name="Pistol Shot" label="Pistol Shot" />

            <div className="stamps">
              <div className="stamp"></div>
              <div className="stamp"></div>
              <div className="stamp"></div>
            </div>
          </div>

          <div className="picks">
            <div className="weapons">
              <div className="section-name">Weapons</div>

              <div className="weapon-slot">
                <Sprite type="items" name="Idol Concert" label="Idol Concert" />

                <div className="components">
                  <Sprite type="items" name="Glowstick" label="Glowstick" />
                  <Sprite type="items" name="Idol Song" label="Idol Song" />
                </div>
              </div>

              <div className="weapon-slot">
                <Sprite type="items" name="Idol Concert" label="Idol Concert" />
              </div>
              <div className="weapon-slot">
                <Sprite type="items" name="Idol Concert" label="Idol Concert" />
              </div>
              <div className="weapon-slot">
                <Sprite type="items" name="Idol Concert" label="Idol Concert" />
              </div>
              <div className="weapon-slot">
                <Sprite type="items" name="Idol Concert" label="Idol Concert" />
              </div>
            </div>

            <div className="items">
              <div className="section-name">Items</div>

              <Sprite type="items" name="Sake" label="Sake" />
              <Sprite type="items" name="Sake" label="Sake" />
              <Sprite type="items" name="Sake" label="Sake" />
              <Sprite type="items" name="Sake" label="Sake" />
              <Sprite type="items" name="Sake" label="Sake" />
              <Sprite type="items" name="Sake" label="Sake" />
            </div>
          </div>
        </div>
      </Box>

      {comboMode && (
        <ComboItemsBox
          items={comboItems}
          selectedItem={selectedItem}
          onItemClicked={handleItemClicked}
          onClear={() => setComboItems([])}
        />
      )}

      <div className="flex-row gap-content">
        <div className="item-sections">
          <Box
            label={
              <>
                <span>Collabs</span>

                <div>
                  <label className="checkbox flex-row align-x-center">
                    <input
                      type="checkbox"
                      className="mr-10"
                      checked={comboMode}
                      onChange={(e) =>
                        handleComboModeChanged(e.currentTarget.checked)
                      }
                    />
                    Combo mode
                  </label>
                </div>
              </>
            }
          >
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
