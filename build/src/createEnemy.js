"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EnemyList_1 = require("./EnemyList");
var Enemy_1 = require("./Enemy");
var State_1 = require("./State");
exports.default = (function (rooms, random, upstairs) {
    var popEnemys = [];
    for (var i = 0; i < rooms.length; i++) {
        var num = random.num(3);
        for (var j = 0; j < num; j++) {
            var popPoint = {
                x: random.num(rooms[i].end.x - rooms[i].start.x + rooms[i].start.x),
                y: random.num(rooms[i].end.y - rooms[i].start.y + rooms[i].start.y),
            };
            var isUpstairsPoint = false;
            //プレイヤーが降りた位置のポップを避ける処理
            for (var k = 0; k < upstairs.length; k++) {
                if (popPoint.x === upstairs[k].x && popPoint.y === upstairs[k].y) {
                    isUpstairsPoint = false;
                    break;
                }
            }
            if (!isUpstairsPoint) {
                //レベルをランダムにあげる[最大値：階数*2+1 , 最小値：階数]
                var level = State_1.S.player.depth + random.num(State_1.S.player.depth) + random.num(2);
                var popNo = random.num(2);
                var popEnemy = new Enemy_1.Enemy(popPoint, EnemyList_1.EnemyList[popNo], level);
                popEnemys.push(popEnemy);
            }
        }
    }
    return popEnemys;
});
