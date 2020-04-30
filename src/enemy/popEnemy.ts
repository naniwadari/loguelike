import { IPoint } from "../Types";
import { EnemyList, EnemyOnFloor } from "./EnemyList";
import { Enemy } from "./Enemy";
import { S } from "../State";
import { Random } from "../module/RandomNum";
import { EnemyConf } from "../config";
import { Floor } from "../floor/Floor";

export default (floor: Floor) => {
  let popEnemys: Enemy[] = [];
  for (let i = 0; i < floor.rooms.length; i++) {
    //部屋に湧く敵の数を決める
    let popCountLim = Random.rangeInt(
      EnemyConf.popInitMin,
      EnemyConf.popInitMax
    );
    for (let j = 0; j < popCountLim; j++) {
      // ポップポイントをランダムで決める
      const popPoint: IPoint = floor.coordinateCanStand();
      //プレイヤーと同じ位置のポップを避ける
      const isNotOverlap = checkOverlappingPlayer(popPoint, {
        x: S.player.x,
        y: S.player.y,
      });
      //被っていなかったらモンスターの配列に入れる
      if (isNotOverlap) {
        let list = EnemyOnFloor[S.player.depth];
        //まだリストができていなかった場合
        if (!list) {
          list = EnemyOnFloor[EnemyOnFloor.length - 1];
        }
        //階層の出現リストからランダムに敵を選ぶ
        const enemyNum = Random.rangeInt(0, list.length);
        const EnemyId = list[enemyNum];
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
