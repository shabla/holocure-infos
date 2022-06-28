export interface ItemLevel {
  level: number;
  desc: number;
}

export interface Item {
  id: string;
  type: "weapon" | "item" | "collab";
  spritePos: [number, number];
  name: string;
  desc: string;
  levels: ItemLevel[];
  requires?: string[];
  requirement?: string;
}