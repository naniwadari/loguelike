"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var State_1 = require("./State");
var calcDamage_1 = __importDefault(require("./battle/calcDamage"));
var messages_1 = require("./messages");
var text_1 = require("./text");
var config_1 = require("./config");
function default_1() {
    var enemys = State_1.S.fields[State_1.S.player.depth].enemys;
    for (var i = 0; i < enemys.length; i++) {
        var enemy = enemys[i];
        //プレイヤーを探す
        var searchResult = searchPlayer(enemy);
        //プレイヤーがいた場合攻撃を行う
        if (searchResult) {
            attackPlayer(enemy);
        }
        //攻撃の結果プレイヤーのHPがゼロになったらゲームオーバー
        if (State_1.S.player.HP <= 0) {
            defeatPlayer();
        }
        //プレイヤーがいなかった場合移動を試みる
        var movePoint = randomMoveEnemy(enemy);
        //移動予定のブロック情報
        var block = State_1.S.fields[State_1.S.player.depth].blocks[movePoint.x][movePoint.y];
        var isPointUsing = movePointSearch(movePoint, enemys);
        //移動先に誰もいなければEnemyの位置情報を更新
        if (config_1.CanStand[block.base] &&
            !isPointUsing &&
            (State_1.S.player.x !== movePoint.x || State_1.S.player.y !== movePoint.y)) {
            enemy.point = { x: movePoint.x, y: movePoint.y };
        }
    }
}
exports.default = default_1;
//指定された座標にモンスターが存在するか判断、いたらtrueを返す
function movePointSearch(point, enemys) {
    var searchResult = false;
    for (var i = 0; i < enemys.length; i++) {
        if (enemys[i].point.x === point.x && enemys[i].point.y === point.y) {
            searchResult = true;
            break;
        }
    }
    return searchResult;
}
//モンスターが移動する予定の座標を返す
function randomMoveEnemy(enemy) {
    var direction = Math.floor(Math.random() * 8); //番号で移動方向を決める
    var x = enemy.point.x;
    var y = enemy.point.y;
    if (direction === 0) {
        x--;
    }
    else if (direction === 1) {
        y--;
    }
    else if (direction === 2) {
        x++;
    }
    else if (direction === 3) {
        y++;
    }
    else if (direction === 4) {
        x--;
        y--;
    }
    else if (direction === 5) {
        x++;
        y--;
    }
    else if (direction === 6) {
        x--;
        y++;
    }
    else if (direction === 7) {
        x++;
        y++;
    }
    //座標が許可される範囲なら更新する
    if (x > 0 && x < State_1.S.fieldSize.x && y > 0 && y < State_1.S.fieldSize.y) {
        var movePoint = { x: x, y: y };
        return movePoint;
    }
    else {
        return enemy.point;
    }
}
//プレイヤーが倒された場合
function defeatPlayer() {
    State_1.S.player.HP = 0;
    State_1.S.Frag.gameover = true;
    var addMsg = new messages_1.Message(text_1.TEXT.die, config_1.MessageType.danger);
    State_1.S.messages.add(addMsg);
}
//モンスターがプレイヤーに攻撃する処理
function attackPlayer(enemy) {
    var damage = calcDamage_1.default(enemy.ATK, State_1.S.player.DEF);
    State_1.S.player.HP -= damage;
    State_1.S.messages.add(new messages_1.Message(text_1.actionMsg.beAttacked(enemy.name, damage), config_1.MessageType.normal));
}
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
