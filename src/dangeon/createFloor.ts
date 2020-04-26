import { Dig } from "./digPass";

export enum Type {
  wall = 0,
  floor = 1,
}

export enum Direction {
  up = 0,
  right = 1,
  bottom = 2,
  left = 4,
  upperLeft = 5,
  bottomLeft = 6,
  upperRight = 7,
  bottomRight = 8,
}

export interface ISize {
  width: number;
  height: number;
}

export interface IPoint {
  x: number;
  y: number;
}
export interface IRoom {
  point: IPoint;
  size: ISize;
}

export interface IRoomEdge {
  upperLeft: IPoint;
  bottomLeft: IPoint;
  upperRight: IPoint;
  bottomRight: IPoint;
  center: IPoint;
}

export interface IRoomDistance {
  index: number;
  distance: number;
}

//フロア内のブロック情報[x][y]で保存
export let blocks: number[][] = [];
//フロアのサイズ
const floorSize = { width: 5, height: 5 };
//一部屋あたりの最大サイズ
const maxRoomSize = { width: 3, height: 3 };
//一部屋あたりの最小サイズ
const minRoomSize = { width: 1, height: 1 };
//部屋の生成を試みる回数
const roomCreateCount = 12;
//生成された部屋を格納する配列
const rooms: IRoom[] = [];

initFroor();
const room1 = createRoom({ x: 5, y: 5 }, { width: 1, height: 1 });
// //失敗するべき
// createRoom({ x: 0, y: 0 }, { width: 2, height: 2 });
//成功するべき
const room2 = createRoom({ x: 3, y: 0 }, { width: 1, height: 1 });
if (room1 && room2) {
  Dig.topTobottom(room1.point, room2.point);
  const room1Edge = roomEdgeCulculator(room1);
  const room2Edge = roomEdgeCulculator(room2);
}

// roomCreator(roomCreateCount);
// console.log(rooms);
// console.log(searchNearRoom(rooms[0], rooms));
// digVerticalWay({ x: 1, y: 1 }, { x: 1, y: 3 });
// digSideWay({ x: 1, y: 3 }, { x: 4, y: 3 });
console.log(visualMapping(blocks));

function visualMapping(blocks: number[][]) {
  for (let i = 0; i < blocks.length; i++) {
    console.log(blocks[i]);
  }
}

//通路の始点をランダムに決める
function randomMakePointToDig(room: IRoom, direction: Direction) {
  const edge = roomEdgeCulculator(room);
  let min: number;
  let max: number;
  let result: number;
  let digPoint: IPoint = { x: 0, y: 0 };
  //方角毎に通路の始点をランダムに決める
  if (direction === Direction.left) {
    min = edge.bottomLeft.y - edge.upperLeft.y;
    max = edge.upperLeft.y;
    result = rangeRandomInteger(min, max);
    digPoint = { x: edge.upperLeft.x, y: result };
  } else if (direction === Direction.right) {
    min = edge.bottomRight.y - edge.upperRight.y;
    max = edge.upperRight.y;
    result = rangeRandomInteger(min, max);
    digPoint = { x: edge.upperRight.x, y: result };
  } else if (direction === Direction.up) {
    min = edge.bottomRight.x - edge.upperLeft.x;
    max = edge.upperLeft.x;
    result = rangeRandomInteger(min, max);
    digPoint = { x: result, y: edge.upperLeft.y };
  } else if (direction === Direction.bottom) {
    min = edge.bottomRight.x - edge.bottomRight.x;
    max = edge.bottomRight.x;
    result = rangeRandomInteger(min, max);
    digPoint = { x: result, y: edge.bottomLeft.y };
  }
  return digPoint;
}

//指定範囲内の整数をランダムに返す
function rangeRandomInteger(min: number, max: number) {
  const result = Math.floor(Math.random() * (max - min) + min);
  return result;
}

