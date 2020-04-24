import { S } from "../State";
import calcDamage from "./calcDamage";
import { Message } from "../messages";
import { actionMsg } from "../text";
import { MessageType } from "../config";
import { Point } from "../Types";
import { Enemy } from "../Enemy";

interface searchResult {
  enemy: Enemy | undefined;
  index: number | undefined;
}

export module battleEvent {
  export function searchEnemy(point: Point, enemys: Enemy[]) {
    let targetEnemy = undefined;
    let enemyIndex = 0;
    for (let i = 0; i < enemys.length; i++) {
      if (enemys[i].point.x === point.x && enemys[i].point.y === point.y) {
        targetEnemy = enemys[i];
        enemyIndex = i;
        const result: searchResult = { enemy: targetEnemy, index: enemyIndex };
        return result;
      }
    }
    const result: searchResult = { enemy: undefined, index: undefined };
    return result;
  }

  export function attackResult(enemy: Enemy) {
    let damage: number = calcDamage(S.player.ATK, enemy.DEF);
    enemy.HP -= damage;
    S.messages.add(
      new Message(actionMsg.attack(enemy.name, damage), MessageType.normal)
    );
  }

  export function defeatEnemy(enemys: Enemy[], enemy: Enemy, index: number) {
    enemys.splice(index, 1);
    S.player.EXP += enemy.EXP;
    S.messages.add(
      new Message(actionMsg.kill(enemy.name, enemy.EXP), MessageType.normal)
    );
  }

  export function levelUp() {
    S.player.level++;
    S.player.baseHP = Math.ceil(S.player.baseHP * 1.2);
    S.player.baseATK = Math.ceil(S.player.baseATK * 1.1);
    S.player.baseDEF = Math.ceil(S.player.baseDEF * 1.1);
    S.player.HP = S.player.totalHP;
    S.player.ATK = S.player.totalATK;
    S.player.DEF = S.player.totalDEF;
    S.player.requireEXP = Math.ceil(S.player.requireEXP * 2.4);
    S.messages.add(
      new Message(actionMsg.levelUp(S.player.level), MessageType.special)
    );
  }
}
