import { IItem, IBag } from "@root/Types";

export class Bag {
  storeCount: number;
  items: IBag[];
  constructor() {
    this.storeCount = 0;
    this.items = [];
  }

  store(item: IItem) {
    let store: IBag = { index: this.storeCount, item: item };
    this.items.push(store);
    ++this.storeCount;
  }

  take(index: number) {
    this.items = removeByIndex(this.items, index);
    this.items = renumbering(this.items);
    --this.storeCount;
  }
}

export function renumbering(items: IBag[]) {
  if (items.length === 0) {
    return items;
  }
  for (let i = 0; i < items.length; i++) {
    items[i].index = i;
  }
  return items;
}

export function searchByIndex(items: IBag[], index: number) {
  let result: IBag[] = items.filter((item: IBag) => {
    return item.index === index;
  });
  return result[0];
}

export function removeByIndex(items: IBag[], index: number) {
  items.some((v: IBag, i) => {
    if (v.index === index) items.splice(i, 1);
  });
  return items;
}
