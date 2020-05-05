import { IItem } from "../Types";

export enum ItemId {
  club = 1001,
  leatherShield = 2001,
  greenHerb = 3001,
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
    ATK: 3,
    DEF: 0,
    HP: 0,
  },
  //防具
  {
    id: ItemId.leatherShield,
    types: ItemType.shield,
    name: "かわのたて",
    ATK: 0,
    DEF: 2,
    HP: 0,
  },
  //回復薬
  {
    id: ItemId.greenHerb,
    types: ItemType.potion,
    name: "やくそう",
    ATK: 0,
    DEF: 0,
    HP: 10,
  },
];
