import { KeyCode } from "../key/KeyCode";
import { S } from "../State";
import { con, draw } from "../draw/Draw";
import Player from "../player/player";
import { CanStand, MapType, MessageType } from "../config";
import { Point, IFallItem, IState, IPoint } from "../Types";
import { battleEvent } from "../battle/battleEvents";
import doEnemyTurn from "../enemy/doEnemyTurn";
import getOffFloor from "./getOffFloor";
import { layerIn, layerOut, layer } from "../draw/LayerDraw";
import { actionMsg, TEXT } from "../text/text";
import { ItemConf } from "../config/item";
import { Npc } from "@root/npc/Npc";

export default () => {
  window.addEventListener("keydown", (e) => {
    if (S.Frag.gameover || !S.Frag.start || S.Frag.menu) {
      return;
    }
    let floor = S.floors[S.player.depth];
    e.preventDefault();
    if (
      e.keyCode === KeyCode.left ||
      e.keyCode === KeyCode.up ||
      e.keyCode === KeyCode.right ||
      e.keyCode === KeyCode.down
    ) {
      const movePlayer = new Player(S.player.x, S.player.y);
      // shiftを押している
      if (e.shiftKey) {
        if (S.KeyPress.left && S.KeyPress.up) {
          movePlayer.moveUpperLeft(floor);
        } else if (S.KeyPress.right && S.KeyPress.up) {
          movePlayer.moveUpperRight(floor);
        } else if (S.KeyPress.left && S.KeyPress.down) {
          movePlayer.moveDownnerLeft(floor);
        } else if (S.KeyPress.right && S.KeyPress.down) {
          movePlayer.moveDownnerRight(floor);
        } else {
          return;
        }
      }
      // shiftを押していない
      else {
        if (e.keyCode === KeyCode.left) {
          movePlayer.moveLeft();
        } else if (e.keyCode === KeyCode.up) {
          movePlayer.moveUp();
        } else if (e.keyCode === KeyCode.right) {
          movePlayer.moveRight(floor);
        } else if (e.keyCode === KeyCode.down) {
          movePlayer.moveDown(floor);
        }
      }
      // 現在の位置から移動していた場合
      if (movePlayer.x !== S.player.x || movePlayer.y !== S.player.y) {
        const movePoint: Point = { x: movePlayer.x, y: movePlayer.y };
        const npcs = S.npcs;
        const searchNpcResult = searchNpc(movePoint, npcs);
        /* 移動先にアイテムがあった場合 */
        const fallItems = S.fallItems;
        const searchItemResult = searchFallItem(movePoint, fallItems);
        if (searchItemResult) {
          if (S.bags.items.length === ItemConf.bagMax) {
            let cantPickMsg = { text: TEXT.bagFull, type: MessageType.normal };
            S.messages.add(cantPickMsg);
          } else {
            let pickResult = pickFallItem(S, searchItemResult);
            let pickFallItemMsg = {
              text: actionMsg.pickFallItem(searchItemResult.item.name),
              type: MessageType.normal,
            };
            S.bags = pickResult.bags;
            S.fallItems = pickResult.fallItems;

            S.messages.add(pickFallItemMsg);
          }
        }
        //移動先に敵がいた場合
        const enemys = S.enemys;
        const result = battleEvent.searchEnemy(movePoint, enemys);
        if (
          (result.enemy && result.index) ||
          (result.enemy && result.index === 0) //0はfalseを返すため場合分け
        ) {
          const targetEnemy = result.enemy;
          const enemyIndex = result.index;
          //ダメージ計算
          battleEvent.attackResult(targetEnemy);
          //敵のHPが0以下になった場合
          if (targetEnemy.HP <= 0) {
            battleEvent.defeatEnemy(enemys, targetEnemy, enemyIndex);
          }
          while (S.player.EXP >= S.player.requireEXP) {
            battleEvent.levelUp();
          }
        } else if (searchNpcResult) {
          /* 移動先にNPCがいた場合 */
          console.log(searchNpcResult);
          let npcMsg = speakNpc(S, searchNpcResult);
          S.messages.add(npcMsg);
        } else {
          /*何もイベントが起きなかった場合*/
          //移動予定のブロックを特定
          const targetBlock =
            S.floors[S.player.depth].blocks[movePoint.x][movePoint.y];
          //移動先が通過可能なブロックならプレイヤーの座標を更新
          if (CanStand[targetBlock.base]) {
            S.player.x = movePoint.x;
            S.player.y = movePoint.y;
          } else {
            draw(con, S.env);
          }
        }
      } else {
        return;
      }
    } else {
      return;
    }
    doEnemyTurn();
    if (S.Frag.gameover) {
      layerIn(layer, S.env);
    }
    draw(con, S.env);
  });

  window.addEventListener("keydown", async (e) => {
    e.preventDefault(); //スペースでのスクロールを防止
    if (e.keyCode === KeyCode.space) {
      const block = S.floors[S.player.depth].blocks[S.player.x][S.player.y];
      if (block.base === MapType.downstair) {
        getOffFloor();
        S.Frag.eyecatch = true;
      }
    } else {
      return;
    }
    await layerIn(layer, S.env);
    draw(con, S.env);
    await layerOut(layer, S.env);
  });
};

export function searchNpc(movePoint: IPoint, npcs: Npc[]) {
  for (let i = 0; i < npcs.length; i++) {
    let npc = npcs[i];
    let point = npc.point;
    if (point.x === movePoint.x && point.y === movePoint.y) {
      return npc;
    }
  }
}

export function speakNpc(S: IState, npc: Npc) {
  let msg = npc.spoken();
  return msg;
}

export function searchFallItem(movePoint: IPoint, fallItems: IFallItem[]) {
  for (let i = 0; i < fallItems.length; i++) {
    let fallItem = fallItems[i];
    let point = fallItem.point;
    if (point.x === movePoint.x && point.y === movePoint.y) {
      return fallItem;
    }
  }
}

export function pickFallItem(S: IState, fallItem: IFallItem) {
  S.bags.store(fallItem.item);
  S.fallItems = removeByIndex(S.fallItems, fallItem.index);
  return { bags: S.bags, fallItems: S.fallItems };
}

export function removeByIndex(items: IFallItem[], index: number) {
  items.some((v: IFallItem, i) => {
    if (v.index === index) items.splice(i, 1);
  });
  return items;
}
