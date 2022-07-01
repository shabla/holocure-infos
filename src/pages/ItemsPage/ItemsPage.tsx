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
  const [loaded, itemsById, loadItems, getItemByType] = useItemsStore(state => [
    state.loaded,
    state.itemsById,
    state.loadItems,
    state.getItemByType
  ])

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    let itemId = searchParams.get('i');

    if (!itemId) {
      itemId = 'spider-cooking';
    }

    setSelectedItem(itemsById[itemId]);
  }, [searchParams, itemsById])

  const handleItemClicked = (item: Item) => {
    setSearchParams({ i: item.id });
  }

  if (!loaded) {
    return null;
  }

  return (
    <div className="items-page flex-row content-container gap-10">
      <div className="sections">
        <Box label="Collabs">
          <CollabsList
            onItemClicked={handleItemClicked}
            selectedItem={selectedItem}
            items={getItemByType("collab")}
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