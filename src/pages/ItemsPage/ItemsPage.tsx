import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Item } from '@/models/Item';
import { ItemIcon, Box } from '@/components';
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

export const ItemsPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, itemsById, loadItems, getItemByType] = useItemsStore(state => [
    state.loading,
    state.itemsById,
    state.loadItems,
    state.getItemByType
  ])

  useEffect(() => {
    loadItems()
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

  if (loading) {
    return null;
  }

  return (
    <div className="items-page flex-row align-start content-container">
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
            <div className="items-list">
              {getItemByType(section.type)
                .map(item => (
                  <ItemIcon
                    key={item.id}
                    item={item}
                    selected={item === selectedItem}
                    onSelected={handleItemClicked}
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