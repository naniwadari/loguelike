import { S } from "../State";
import { DrawRange, TyleSize } from "../config";
import { Point } from "../Types";
import { EnemyId, Enemy } from "../enemy/Enemy";

const slimeImg = new Image();
slimeImg.src = "./src/image/character/slime.png";
const foxImg = new Image();
foxImg.src = "./src/image/character/fox.png";
const tvImg = new Image();
tvImg.src = "./src/image/character/tv.png";
export default (con: any, drawStartPoint: Point) => {
  con.textBaseline = "middle";
  con.textAlign = "center";
  const enemys: Enemy[] = S.enemys;
  for (let i = 0; i < enemys.length; i++) {
    if (
      enemys[i].point.x >= drawStartPoint.x &&
      enemys[i].point.x < drawStartPoint.x + DrawRange.x &&
      enemys[i].point.y >= drawStartPoint.y &&
      drawStartPoint.y + DrawRange.y
    ) {
      drawEnemy(con, enemys[i], drawStartPoint);
    }
  }
};

function drawEnemy(con: any, enemy: Enemy, drawStartPoint: Point) {
  const id = enemy.id;
  if (id === EnemyId.slime) {
    drawEnemyImg.slime(con, enemy.point, drawStartPoint);
  } else if (id === EnemyId.fox) {
    drawEnemyImg.fox(con, enemy.point, drawStartPoint);
  } else if (id === EnemyId.tv) {
    drawEnemyImg.tv(con, enemy.point, drawStartPoint);
  }
}

export module drawEnemyImg {
  export function slime(con: any, popPoint: Point, drawStartPoint: Point) {
    const ratio = 1;
    const size_x = TyleSize.x * ratio;
    const size_y = TyleSize.y * ratio;
    const fix = (TyleSize.x * (1 - ratio)) / 2;
    con.drawImage(
      slimeImg,
      0,
      0,
      32,
      32,
      (popPoint.x - drawStartPoint.x) * TyleSize.x + fix,
      (popPoint.y - drawStartPoint.y) * TyleSize.y + fix,
      size_x,
      size_y
    );
  }
  export function fox(con: any, popPoint: Point, drawStartPoint: Point) {
    const ratio = 1;
    const size_x = TyleSize.x * ratio;
    const size_y = TyleSize.y * ratio;
    const fix = (TyleSize.x * (1 - ratio)) / 2;
    con.drawImage(
      foxImg,
      0,
      0,
      32,
      32,
      (popPoint.x - drawStartPoint.x) * TyleSize.x + fix,
      (popPoint.y - drawStartPoint.y) * TyleSize.y + fix,
      size_x,
      size_y
    );
  }
  export function tv(con: any, popPoint: Point, drawStartPoint: Point) {
    const ratio = 1;
    const size_x = TyleSize.x * ratio;
    const size_y = TyleSize.y * ratio;
    const fix = (TyleSize.x * (1 - ratio)) / 2;
    con.drawImage(
      tvImg,
      0,
      0,
      32,
      32,
      (popPoint.x - drawStartPoint.x) * TyleSize.x + fix,
      (popPoint.y - drawStartPoint.y) * TyleSize.y + fix,
      size_x,
      size_y
    );
  }
}
