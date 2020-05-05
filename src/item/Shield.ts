import { IItem } from "../Types";
import { ItemType, ItemId, ItemList } from "../config/item";

const list = ItemList;

export class Shield implements IItem {
  id: number;
  types: ItemType;
  name: string;
  ATK: number;
  DEF: number;
  HP: number;

  constructor(id: ItemId) {
    let item = findItemByIndex(id, list);
    this.id = item.id;
    this.name = item.name;
    this.types = item.types;
    this.ATK = item.ATK;
    this.DEF = item.DEF;
    this.HP = item.HP;
  }
}

function findItemByIndex(id: number, list: IItem[]) {
  let result: IItem[] = list.filter((item: IItem) => {
    return item.id === id;
  });
  return result[0];
}
