import { IPoint, IFallItem } from "../Types";
import { S } from "../State";
import { DrawRange, TyleSize } from "../config";
import { ItemType } from "../config/item";

export default (con: any, drawStartPoint: IPoint) => {
  con.textBaseline = "middle";
  con.textAlign = "center";
  const items: IFallItem[] = S.fallItems;
  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    let point = item.point;
    if (
      point.x >= drawStartPoint.x &&
      point.x < drawStartPoint.x + DrawRange.x &&
      point.y >= drawStartPoint.y &&
      point.y < drawStartPoint.y + DrawRange.y
    ) {
      drawFallItems(con, item, drawStartPoint);
    }
  }
};

export function drawFallItems(
  con: any,
  item: IFallItem,
  drawStartPoint: IPoint
) {
  const type = item.item.types;
  if (type === ItemType.weapon) {
    drawItemImg.weapon(con, item.point, drawStartPoint);
  } else if (type === ItemType.shield) {
    drawItemImg.shield(con, item.point, drawStartPoint);
  } else if (type === ItemType.potion) {
    drawItemImg.potion(con, item.point, drawStartPoint);
  }
}

/* imgデータ定義 */

const weaponImg = new Image();
weaponImg.src = "./src/image/weapon32*32.png";
const shieldImg = new Image();
shieldImg.src = "./src/image/shield32*32.png";
const potionImg = new Image();
potionImg.src = "./src/image/potion32*32.png";

export module drawItemImg {
  const tipSize = 32;
  const ratio = 0.8;
  const size_x = TyleSize.x * ratio;
  const size_y = TyleSize.y * ratio;
  const fix = (TyleSize.x * (1 - ratio)) / 2;

  export function weapon(con: any, point: IPoint, drawStartPoint: IPoint) {
    con.drawImage(
      weaponImg,
      tipSize * 1,
      tipSize * 0,
      32,
      32,
      (point.x - drawStartPoint.x) * TyleSize.x + fix,
      (point.y - drawStartPoint.y) * TyleSize.y + fix,
      size_x,
      size_y
    );
  }

  export function shield(con: any, point: IPoint, drawStartPoint: IPoint) {
    con.drawImage(
      shieldImg,
      tipSize * 1,
      tipSize * 0,
      32,
      32,
      (point.x - drawStartPoint.x) * TyleSize.x + fix,
      (point.y - drawStartPoint.y) * TyleSize.y + fix,
      size_x,
      size_y
    );
  }

  export function potion(con: any, point: IPoint, drawStartPoint: IPoint) {
    con.drawImage(
      potionImg,
      tipSize * 14,
      tipSize * 0,
      32,
      32,
      (point.x - drawStartPoint.x) * TyleSize.x + fix,
      (point.y - drawStartPoint.y) * TyleSize.y + fix,
      size_x,
      size_y
    );
  }
}
