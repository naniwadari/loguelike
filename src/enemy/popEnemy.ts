import { IRoom, IPoint } from "../dangeon/createFloor";
import { EnemyList, EnemyOnFloor } from "./EnemyList";
import { Enemy } from "./Enemy";
import { S } from "../State";
import { random } from "../module/random";
import { EnemyConf } from "../config";

export default (rooms: IRoom[]) => {
  let popEnemys: Enemy[] = [];
  for (let i = 0; i < rooms.length; i++) {
    //部屋に湧く敵の数を決める
    let popCountLim = random.rangeInt(
      EnemyConf.popInitMin,
      EnemyConf.popInitMax
    );
    for (let j = 0; j < popCountLim; j++) {
      // ポップポイントをランダムで決める
      const popPoint: IPoint = popPointMaker(rooms[i]);
      //プレイヤーと同じ位置のポップを避ける
      const isNotOverlap = checkOverlappingPlayer(popPoint, {
        x: S.player.x,
        y: S.player.y,
      });
      //被っていなかったらモンスターの配列に入れる
      if (isNotOverlap) {
        const list = EnemyOnFloor[S.player.depth];
        //階層の出現リストからランダムに敵を選ぶ
        const randomNum = random.rangeInt(0, list.length);
        const EnemyId = list[randomNum];
        const material = EnemyList[EnemyId];
        const popEnemy = new Enemy(popPoint, material);
        popEnemys.push(popEnemy);
      }
    }
  }
  return popEnemys;
};

//プレイヤーと同じ位置での発生を避ける
function checkOverlappingPlayer(enemyPoint: IPoint, playerPoint: IPoint) {
  if (enemyPoint.x === playerPoint.x && enemyPoint.y === playerPoint.y) {
    return false;
  }
  return true;
}

//ポップする場所を選ぶ
function popPointMaker(room: IRoom): IPoint {
  const x_min = room.point.x;
  const x_max = room.point.x + room.size.width - 1;
  const y_min = room.point.y;
  const y_max = room.point.y + room.size.height - 1;
  const x_popPoint = random.rangeInt(x_min, x_max);
  const y_popPoint = random.rangeInt(y_min, y_max);
  return { x: x_popPoint, y: y_popPoint };
}
