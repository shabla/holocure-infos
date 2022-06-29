export interface Upgrade {
  name: string;
  image: string;
  desc: string;
  costs: number[];
  spriteOffset: [number, number];
}