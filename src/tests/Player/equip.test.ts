import Player from "@root/player/player";
import { Weapon } from "@root/item/Weapon";
import { ItemId } from "@root/config/item";

/* モックデータ */
const point = { x: 1, y: 1 };
const testP = new Player(point.x, point.y);

const itemId = ItemId.club;
const item = new Weapon(itemId);

/* テスト */

describe("equip", () => {
  test("should return collect property", () => {
    testP.equip(item);
    expect(testP.equipATK).toBe(item.ATK);
  });
});
