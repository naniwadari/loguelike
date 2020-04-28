"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EnemyList_1 = require("./EnemyList");
const Enemy_1 = require("./Enemy");
const State_1 = require("../State");
const RandomNum_1 = require("../module/RandomNum");
const PointMaker_1 = require("../module/PointMaker");
const config_1 = require("../config");
exports.default = (rooms) => {
    let popEnemys = [];
    for (let i = 0; i < rooms.length; i++) {
        //部屋に湧く敵の数を決める
        let popCountLim = RandomNum_1.Random.rangeInt(config_1.EnemyConf.popInitMin, config_1.EnemyConf.popInitMax);
        for (let j = 0; j < popCountLim; j++) {
            // ポップポイントをランダムで決める
            const popPoint = PointMaker_1.PointMaker.room(rooms[i]);
            //プレイヤーと同じ位置のポップを避ける
            const isNotOverlap = checkOverlappingPlayer(popPoint, {
                x: State_1.S.player.x,
                y: State_1.S.player.y,
            });
            //被っていなかったらモンスターの配列に入れる
            if (isNotOverlap) {
                const list = EnemyList_1.EnemyOnFloor[State_1.S.player.depth];
                //階層の出現リストからランダムに敵を選ぶ
                const randomNum = RandomNum_1.Random.rangeInt(0, list.length);
                const EnemyId = list[randomNum];
                const material = EnemyList_1.EnemyList[EnemyId];
                const popEnemy = new Enemy_1.Enemy(popPoint, material);
                popEnemys.push(popEnemy);
            }
        }
    }
    return popEnemys;
};
//プレイヤーと同じ位置での発生を避ける
function checkOverlappingPlayer(enemyPoint, playerPoint) {
    if (enemyPoint.x === playerPoint.x && enemyPoint.y === playerPoint.y) {
        return false;
    }
    return true;
}
