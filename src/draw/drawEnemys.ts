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
const underlegImg = new Image();
underlegImg.src = "./src/image/character/underleg.png";
const hayasainuImg = new Image();
hayasainuImg.src = "./src/image/character/hayasainu.png";
const zawatsukiImg = new Image();
zawatsukiImg.src = "./src/image/character/zawatuki.png";

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
  } else if (id === EnemyId.underleg) {
    drawEnemyImg.underleg(con, enemy.point, drawStartPoint);
  } else if (id === EnemyId.hayasainu) {
    drawEnemyImg.hayasainu(con, enemy.point, drawStartPoint);
  } else if (id === EnemyId.zawatsuki) {
    drawEnemyImg.zawatsuki(con, enemy.point, drawStartPoint);
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
      64,
      64,
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
      64,
      64,
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
      64,
      64,
      (popPoint.x - drawStartPoint.x) * TyleSize.x + fix,
      (popPoint.y - drawStartPoint.y) * TyleSize.y + fix,
      size_x,
      size_y
    );
  }
  export function underleg(con: any, popPoint: Point, drawStartPoint: Point) {
    const ratio = 1;
    const size_x = TyleSize.x * ratio;
    const size_y = TyleSize.y * ratio;
    const fix = (TyleSize.x * (1 - ratio)) / 2;
    con.drawImage(
      underlegImg,
      0,
      0,
      64,
      64,
      (popPoint.x - drawStartPoint.x) * TyleSize.x + fix,
      (popPoint.y - drawStartPoint.y) * TyleSize.y + fix,
      size_x,
      size_y
    );
  }
  export function hayasainu(con: any, popPoint: Point, drawStartPoint: Point) {
    const ratio = 1;
    const size_x = TyleSize.x * ratio;
    const size_y = TyleSize.y * ratio;
    const fix = (TyleSize.x * (1 - ratio)) / 2;
    con.drawImage(
      hayasainuImg,
      0,
      0,
      64,
      64,
      (popPoint.x - drawStartPoint.x) * TyleSize.x + fix,
      (popPoint.y - drawStartPoint.y) * TyleSize.y + fix,
      size_x,
      size_y
    );
  }
  export function zawatsuki(con: any, popPoint: Point, drawStartPoint: Point) {
    const ratio = 1;
    const size_x = TyleSize.x * ratio;
    const size_y = TyleSize.y * ratio;
    const fix = (TyleSize.x * (1 - ratio)) / 2;
    con.drawImage(
      zawatsukiImg,
      0,
      0,
      64,
      64,
      (popPoint.x - drawStartPoint.x) * TyleSize.x + fix,
      (popPoint.y - drawStartPoint.y) * TyleSize.y + fix,
      size_x,
      size_y
    );
  }
}
