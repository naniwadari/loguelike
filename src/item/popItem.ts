import { Floor } from "../floor/Floor";
import { IItem, IPoint, IFallItem } from "../Types";
import { Random } from "../module/RandomNum";
import { ItemConf, ItemList, ItemType } from "../config/item";
import { Weapon } from "./Weapon";
import { Shield } from "./Shield";
import { Potion } from "./Potion";

export default (floor: Floor): IFallItem[] => {
  let popItems: IFallItem[] = [];
  let index = 0;
  let list = ItemList;
  for (let i = 0; i < floor.rooms.length; i++) {
    let popCountLim = Random.rangeInt(ItemConf.popMin, ItemConf.popMax);

    for (let j = 0; j < popCountLim - 1; j++) {
      const popPoint: IPoint = floor.coordinateCanStand();
      const isNotDownstair = checkOverlappingDownstair(
        popPoint,
        floor.downstair
      );
      if (isNotDownstair) {
        let itemNum = Random.rangeInt(0, list.length);
        let itemMaterial = list[itemNum];
        let item: IItem | undefined;
        if (itemMaterial.types === ItemType.weapon) {
          item = new Weapon(itemMaterial.id);
        } else if (itemMaterial.types === ItemType.shield) {
          item = new Shield(itemMaterial.id);
        } else if (itemMaterial.types === ItemType.potion) {
          item = new Potion(itemMaterial.id);
        } else {
          item = undefined;
        }
        if (item) {
          let fallItem = { index: index, point: popPoint, item: item };
          ++index;
          popItems.push(fallItem);
        }
      }
    }
  }
  return popItems;
};

function checkOverlappingDownstair(point: IPoint, downstair: IPoint) {
  if (point.x === downstair.x && point.y === downstair.y) {
    return false;
  }
  return true;
}
