import { useEffect, useState, useMemo } from "react";

import { Item } from '@/models/Item';
import {
  ItemIcon,
  ItemDetails,
  CollabsList,
  Box
} from '@/components';

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
  const [items, setItems] = useState<Item[]>();

  const itemsByName = useMemo(() => {
    if (!items) {
      return {};
    }

    return items.reduce((acc, item) => {
      acc[item.name] = item;

      return acc;
    }, {} as Record<string, Item>);
  }, [items])

  useEffect(() => {
    fetch('/items.json')
      .then(data => data.json())
      .then(items => {
        setItems(items);
        setSelectedItem(items.find((i: Item) => i.name === "BL Fujoshi"));
      })
  }, []);

  const handleItemClicked = (item: Item) => {
    setSelectedItem(item);
  }

  if (!items) {
    return null;
  }

  return (
    <div className="items-page flex-row align-start">
      <div className="sections">
        <Box label="Collabs">
          <CollabsList
            onItemClicked={handleItemClicked}
            selectedItem={selectedItem}
            items={items}
            itemsByName={itemsByName}
          />
        </Box>

        {sections.map(section => (
          <Box label={section.title} className="items" key={section.type}>
            <div className="items-list">
              {items
                .filter(i => i.type === section.type)
                .map(item => {
                  return (
                    <ItemIcon
                      key={item.id}
                      item={item}
                      selected={item === selectedItem}
                      onSelected={handleItemClicked}
                    />
                  )
                })
              }
            </div>
          </Box>
        ))}
      </div>

      <ItemDetails
        items={items}
        itemsByName={itemsByName}
        item={selectedItem}
        onItemSelected={handleItemClicked}
      />
    </div>
  );
}