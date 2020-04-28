"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnemyList_1 = require("./EnemyList");
var Enemy_1 = require("./Enemy");
var State_1 = require("../State");
var Random_1 = require("../module/Random");
var PointMaker_1 = require("../module/PointMaker");
var config_1 = require("../config");
exports.default = (function (rooms) {
    var popEnemys = [];
    for (var i = 0; i < rooms.length; i++) {
        //部屋に湧く敵の数を決める
        var popCountLim = Random_1.Random.rangeInt(config_1.EnemyConf.popInitMin, config_1.EnemyConf.popInitMax);
        for (var j = 0; j < popCountLim; j++) {
            // ポップポイントをランダムで決める
            var popPoint = PointMaker_1.PointMaker.room(rooms[i]);
            //プレイヤーと同じ位置のポップを避ける
            var isNotOverlap = checkOverlappingPlayer(popPoint, {
                x: State_1.S.player.x,
                y: State_1.S.player.y,
            });
            //被っていなかったらモンスターの配列に入れる
            if (isNotOverlap) {
                var list = EnemyList_1.EnemyOnFloor[State_1.S.player.depth];
                //階層の出現リストからランダムに敵を選ぶ
                var randomNum = Random_1.Random.rangeInt(0, list.length);
                var EnemyId = list[randomNum];
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
