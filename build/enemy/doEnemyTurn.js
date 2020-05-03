"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var State_1 = require("../State");
var calcDamage_1 = __importDefault(require("../battle/calcDamage"));
var messages_1 = require("../text/messages");
var text_1 = require("../text/text");
var config_1 = require("../config");
function default_1() {
    var enemys = State_1.S.enemys;
    var player = { x: State_1.S.player.x, y: State_1.S.player.y };
    var floor = State_1.S.floors[State_1.S.player.depth];
    console.log("\u30D7\u30EC\u30A4\u30E4\u30FC\u306E\u4F4D\u7F6E");
    console.log(player);
    for (var i = 0; i < enemys.length; i++) {
        var enemy = enemys[i];
        var viewArea = calcFieldOfView(enemy);
        console.log("\u7D22\u6575\u7BC4\u56F2");
        console.log(viewArea);
        //プレイヤーを探す
        var result = isPointInArea(player, viewArea);
        console.log("\u7D22\u6575\u7D50\u679C : " + result);
        console.log("移動前の敵の位置");
        console.log(enemy.point);
        // 視野内にプレイヤーを見つけた場合追尾する;
        if (result) {
            enemy = activeEnemy(enemy, enemys, player, floor);
            //攻撃の結果プレイヤーのHPがゼロになったらゲームオーバー
            if (State_1.S.player.HP <= 0) {
                defeatPlayer();
            }
        }
        else {
            enemy = nonActiveEnemy(enemy, enemys, player, floor);
        }
        console.log("移動後の敵の位置");
        console.log(enemy.point);
    }
}
exports.default = default_1;
function activeEnemy(enemy, enemys, player, floor) {
    /****** 攻撃判定 *******/
    //プレイヤーと隣接しているか？
    var isAdjacent = searchPlayer(enemy);
    //隣接していたら攻撃を行って処理終了
    if (isAdjacent) {
        attackPlayer(enemy);
        return enemy;
    }
    /****** 移動処理 *******/
    //Dはdirection
    var firstD = findNearDirection(player, enemy);
    var secondDs = findSecondNearDirection(firstD);
    var thirdDs = findThirdNearDirection(firstD);
    //チェックする方向の配列
    var tryDs = [
        firstD,
        secondDs.next,
        secondDs.previous,
        thirdDs.next,
        thirdDs.previous,
    ];
    //移動を試みる
    for (var i = 0; i < tryDs.length; i++) {
        console.log(i + "\u56DE\u76EE");
        var direction = tryDs[i];
        var moveTo_1 = movePoint(enemy, direction);
        var isCanStand = floor.isCanStand(moveTo_1);
        var isPointNoEnemy = moveToSearch(moveTo_1, enemys);
        var isPointNoPlayer = player.x !== moveTo_1.x || player.y !== moveTo_1.y;
        var moveCheck = isCanStand && isPointNoEnemy && isPointNoPlayer;
        console.log("moveCheck : " + moveCheck);
        if (moveCheck) {
            enemy.point = moveTo_1;
            break;
        }
    }
    return enemy;
}
exports.activeEnemy = activeEnemy;
// プレイヤーがいなかった場合のモンスターの行動
function nonActiveEnemy(enemy, enemys, player, floor) {
    var moveTo = randomMove(enemy);
    var isCanStand = floor.isCanStand(moveTo);
    var isPointNoEnemy = moveToSearch(moveTo, enemys);
    var isPointNoPlayer = player.x !== moveTo.x || player.y !== moveTo.y;
    var moveCheck = isCanStand && isPointNoEnemy && isPointNoPlayer;
    if (moveCheck) {
        enemy.point = moveTo;
        return enemy;
    }
    else {
        return enemy;
    }
}
exports.nonActiveEnemy = nonActiveEnemy;
function isEnemyInRoom(enemy, rooms) {
    var isInRoom = false;
    for (var i = 0; i < rooms.length; i++) {
        var room = rooms[i];
        var result = room.isInRoom(enemy.point);
        if (result) {
            isInRoom = true;
            break;
        }
    }
    return isInRoom;
}
exports.isEnemyInRoom = isEnemyInRoom;
//指定された座標にモンスターが存在するか判断、いたらtrueを返す
function moveToSearch(point, enemys) {
    var searchResult = true;
    for (var i = 0; i < enemys.length; i++) {
        if (enemys[i].point.x === point.x && enemys[i].point.y === point.y) {
            searchResult = false;
            break;
        }
    }
    return searchResult;
}
exports.moveToSearch = moveToSearch;
//ランダムでモンスターが移動する予定の座標を返す
function randomMove(enemy) {
    var direction = Math.floor(Math.random() * 8); //番号で移動方向を決める
    var moveTo = movePoint(enemy, direction);
    return moveTo;
}
exports.randomMove = randomMove;
function movePoint(enemy, direction) {
    var x = enemy.point.x;
    var y = enemy.point.y;
    var MoveTo;
    if (direction === config_1.Direction.left)
        x--;
    else if (direction === config_1.Direction.top)
        y--;
    else if (direction === config_1.Direction.right)
        x++;
    else if (direction === config_1.Direction.bottom)
        y++;
    else if (direction === config_1.Direction.topLeft) {
        x--;
        y--;
    }
    else if (direction === config_1.Direction.topRight) {
        x++;
        y--;
    }
    else if (direction === config_1.Direction.bottomLeft) {
        x--;
        y++;
    }
    else if (direction === config_1.Direction.bottomRight) {
        x++;
        y++;
    }
    MoveTo = { x: x, y: y };
    return MoveTo;
}
exports.movePoint = movePoint;
function findNearDirection(point, enemy) {
    var target = point;
    var self = enemy.point;
    var direction;
    //左上
    if (target.x < self.x && target.y < self.y)
        direction = config_1.Direction.topLeft;
    //真上
    else if (target.x === self.x && target.y < self.y)
        direction = config_1.Direction.top;
    //右上
    else if (target.x > self.x && target.y < self.y)
        direction = config_1.Direction.topRight;
    //右
    else if (target.x > self.x && target.y === self.y)
        direction = config_1.Direction.right;
    //右下
    else if (target.x > self.x && target.y > self.y)
        direction = config_1.Direction.bottomRight;
    //真下
    else if (target.x === self.x && target.y > self.y)
        direction = config_1.Direction.bottom;
    //左下
    else if (target.x < self.y && target.y > self.y)
        direction = config_1.Direction.bottomLeft;
    //左
    else
        direction = config_1.Direction.left;
    return direction;
}
exports.findNearDirection = findNearDirection;
function findSecondNearDirection(direction) {
    var next;
    var previous;
    if (direction === config_1.Direction.topLeft) {
        next = config_1.Direction.top;
        previous = --direction;
    }
    else if (direction === config_1.Direction.top) {
        next = ++direction;
        previous = config_1.Direction.topLeft;
    }
    else {
        next = ++direction;
        previous = --direction;
    }
    return { next: next, previous: previous };
}
exports.findSecondNearDirection = findSecondNearDirection;
function findThirdNearDirection(direction) {
    var next;
    var previous;
    if (direction === config_1.Direction.topLeft) {
        next = config_1.Direction.topRight;
        previous = direction - 2;
    }
    else if (direction === config_1.Direction.left) {
        next = config_1.Direction.top;
        previous = direction - 2;
    }
    else if (direction === config_1.Direction.top) {
        next = direction + 2;
        previous = config_1.Direction.left;
    }
    else if (direction === config_1.Direction.topRight) {
        next = direction + 2;
        previous = config_1.Direction.topLeft;
    }
    else {
        next = direction + 2;
        previous = direction - 2;
    }
    return { next: next, previous: previous };
}
exports.findThirdNearDirection = findThirdNearDirection;
//プレイヤーが倒された場合
function defeatPlayer() {
    State_1.S.player.HP = 0;
    State_1.S.Frag.gameover = true;
    var addMsg = new messages_1.Message(text_1.TEXT.die, config_1.MessageType.danger);
    State_1.S.messages.add(addMsg);
}
exports.defeatPlayer = defeatPlayer;
//モンスターがプレイヤーに攻撃する処理
function attackPlayer(enemy) {
    var damage = calcDamage_1.default(enemy.ATK, State_1.S.player.DEF);
    State_1.S.player.HP -= damage;
    State_1.S.messages.add(new messages_1.Message(text_1.actionMsg.beAttacked(enemy.name, damage), config_1.MessageType.normal));
}
exports.attackPlayer = attackPlayer;
function calcFieldOfView(enemy) {
    var view = config_1.EnemyConf.fieldOfView;
    var start = { x: enemy.point.x - view, y: enemy.point.y - view };
    var end = { x: enemy.point.x + view, y: enemy.point.y + view };
    var fieldOfView = { start: start, end: end };
    return fieldOfView;
}
exports.calcFieldOfView = calcFieldOfView;
function isPointInArea(point, area) {
    var isIn = false;
    if (point.x >= area.start.x &&
        point.x <= area.end.x &&
        point.y >= area.start.y &&
        point.y <= area.end.y) {
        isIn = true;
    }
    return isIn;
}
exports.isPointInArea = isPointInArea;
//モンスターの周辺にプレイヤーがいればtrueを返す
function searchPlayer(enemy) {
    //エネミーの座標取り出し
    var player = State_1.S.player;
    var self = enemy.point;
    //上下左右でプレイヤーを探す
    var left = player.x === self.x - 1 && player.y === self.y;
    var up = player.x === self.x && player.y === self.y - 1;
    var right = player.x === self.x + 1 && player.y === self.y;
    var down = player.x === self.x && player.y === self.y + 1;
    var upperLeft = player.x === self.x - 1 && player.y === self.y - 1;
    var upperRight = player.x === self.x + 1 && player.y === self.y - 1;
    var downLeft = player.x === self.x - 1 && player.y === self.y + 1;
    var downRight = player.x === self.x + 1 && player.y === self.y + 1;
    if (left ||
        up ||
        right ||
        down ||
        upperLeft ||
        upperRight ||
        downLeft ||
        downRight) {
        return true;
    }
    else {
        return false;
    }
}
exports.searchPlayer = searchPlayer;
//# sourceMappingURL=doEnemyTurn.js.map