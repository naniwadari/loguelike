import Player from "@root/player/player";
import { Weapon } from "@root/item/Weapon";
import { ItemId } from "@root/config/item";

/* モックデータ */
const point = { x: 1, y: 1 };
const player = new Player(point.x, point.y);

const itemId = ItemId.club;
const item = new Weapon(itemId);

/* テスト */

describe("equip & remove", () => {
  test("should return collect number", () => {
    player.equip(item);
    expect(player.equipATK).toBe(item.ATK);
    player.removeEquip(item);
    expect(player.equipATK).toBe(0);
  });
});
