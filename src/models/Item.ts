export interface ItemLevel {
  level: number;
  desc: string;
}

export interface Item {
  id: string; // set at runtime
  type: "weapon" | "item" | "collab";
  spritePos: [number, number];
  name: string;
  desc: string;
  levels: ItemLevel[];
  requires?: string[];
  requirement?: string;
}