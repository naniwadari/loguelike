import { Random } from "./Random";
import { IRoom } from "./splitRoom";
import { Point } from "./Types";
import { EnemyList } from "./EnemyList";
import { Enemy } from "./Enemy";
import { S } from "./State";

export default (rooms: IRoom[], random: Random, upstairs: any) => {
  let popEnemys: Enemy[] = [];
  for (let i = 0; i < rooms.length; i++) {
    let num = random.num(3);
    for (let j = 0; j < num; j++) {
      // スポーンポイントをランダムで決める
      const popPoint: Point = {
        x: random.num(rooms[i].end.x - rooms[i].start.x) + rooms[i].start.x,
        y: random.num(rooms[i].end.y - rooms[i].start.y) + rooms[i].start.y,
      };
      let isUpstairsPoint = false;
      //プレイヤーが降りた位置のポップを避ける
      for (let k = 0; k < upstairs.length; k++) {
        if (popPoint.x === upstairs[k].x && popPoint.y === upstairs[k].y) {
          isUpstairsPoint = true;
          break;
        }
      }
      if (!isUpstairsPoint) {
        //レベルをランダムにあげる[最大値：階数*2+1 , 最小値：階数]
        const level =
          S.player.depth + random.num(S.player.depth) + random.num(2);
        const popNo = random.num(2);
        const popEnemy = new Enemy(popPoint, EnemyList[popNo], level);
        popEnemys.push(popEnemy);
      }
    }
  }
  return popEnemys;
};
