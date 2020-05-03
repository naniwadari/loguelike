"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnemyList_1 = require("./EnemyList");
var Enemy_1 = require("./Enemy");
var State_1 = require("../State");
var RandomNum_1 = require("../module/RandomNum");
var config_1 = require("../config");
exports.default = (function (floor) {
    var popEnemys = [];
    for (var i = 0; i < floor.rooms.length; i++) {
        //部屋に湧く敵の数を決める
        var popCountLim = RandomNum_1.Random.rangeInt(config_1.EnemyConf.popInitMin, config_1.EnemyConf.popInitMax);
        for (var j = 0; j < popCountLim; j++) {
            // ポップポイントをランダムで決める
            var popPoint = floor.coordinateCanStand();
            //プレイヤーと同じ位置のポップを避ける
            var isNotOverlap = checkOverlappingPlayer(popPoint, {
                x: State_1.S.player.x,
                y: State_1.S.player.y,
            });
            //被っていなかったらモンスターの配列に入れる
            if (isNotOverlap) {
                var list = EnemyList_1.EnemyOnFloor[State_1.S.player.depth];
                //まだリストができていなかった場合
                if (!list) {
                    list = EnemyList_1.EnemyOnFloor[EnemyList_1.EnemyOnFloor.length - 1];
                }
                //階層の出現リストからランダムに敵を選ぶ
                var enemyNum = RandomNum_1.Random.rangeInt(0, list.length);
                var EnemyId = list[enemyNum];
                var material = EnemyList_1.EnemyList[EnemyId];
                var popEnemy = new Enemy_1.Enemy(popPoint, material);
                popEnemys.push(popEnemy);
            }
        }
    }
    return popEnemys;
});
//プレイヤーと同じ位置での発生を避ける
function checkOverlappingPlayer(enemyPoint, playerPoint) {
    if (enemyPoint.x === playerPoint.x && enemyPoint.y === playerPoint.y) {
        return false;
    }
    return true;
}
//# sourceMappingURL=popEnemy.js.map