//通路を掘る
function DigPass(room: IRoom, target: IRoom) {
  const roomEdge = roomEdgeCulculator(room);
  const targetEdge = roomEdgeCulculator(target);
  const digDirection = findDirection(roomEdge, targetEdge);
  let A: IPoint;
  let B: IPoint;
  //掘る方向が左右
  if (digDirection === Direction.left || Direction.right) {
    if (digDirection === Direction.left) {
      A = randomMakePointToDig(room, digDirection);
      B = randomMakePointToDig(target, Direction.right);
    } else {
      A = randomMakePointToDig(room, digDirection);
      B = randomMakePointToDig(target, Direction.left);
    }
    Dig.sideToside(A, B);
  }
  //掘る方向が上下
  else if (digDirection === Direction.up || Direction.bottom) {
    if (digDirection === Direction.up) {
      A = randomMakePointToDig(room, digDirection);
      B = randomMakePointToDig(target, Direction.bottom);
    } else {
      A = randomMakePointToDig(room, digDirection);
      B = randomMakePointToDig(target, Direction.up);
    }
    Dig.topTobottom(A, B);
  } else {
    console.log("undefiend direction error");
    return;
  }
}
//指定した部屋との上下左右の距離の差を比較して最も小さいものを返す
function findDirection(room: IRoomEdge, target: IRoomEdge) {
  interface findDirection {
    direction: Direction;
    distance: number;
  }
  let distances: findDirection[] = [];
  distances.push({
    direction: Direction.left,
    distance: Math.abs(room.upperLeft.y - target.upperRight.y),
  });
  distances.push({
    direction: Direction.right,
    distance: Math.abs(room.upperRight.y - target.upperLeft.y),
  });
  distances.push({
    direction: Direction.up,
    distance: Math.abs(room.upperLeft.x - target.bottomLeft.x),
  });
  distances.push({
    direction: Direction.bottom,
    distance: Math.abs(room.bottomLeft.x - target.upperLeft.x),
  });
  distances.sort((a: findDirection, b: findDirection) => {
    return a.distance > b.distance ? 1 : -1;
  });
  const result = distances[0];
  return result.direction;
}

//指定の部屋から一番近い部屋を見つけて返す、一部屋しか無い場合はundfinedを返す。
function findNearRoom(room: IRoom, rooms: IRoom[]) {
  const center = roomEdgeCulculator(room).center;
  let roomDistances: IRoomDistance[] = [];
  for (let i = 0; i < rooms.length; i++) {
    const anotherCenter = roomEdgeCulculator(rooms[i]).center;
    const distance =
      Math.abs(center.x - anotherCenter.x) +
      Math.abs(center.y - anotherCenter.y);
    const result = { index: i, distance: distance };
    //距離がゼロの場合自分自身なので配列に加えない
    if (result.distance !== 0) {
      roomDistances.push(result);
    }
  }
  //部屋の距離を比較して配列を並び替える
  roomDistances = roomDistances.sort((a: IRoomDistance, b: IRoomDistance) => {
    return a.distance > b.distance ? 1 : -1;
  });
  //一番近い部屋をして返す
  if (roomDistances) {
    const nearRoom = rooms[roomDistances[0].index];
    return nearRoom;
  } else {
    return undefined;
  }
}

//部屋の上下左右の角と中心の座標を計算して返す
function roomEdgeCulculator(room: IRoom): IRoomEdge {
  const upperLeft: IPoint = room.point;
  const upperRight: IPoint = {
    x: room.point.x + room.size.width - 1,
    y: room.point.y,
  };
  const bottomLeft: IPoint = {
    x: room.point.x,
    y: room.point.y + room.size.height - 1,
  };
  const bottomRight: IPoint = {
    x: room.point.x + room.size.width - 1,
    y: room.point.y + room.size.height - 1,
  };
  const center: IPoint = {
    x: Math.floor(room.point.x + room.size.width / 2),
    y: Math.floor(room.point.y + room.size.height / 2),
  };
  const result: IRoomEdge = {
    upperLeft: upperLeft,
    upperRight: upperRight,
    bottomLeft: bottomLeft,
    bottomRight: bottomRight,
    center: center,
  };
  return result;
}

