import { S } from "../State";
import { Enemy } from "../enemy/Enemy";
import calcDamage from "../battle/calcDamage";
import { Message } from "../text/messages";
import { actionMsg, TEXT } from "../text/text";
import { MessageType, EnemyConf, Direction } from "../config";
import { Point, IPoint, IArea } from "../Types";
import { Floor } from "../floor/Floor";
import Room from "../floor/Room";
import { layerIn, layer } from "../draw/LayerDraw";

export default function () {
  const enemys = S.enemys;
  const player = { x: S.player.x, y: S.player.y };
  const floor = S.floors[S.player.depth];
  console.log(`プレイヤーの位置`);

  console.log(player);
  for (let i = 0; i < enemys.length; i++) {
    let enemy = enemys[i];
    const viewArea = calcFieldOfView(enemy);
    console.log(`索敵範囲`);
    console.log(viewArea);
    //プレイヤーを探す
    const result = isPointInArea(player, viewArea);
    console.log(`索敵結果 : ${result}`);
    console.log("移動前の敵の位置");
    console.log(enemy.point);
    // 視野内にプレイヤーを見つけた場合追尾する;
    if (result) {
      enemy = activeEnemy(enemy, enemys, player, floor);
      //攻撃の結果プレイヤーのHPがゼロになったらゲームオーバー
      if (S.player.HP <= 0) {
        defeatPlayer();
      }
    } else {
      enemy = nonActiveEnemy(enemy, enemys, player, floor);
    }
    console.log("移動後の敵の位置");
    console.log(enemy.point);
  }
}

export function activeEnemy(
  enemy: Enemy,
  enemys: Enemy[],
  player: IPoint,
  floor: Floor
) {
  /****** 攻撃判定 *******/
  //プレイヤーと隣接しているか？
  let isAdjacent = searchPlayer(enemy);
  //隣接していたら攻撃を行って処理終了
  if (isAdjacent) {
    attackPlayer(enemy);
    return enemy;
  }

  /****** 移動処理 *******/
  //Dはdirection
  const firstD = findNearDirection(player, enemy);
  const secondDs = findSecondNearDirection(firstD);
  const thirdDs = findThirdNearDirection(firstD);
  //チェックする方向の配列
  const tryDs: Direction[] = [
    firstD,
    secondDs.next,
    secondDs.previous,
    thirdDs.next,
    thirdDs.previous,
  ];
  //移動を試みる
  for (let i = 0; i < tryDs.length; i++) {
    console.log(`${i}回目`);
    let direction = tryDs[i];
    let moveTo = movePoint(enemy, direction);
    let isCanStand = floor.isCanStand(moveTo);
    let isPointNoEnemy = moveToSearch(moveTo, enemys);
    let isPointNoPlayer = player.x !== moveTo.x || player.y !== moveTo.y;
    let moveCheck = isCanStand && isPointNoEnemy && isPointNoPlayer;
    console.log(`moveCheck : ${moveCheck}`);
    if (moveCheck) {
      enemy.point = moveTo;
      break;
    }
  }
  return enemy;
}

// プレイヤーがいなかった場合のモンスターの行動
export function nonActiveEnemy(
  enemy: Enemy,
  enemys: Enemy[],
  player: IPoint,
  floor: Floor
) {
  const moveTo = randomMove(enemy);
  const isCanStand = floor.isCanStand(moveTo);
  const isPointNoEnemy = moveToSearch(moveTo, enemys);
  const isPointNoPlayer = player.x !== moveTo.x || player.y !== moveTo.y;
  const moveCheck = isCanStand && isPointNoEnemy && isPointNoPlayer;
  if (moveCheck) {
    enemy.point = moveTo;
    return enemy;
  } else {
    return enemy;
  }
}

export function isEnemyInRoom(enemy: Enemy, rooms: Room[]) {
  let isInRoom = false;
  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    const result = room.isInRoom(enemy.point);
    if (result) {
      isInRoom = true;
      break;
    }
  }
  return isInRoom;
}
//指定された座標にモンスターが存在するか判断、いたらtrueを返す
export function moveToSearch(point: Point, enemys: Enemy[]) {
  let searchResult = true;
  for (let i = 0; i < enemys.length; i++) {
    if (enemys[i].point.x === point.x && enemys[i].point.y === point.y) {
      searchResult = false;
      break;
    }
  }
  return searchResult;
}

