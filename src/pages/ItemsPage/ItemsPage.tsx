import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams, setSearchParams] = useSearchParams();

  const itemsById = useMemo(() => {
    if (!items) {
      return {};
    }

    return items.reduce((acc, item) => {
      acc[item.id] = item;

      return acc;
    }, {} as Record<string, Item>);
  }, [items]);

  useEffect(() => {
    fetch('/items.json')
      .then(data => data.json())
      .then(items => {
        setItems(items);
        setSelectedItem(items.find((i: Item) => i.name === "BL Fujoshi"));
      })
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
            itemsById={itemsById}
          />
        </Box>

        {sections.map(section => (
          <Box label={section.title} key={section.type}>
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
        itemsById={itemsById}
        item={selectedItem}
        onItemSelected={handleItemClicked}
      />
    </div>
  );
}