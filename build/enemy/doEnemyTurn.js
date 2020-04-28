"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const State_1 = require("../State");
const calcDamage_1 = __importDefault(require("../battle/calcDamage"));
const messages_1 = require("../text/messages");
const text_1 = require("../text/text");
const config_1 = require("../config");
function default_1() {
    const enemys = State_1.S.fields[State_1.S.player.depth].enemys;
    for (let i = 0; i < enemys.length; i++) {
        const enemy = enemys[i];
        //プレイヤーを探す
        const searchResult = searchPlayer(enemy);
        //プレイヤーがいた場合攻撃を行う
        if (searchResult) {
            attackPlayer(enemy);
        }
        //攻撃の結果プレイヤーのHPがゼロになったらゲームオーバー
        if (State_1.S.player.HP <= 0) {
            defeatPlayer();
        }
        //プレイヤーがいなかった場合移動を試みる
        const movePoint = randomMoveEnemy(enemy);
        //移動予定のブロック情報
        const block = State_1.S.fields[State_1.S.player.depth].blocks[movePoint.x][movePoint.y];
        const isPointUsing = movePointSearch(movePoint, enemys);
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
    let searchResult = false;
    for (let i = 0; i < enemys.length; i++) {
        if (enemys[i].point.x === point.x && enemys[i].point.y === point.y) {
            searchResult = true;
            break;
        }
    }
    return searchResult;
}
//モンスターが移動する予定の座標を返す
function randomMoveEnemy(enemy) {
    const direction = Math.floor(Math.random() * 8); //番号で移動方向を決める
    let x = enemy.point.x;
    let y = enemy.point.y;
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
        const movePoint = { x: x, y: y };
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
    const addMsg = new messages_1.Message(text_1.TEXT.die, config_1.MessageType.danger);
    State_1.S.messages.add(addMsg);
}
//モンスターがプレイヤーに攻撃する処理
function attackPlayer(enemy) {
    const damage = calcDamage_1.default(enemy.ATK, State_1.S.player.DEF);
    State_1.S.player.HP -= damage;
    State_1.S.messages.add(new messages_1.Message(text_1.actionMsg.beAttacked(enemy.name, damage), config_1.MessageType.normal));
}
//モンスターの周辺にプレイヤーがいればtrueを返す
function searchPlayer(enemy) {
    //エネミーの座標取り出し
    const player = State_1.S.player;
    const self = enemy.point;
    //上下左右でプレイヤーを探す
    const left = player.x === self.x - 1 && player.y === self.y;
    const up = player.x === self.x && player.y === self.y - 1;
    const right = player.x === self.x + 1 && player.y === self.y;
    const down = player.x === self.x && player.y === self.y + 1;
    const upperLeft = player.x === self.x - 1 && player.y === self.y - 1;
    const upperRight = player.x === self.x + 1 && player.y === self.y - 1;
    const downLeft = player.x === self.x - 1 && player.y === self.y + 1;
    const downRight = player.x === self.x + 1 && player.y === self.y + 1;
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