//ランダムでモンスターが移動する予定の座標を返す
export function randomMove(enemy: Enemy) {
  const direction: Direction = Math.floor(Math.random() * 8); //番号で移動方向を決める
  const moveTo = movePoint(enemy, direction);
  return moveTo;
}

export function movePoint(enemy: Enemy, direction: Direction) {
  let x = enemy.point.x;
  let y = enemy.point.y;
  let MoveTo: IPoint;
  if (direction === Direction.left) x--;
  else if (direction === Direction.top) y--;
  else if (direction === Direction.right) x++;
  else if (direction === Direction.bottom) y++;
  else if (direction === Direction.topLeft) {
    x--;
    y--;
  } else if (direction === Direction.topRight) {
    x++;
    y--;
  } else if (direction === Direction.bottomLeft) {
    x--;
    y++;
  } else if (direction === Direction.bottomRight) {
    x++;
    y++;
  }
  MoveTo = { x: x, y: y };
  return MoveTo;
}

export function findNearDirection(point: IPoint, enemy: Enemy) {
  const target = point;
  const self = enemy.point;
  let direction: Direction;
  //左上
  if (target.x < self.x && target.y < self.y) direction = Direction.topLeft;
  //真上
  else if (target.x === self.x && target.y < self.y) direction = Direction.top;
  //右上
  else if (target.x > self.x && target.y < self.y)
    direction = Direction.topRight;
  //右
  else if (target.x > self.x && target.y === self.y)
    direction = Direction.right;
  //右下
  else if (target.x > self.x && target.y > self.y)
    direction = Direction.bottomRight;
  //真下
  else if (target.x === self.x && target.y > self.y)
    direction = Direction.bottom;
  //左下
  else if (target.x < self.y && target.y > self.y)
    direction = Direction.bottomLeft;
  //左
  else direction = Direction.left;

  return direction;
}

export function findSecondNearDirection(direction: Direction) {
  let next: Direction;
  let previous: Direction;
  if (direction === Direction.topLeft) {
    next = Direction.top;
    previous = --direction;
  } else if (direction === Direction.top) {
    next = ++direction;
    previous = Direction.topLeft;
  } else {
    next = ++direction;
    previous = --direction;
  }
  return { next: next, previous: previous };
}

export function findThirdNearDirection(direction: Direction) {
  let next: Direction;
  let previous: Direction;
  if (direction === Direction.topLeft) {
    next = Direction.topRight;
    previous = direction - 2;
  } else if (direction === Direction.left) {
    next = Direction.top;
    previous = direction - 2;
  } else if (direction === Direction.top) {
    next = direction + 2;
    previous = Direction.left;
  } else if (direction === Direction.topRight) {
    next = direction + 2;
    previous = Direction.topLeft;
  } else {
    next = direction + 2;
    previous = direction - 2;
  }
  return { next: next, previous: previous };
}

//プレイヤーが倒された場合
export function defeatPlayer() {
  S.player.HP = 0;
  S.Frag.gameover = true;
  const addMsg = new Message(TEXT.die, MessageType.danger);
  S.messages.add(addMsg);
}

//モンスターがプレイヤーに攻撃する処理
export function attackPlayer(enemy: Enemy) {
  const damage = calcDamage(enemy.ATK, S.player.DEF);
  S.player.HP -= damage;
  S.messages.add(
    new Message(actionMsg.beAttacked(enemy.name, damage), MessageType.normal)
  );
}

export function calcFieldOfView(enemy: Enemy) {
  const view = EnemyConf.fieldOfView;
  const start = { x: enemy.point.x - view, y: enemy.point.y - view };
  const end = { x: enemy.point.x + view, y: enemy.point.y + view };
  const fieldOfView: IArea = { start: start, end: end };
  return fieldOfView;
}

export function isPointInArea(point: IPoint, area: IArea) {
  let isIn = false;
  if (
    point.x >= area.start.x &&
    point.x <= area.end.x &&
    point.y >= area.start.y &&
    point.y <= area.end.y
  ) {
    isIn = true;
  }
  return isIn;
}

//モンスターの周辺にプレイヤーがいればtrueを返す
export function searchPlayer(enemy: Enemy) {
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
