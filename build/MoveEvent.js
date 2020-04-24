"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var KeyCode_1 = require("./KeyCode");
var State_1 = require("./State");
var Draw_1 = require("./Draw");
var player_1 = __importDefault(require("./player"));
var Map_1 = require("./Map");
var createField_1 = require("./createField");
var messages_1 = require("./messages");
var text_1 = require("./text");
var config_1 = require("./config");
var battleEvents_1 = require("./battle/battleEvents");
exports.default = (function () {
    window.addEventListener("keydown", function (e) {
        e.preventDefault();
        if (e.keyCode === KeyCode_1.KeyCode.left ||
            e.keyCode === KeyCode_1.KeyCode.up ||
            e.keyCode === KeyCode_1.KeyCode.right ||
            e.keyCode === KeyCode_1.KeyCode.down) {
            var movePlayer = new player_1.default(State_1.S.player.x, State_1.S.player.y);
            // shiftを押している
            if (e.shiftKey) {
                if (State_1.S.KeyPress.left && State_1.S.KeyPress.up) {
                    movePlayer.moveUpperLeft();
                }
                else if (State_1.S.KeyPress.right && State_1.S.KeyPress.up) {
                    movePlayer.moveUpperRight();
                }
                else if (State_1.S.KeyPress.left && State_1.S.KeyPress.down) {
                    movePlayer.moveDownnerLeft();
                }
                else if (State_1.S.KeyPress.right && State_1.S.KeyPress.down) {
                    movePlayer.moveDownnerRight();
                }
                else {
                    return;
                }
            }
            // shiftを押していない
            else {
                if (e.keyCode === KeyCode_1.KeyCode.left) {
                    movePlayer.moveLeft();
                }
                else if (e.keyCode === KeyCode_1.KeyCode.up) {
                    movePlayer.moveUp();
                }
                else if (e.keyCode === KeyCode_1.KeyCode.right) {
                    movePlayer.moveRight();
                }
                else if (e.keyCode === KeyCode_1.KeyCode.down) {
                    movePlayer.moveDown();
                }
            }
            // 現在の位置から移動していた場合
            if (movePlayer.x !== State_1.S.player.x || movePlayer.y !== State_1.S.player.y) {
                var movePoint = { x: movePlayer.x, y: movePlayer.y };
                //移動先に敵がいた場合
                var enemys = State_1.S.fields[State_1.S.player.depth].enemys;
                var result = battleEvents_1.battleEvent.searchEnemy(movePoint, enemys);
                if (result.enemy && result.index) {
                    var targetEnemy = result.enemy;
                    var enemyIndex = result.index;
                    //ダメージ計算
                    battleEvents_1.battleEvent.attackResult(targetEnemy);
                    //敵のHPが0以下になった場合
                    if (targetEnemy.HP <= 0) {
                        battleEvents_1.battleEvent.defeatEnemy(enemys, targetEnemy, enemyIndex);
                    }
                    while (State_1.S.player.EXP >= State_1.S.player.requireEXP) {
                        battleEvents_1.battleEvent.levelUp();
                    }
                }
                else {
                    //移動予定のブロックを特定
                    var targetBlock = State_1.S.fields[State_1.S.player.depth].blocks[movePoint.x][movePoint.y];
                    //移動先が通過可能なブロックならプレイヤーの座標を更新
                    if (config_1.CanStand[targetBlock.base]) {
                        State_1.S.player.x = movePoint.x;
                        State_1.S.player.y = movePoint.y;
                    }
                    else {
                        State_1.S.messages.add(new messages_1.Message(text_1.TEXT.wall, config_1.MessageType.normal));
                        Draw_1.draw(Draw_1.con, State_1.S.env);
                    }
                }
            }
            else {
                return;
            }
        }
        else {
            return;
        }
        Draw_1.draw(Draw_1.con, State_1.S.env);
    });
    window.addEventListener("keydown", function (e) {
        e.preventDefault(); //スペースでのスクロールを防止
        if (e.keyCode === KeyCode_1.KeyCode.space) {
            var block = State_1.S.fields[State_1.S.player.depth].blocks[State_1.S.player.x][State_1.S.player.y];
            if (block.base === Map_1.map.B_DOWNSTAIR) {
                State_1.S.player.stairDown();
                State_1.S.messages.add(new messages_1.Message(text_1.TEXT.downstair, config_1.MessageType.normal));
                if (!State_1.S.fields[State_1.S.player.depth]) {
                    State_1.S.fields[State_1.S.player.depth] = createField_1.createField(State_1.S.player.depth, [{ x: State_1.S.player.x, y: State_1.S.player.y }], State_1.S.seed);
                    //フィールドサイズを更新
                    State_1.S.fieldSize = State_1.S.fields[State_1.S.player.depth].size;
                }
            }
        }
        else {
            return;
        }
        Draw_1.draw(Draw_1.con, State_1.S.env);
    });
});
