"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var State_1 = require("../State");
var calcDamage_1 = __importDefault(require("./calcDamage"));
var messages_1 = require("../text/messages");
var text_1 = require("../text/text");
var config_1 = require("../config");
var battleEvent;
(function (battleEvent) {
    function searchEnemy(point, enemys) {
        var targetEnemy = undefined;
        var enemyIndex = 0;
        for (var i = 0; i < enemys.length; i++) {
            if (enemys[i].point.x === point.x && enemys[i].point.y === point.y) {
                targetEnemy = enemys[i];
                enemyIndex = i;
                var result_1 = { enemy: targetEnemy, index: enemyIndex };
                return result_1;
            }
        }
        var result = { enemy: undefined, index: undefined };
        return result;
    }
    battleEvent.searchEnemy = searchEnemy;
    function attackResult(enemy) {
        var damage = calcDamage_1.default(State_1.S.player.ATK, enemy.DEF);
        enemy.HP -= damage;
        State_1.S.messages.add(new messages_1.Message(text_1.actionMsg.attack(enemy.name, damage), config_1.MessageType.normal));
    }
    battleEvent.attackResult = attackResult;
    function defeatEnemy(enemys, enemy, index) {
        enemys.splice(index, 1);
        State_1.S.player.EXP += enemy.EXP;
        State_1.S.messages.add(new messages_1.Message(text_1.actionMsg.kill(enemy.name, enemy.EXP), config_1.MessageType.normal));
    }
    battleEvent.defeatEnemy = defeatEnemy;
    function levelUp() {
        State_1.S.player.level++;
        State_1.S.player.baseHP = Math.ceil(State_1.S.player.baseHP * 1.2);
        State_1.S.player.baseATK = Math.ceil(State_1.S.player.baseATK * 1.1);
        State_1.S.player.baseDEF = Math.ceil(State_1.S.player.baseDEF * 1.1);
        State_1.S.player.HP = State_1.S.player.totalHP;
        State_1.S.player.ATK = State_1.S.player.totalATK;
        State_1.S.player.DEF = State_1.S.player.totalDEF;
        State_1.S.player.requireEXP = Math.ceil(State_1.S.player.requireEXP * 2.4);
        State_1.S.messages.add(new messages_1.Message(text_1.actionMsg.levelUp(State_1.S.player.level), config_1.MessageType.special));
    }
    battleEvent.levelUp = levelUp;
})(battleEvent = exports.battleEvent || (exports.battleEvent = {}));
