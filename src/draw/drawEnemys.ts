import { S } from "../State";
import { DrawRange, TyleSize } from "../config";
import { Point } from "../Types";
import { EnemyId, Enemy } from "../enemy/Enemy";

const blackballImg = new Image();
blackballImg.src = "./src/image/blackball.png";

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
  } else if (id === EnemyId.rat) {
    drawEnemyImg.rat(con, enemy.point, drawStartPoint);
  }
}

export module drawEnemyImg {
  export function slime(con: any, popPoint: Point, drawStartPoint: Point) {
    // con.fillStyle = "blue";
    // con.font = "16px consolas";
    con.drawImage(
      blackballImg,
      0,
      32,
      32,
      popPoint.x * TyleSize.x,
      popPoint.y * TyleSize.y,
      TyleSize.x,
      TyleSize.y
    );
    // con.fillText(
    //   "●",
    //   (popPoint.x - drawStartPoint.x) * TyleSize.x + TyleSize.x / 2,
    //   (popPoint.y - drawStartPoint.y) * TyleSize.y + TyleSize.y / 2
    // );
  }
  export function rat(con: any, popPoint: Point, drawStartPoint: Point) {
    con.fillStyle = "blown";
    con.font = "16px consolas";
    con.fillText(
      "R",
      (popPoint.x - drawStartPoint.x) * TyleSize.x + TyleSize.x / 2,
      (popPoint.y - drawStartPoint.y) * TyleSize.y + TyleSize.y / 2
    );
  }
}
