import { S } from "../State";
import { Enemy } from "../enemy/Enemy";
import calcDamage from "../battle/calcDamage";
import { Message } from "../text/messages";
import { actionMsg, TEXT } from "../text/text";
import { MessageType, CanStand } from "../config";
import { Point } from "../Types";

export default function () {
  const enemys = S.enemys;
  for (let i = 0; i < enemys.length; i++) {
    const enemy = enemys[i];
    //プレイヤーを探す
    const searchResult = searchPlayer(enemy);
    //プレイヤーがいた場合攻撃を行う
    if (searchResult) {
      attackPlayer(enemy);
    }
    //攻撃の結果プレイヤーのHPがゼロになったらゲームオーバー
    if (S.player.HP <= 0) {
      defeatPlayer();
    }
    //プレイヤーがいなかった場合移動を試みる
    const movePoint = randomMoveEnemy(enemy);
    //移動予定のブロック情報
    const block = S.floors[S.player.depth].blocks[movePoint.x][movePoint.y];
    const isPointUsing = movePointSearch(movePoint, enemys);
    //移動先に誰もいなければEnemyの位置情報を更新
    if (
      CanStand[block.base] &&
      !isPointUsing &&
      (S.player.x !== movePoint.x || S.player.y !== movePoint.y)
    ) {
      enemy.point = { x: movePoint.x, y: movePoint.y };
    }
  }
}

//指定された座標にモンスターが存在するか判断、いたらtrueを返す
function movePointSearch(point: Point, enemys: Enemy[]) {
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
function randomMoveEnemy(enemy: Enemy) {
  const direction = Math.floor(Math.random() * 8); //番号で移動方向を決める
  let x = enemy.point.x;
  let y = enemy.point.y;
  if (direction === 0) {
    x--;
  } else if (direction === 1) {
    y--;
  } else if (direction === 2) {
    x++;
  } else if (direction === 3) {
    y++;
  } else if (direction === 4) {
    x--;
    y--;
  } else if (direction === 5) {
    x++;
    y--;
  } else if (direction === 6) {
    x--;
    y++;
  } else if (direction === 7) {
    x++;
    y++;
  }
  //座標が許可される範囲なら更新する
  if (x > 0 && x < S.fieldSize.x && y > 0 && y < S.fieldSize.y) {
    const movePoint = { x: x, y: y };
    return movePoint;
  } else {
    return enemy.point;
  }
}

//プレイヤーが倒された場合
function defeatPlayer() {
  S.player.HP = 0;
  S.Frag.gameover = true;
  const addMsg = new Message(TEXT.die, MessageType.danger);
  S.messages.add(addMsg);
}

//モンスターがプレイヤーに攻撃する処理
function attackPlayer(enemy: Enemy) {
  const damage = calcDamage(enemy.ATK, S.player.DEF);
  S.player.HP -= damage;
  S.messages.add(
    new Message(actionMsg.beAttacked(enemy.name, damage), MessageType.normal)
  );
}

//モンスターの周辺にプレイヤーがいればtrueを返す
function searchPlayer(enemy: Enemy) {
  //エネミーの座標取り出し
  const player = S.player;
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
  if (
    left ||
    up ||
    right ||
    down ||
    upperLeft ||
    upperRight ||
    downLeft ||
    downRight
  ) {
    return true;
  } else {
    return false;
  }
}