//指定の回数部屋を作成する
function roomCreator(lim: number) {
  for (let i = 0; i < lim; i++) {
    const roomSize = randomRoomSize();
    const startPoint = randomRoomStartPoint();
    const newRoom = createRoom(startPoint, roomSize);
    if (newRoom) {
      rooms.push(newRoom);
    }
  }
}

//ランダムに部屋のwidthとheightを返す
function randomRoomSize() {
  const width =
    Math.floor(Math.random() * (maxRoomSize.width - minRoomSize.width + 1)) +
    minRoomSize.width;
  const height =
    Math.floor(Math.random() * (maxRoomSize.height - minRoomSize.height + 1)) +
    minRoomSize.height;
  const size: ISize = { width: width, height: height };
  return size;
}

//ランダムに部屋の左上の座標を返す
function randomRoomStartPoint() {
  //ランダムで座標を生成
  const x = Math.floor(Math.random() * floorSize.width);
  const y = Math.floor(Math.random() * floorSize.height);
  const startPoint: IPoint = { x: x, y: y };
  return startPoint;
}

function initFroor() {
  for (let i = 0; i <= floorSize.width; i++) {
    blocks[i] = [];
    for (let j = 0; j <= floorSize.height; j++) {
      blocks[i][j] = Type.wall;
    }
  }
}

//左上の座標と、部屋のサイズにしたがってフロアのタイプ番号を書き換える
function createRoom(startPoint: IPoint, roomSize: ISize) {
  const isAreaNoRoom = checkAreaNoRoom(startPoint, roomSize);
  const isInsideFloor = checkInsideFloor(startPoint, roomSize);
  let result: IRoom | null = null;
  //フロアをはみ出してしまう場合処理を中断する
  if (!isInsideFloor) {
    // console.log("部屋がはみ出しています。処理終了");
    return null;
  }
  //予定地にすでに部屋があった場合処理を中断する。
  else if (!isAreaNoRoom) {
    // console.log("すでに部屋があります。処理終了。");
    return null;
  }
  //ブロック情報の書き換え処理
  for (let i = 0; i <= floorSize.width; i++) {
    for (let j = 0; j <= floorSize.height; j++) {
      if (
        i >= startPoint.x &&
        i < startPoint.x + roomSize.width &&
        j >= startPoint.y &&
        j < startPoint.y + roomSize.height
      ) {
        blocks[i][j] = Type.floor;
      }
    }
  }
  // console.log("ルームを生成できました");
  result = { point: startPoint, size: roomSize };
  return result;
}

//作成しようとしている部屋がフロアからはみだしていないか確認する
function checkInsideFloor(startPoint: IPoint, roomSize: ISize) {
  let result = true;
  const endPoint: IPoint = {
    x: startPoint.x + roomSize.width - 1,
    y: startPoint.y + roomSize.height - 1,
  };
  //部屋がフロアからはみ出していないか確認
  if (endPoint.x > floorSize.width || endPoint.y > floorSize.width) {
    //はみ出していたらfalseを返す
    result = false;
  }
  return result;
}

//作成しようとしている部屋のエリア内に、すでに部屋がないか確認する。
function checkAreaNoRoom(startPoint: IPoint, roomSize: ISize) {
  let result = true;
  for (let i = 0; i <= floorSize.width; i++) {
    for (let j = 0; j <= floorSize.height; j++) {
      if (
        //部屋の予定座標と、その周囲１マスにすでに部屋がないか確認
        i >= startPoint.x - 1 &&
        i < startPoint.x + roomSize.width + 1 &&
        j >= startPoint.y - 1 &&
        j < startPoint.y + roomSize.height + 1
      ) {
        if (blocks[i][j] === Type.floor) {
          result = false;
          break;
        }
      }
    }
  }
  return result;
}
