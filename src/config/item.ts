import { IItem } from "../Types";

export enum ItemId {
  club = 1001,
}

export enum ItemType {
  weapon = 0,
  shield = 1,
  potion = 2,
}

export const ItemList: IItem[] = [
  //武器
  {
    id: ItemId.club,
    types: ItemType.weapon,
    name: "こんぼう",
    ATK: 2,
    DEF: 0,
    HP: 0,
  },
];
