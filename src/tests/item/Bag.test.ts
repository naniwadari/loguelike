import * as t from "@root/item/Bag";
import { Weapon } from "@root/item/Weapon";
import { ItemId } from "@root/config/item";

/* モックデータ */
let item = new Weapon(ItemId.club);
let item2 = new Weapon(ItemId.club);

describe("store", () => {
  test("should collect effect", () => {
    let bag = new t.Bag();
    bag.store(item);
    let firstItem = bag.items[0];
    expect(firstItem.index).toBe(0);
    expect(firstItem.item).toBe(item);
    bag.store(item);
    expect(bag.items.length).toBe(2);
    bag.take(firstItem.index);
    expect(bag.items.length).toBe(1);
    expect(bag.items[0].index).toBe(0);
  });
});

describe("renumbering", () => {
  test("should return collect number", () => {
    let bag = new t.Bag();
    bag.store(item);
    bag.store(item2);
    bag.items = t.removeByIndex(bag.items, 0);
    t.renumbering(bag.items);
    expect(bag.items.length).toBe(1);
    expect(bag.items[0].index).toBe(0);
  });
});
