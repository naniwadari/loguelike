import { IItem } from "../Types";

export enum ItemConf {
  popMin = 0,
  popMax = 3,
  bagMax = 10,
}
export enum ItemId {
  club = 1001,
  copperW = 1002,
  ironW = 1003,
  strongW = 1004,
  /* 盾 */
  leather = 2001,
  copperS = 2002,
  ironS = 2003,
  strongS = 2004,
  /* 回復薬 */
  greenHerb = 3001,
  redPotion = 3002,
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
  {
    id: ItemId.copperW,
    types: ItemType.weapon,
    name: "どーのつるぎ",
    ATK: 4,
    DEF: 0,
    HP: 0,
  },
  {
    id: ItemId.ironW,
    types: ItemType.weapon,
    name: "てつのつるぎ",
    ATK: 6,
    DEF: 0,
    HP: 0,
  },
  {
    id: ItemId.strongW,
    types: ItemType.weapon,
    name: "めちゃつよのけん",
    ATK: 10,
    DEF: 0,
    HP: 0,
  },

  //防具
  {
    id: ItemId.leather,
    types: ItemType.shield,
    name: "かわのたて",
    ATK: 0,
    DEF: 2,
    HP: 0,
  },
  {
    id: ItemId.copperS,
    types: ItemType.shield,
    name: "どーのたて",
    ATK: 0,
    DEF: 3,
    HP: 0,
  },
  {
    id: ItemId.ironS,
    types: ItemType.shield,
    name: "てつのたて",
    ATK: 0,
    DEF: 5,
    HP: 0,
  },
  {
    id: ItemId.strongS,
    types: ItemType.shield,
    name: "めちゃかたのたて",
    ATK: 0,
    DEF: 8,
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
  {
    id: ItemId.redPotion,
    types: ItemType.potion,
    name: "赤い回復薬",
    ATK: 0,
    DEF: 0,
    HP: 30,
  },
];
