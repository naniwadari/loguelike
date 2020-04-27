import { Dig } from "./digPass";
import { con } from "../draw/Draw";

export enum MapType {
  wall = 0,
  floor = 1,
}

export enum Direction {
  up = 0,
  right = 1,
  bottom = 2,
  left = 3,
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
  index: number;
  size: ISize;
  point: IPoint;
  hasPath: number[];
  toPath?: number;
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

export interface block {
  base: MapType;
}

export interface Ipath {
  from: number;
  to: number;
}

//フロア内のブロック情報[x][y]で保存
export let blocks: block[][] = [];
//フロアのサイズ
const floorSize = { width: 25, height: 25 };
//一部屋あたりの最大サイズ
const maxRoomSize = { width: 10, height: 5 };
//一部屋あたりの最小サイズ
const minRoomSize = { width: 5, height: 5 };
//部屋の生成を試みる回数
const roomCreateCount = 30;
//生成された部屋を格納する配列
let rooms: IRoom[] = [];
let paths: Ipath[] = [];

export function createFloor() {
  paths = [];
  blocks = [];
  rooms = [];
  initFloor();
  roomCreator(roomCreateCount);
  // testCaseFloor();
  connectRoomsToPath(rooms);
  console.log(rooms);
  let checked: {
    result: boolean;
    needConnect: { to: IRoom; from: IRoom } | undefined;
  } = {
    result: false,
    needConnect: undefined,
  };
  for (let i = 0; !checked.result && i < 4; i++) {
    checked = checkDeadEnd(rooms);
    console.log(checked);
    if (checked.needConnect) {
      DigPass(checked.needConnect.to, checked.needConnect.from);
    }
  }
  return blocks;
}

function visualMapping(blocks: block[][]) {
  for (let i = 0; i < blocks.length; i++) {
    console.log(blocks[i]);
  }
}
export function testCaseFloor() {
  let size = { width: 5, height: 5 };
  let point = [
    { x: 16, y: 19 },
    { x: 17, y: 10 },
    { x: 19, y: 2 },
    { x: 2, y: 6 },
    { x: 2, y: 15 },
  ];
  for (let i = 0; i < point.length; i++) {
    createRoom(point[i], size);
    let newRoom: IRoom = {
      index: i,
      size: size,
      point: point[i],
      hasPath: [],
    };
    rooms.push(newRoom);
  }
}
//指定の回数部屋を作成する
function roomCreator(lim: number) {
  let count: number = 0;
  for (let i = 0; i < lim; i++) {
    const roomSize = randomRoomSize();
    const startPoint = randomRoomStartPoint();
    const roomElement = createRoom(startPoint, roomSize);
    if (roomElement) {
      const newRoom: IRoom = {
        index: count,
        size: roomElement.size,
        point: roomElement.point,
        hasPath: [],
      };
      count++;
      rooms.push(newRoom);
    }
  }
}

function connectRoomsToPath(rooms: IRoom[]) {
  const tmpRooms = rooms.slice();
  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    const nearRoom = findNearRoom(room, tmpRooms);
    if (nearRoom) {
      DigPass(room, nearRoom);
      room.toPath = nearRoom.index;
      rooms[nearRoom.index].hasPath.push(room.index);
      tmpRooms.some((v: IRoom, i) => {
        if (v.index === nearRoom.index) tmpRooms.splice(i, 1);
      });
    } else {
      DigPass(room, rooms[0]);
      room.toPath = rooms[0].index;
      rooms[0].hasPath.push(room.index);
    }
  }
  // console.log("-----------------");
}
function checkDeadEnd(rooms: IRoom[]): any {
  const noCheckedRooms = rooms.slice();
  let next = 0;
  let isConnect = false;
  let needConnect: { to: IRoom | undefined; from: IRoom | undefined } = {
    to: undefined,
    from: undefined,
  };

  for (let i = 0; noCheckedRooms.length > 0; i++) {
    console.log(`----${i}回目のチェック開始-----`);
    //初回の処理
    if (i === 0) {
      let now = rooms[0];
      if (now.toPath) next = now.toPath;
      noCheckedRooms.shift();
      let result = noCheckedRooms.some((v: IRoom) => {
        if (v.index === next) return true;
        else return undefined;
      });
      if (!result) {
        isConnect = true;
        break;
      }
    }
    //2回目以降の処理
    else {
      let now = rooms[next];
      noCheckedRooms.some((v: IRoom, i) => {
        if (v.index === now.index) noCheckedRooms.splice(i, 1);
      });
      if (now.toPath) next = now.toPath;
      let result = noCheckedRooms.some((v: IRoom) => {
        if (v.index === next) return true;
        else return undefined;
      });
      console.log(`${i}回目のresult`);
      console.log(result);
      if (!result) {
        needConnect = { to: now, from: noCheckedRooms[0] };
        break;
      }
      console.log(`noCheckedRoomsの中身`);
      console.log(noCheckedRooms);
    }
  }
  if (isConnect) {
    console.log("最終結果 true");
    return { result: isConnect, needConnect: undefined };
  } else {
    if (needConnect.from && needConnect.to) {
      console.log("チェック結果 false");
      console.log("needConnectの中身");
      console.log(needConnect);
      return { result: isConnect, needConnect: needConnect };
    } else {
      needConnect = { to: needConnect.to, from: rooms[0] };
      return { result: isConnect, needConnect: needConnect };
    }
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
    min = edge.upperLeft.y;
    max = edge.bottomLeft.y;
    result = rangeRandomInteger(min, max);
    digPoint = { x: edge.upperLeft.x, y: result };
  } else if (direction === Direction.right) {
    min = edge.upperRight.y;
    max = edge.bottomRight.y;
    result = rangeRandomInteger(min, max);
    digPoint = { x: edge.upperRight.x, y: result };
  } else if (direction === Direction.up) {
    min = edge.upperLeft.x;
    max = edge.bottomRight.x;
    result = rangeRandomInteger(min, max);
    digPoint = { x: result, y: edge.upperLeft.y };
  } else if (direction === Direction.bottom) {
    min = edge.bottomLeft.x;
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
  if (digDirection === Direction.left) {
    A = randomMakePointToDig(room, Direction.left);
    B = randomMakePointToDig(target, Direction.right);
    Dig.sideToside(A, B);
  } else if (digDirection === Direction.right) {
    A = randomMakePointToDig(room, Direction.right);
    B = randomMakePointToDig(target, Direction.left);
    Dig.sideToside(A, B);
  }
  //掘る方向が上下
  else if (digDirection === Direction.up) {
    A = randomMakePointToDig(room, Direction.up);
    B = randomMakePointToDig(target, Direction.bottom);
    Dig.topTobottom(A, B);
  } else if (digDirection === Direction.bottom) {
    A = randomMakePointToDig(room, Direction.bottom);
    B = randomMakePointToDig(target, Direction.up);
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
    distance: Math.abs(room.upperLeft.x - target.upperRight.x),
  });
  distances.push({
    direction: Direction.right,
    distance: Math.abs(room.upperRight.x - target.upperLeft.x),
  });
  distances.push({
    direction: Direction.up,
    distance: Math.abs(room.upperLeft.y - target.bottomLeft.y),
  });
  distances.push({
    direction: Direction.bottom,
    distance: Math.abs(room.bottomLeft.y - target.upperLeft.y),
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
  //一部屋なら早期リターン
  if (rooms.length === 1) {
    return undefined;
  }
  for (let i = 0; i < rooms.length; i++) {
    const anotherCenter = roomEdgeCulculator(rooms[i]).center;
    const distance =
      Math.abs(center.x - anotherCenter.x) +
      Math.abs(center.y - anotherCenter.y);
    const result = { index: i, distance: distance };
    roomDistances.push(result);
  }
  //部屋の距離を比較して配列を並び替える
  roomDistances = roomDistances.sort((a: IRoomDistance, b: IRoomDistance) => {
    return a.distance > b.distance ? 1 : -1;
  });
  //一番近い部屋をして返す
  const nearRoom = rooms[roomDistances[1].index];
  return nearRoom;
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

function initFloor() {
  for (let i = 0; i <= floorSize.width; i++) {
    blocks[i] = [];
    for (let j = 0; j <= floorSize.height; j++) {
      blocks[i][j] = { base: MapType.wall };
    }
  }
}

//左上の座標と、部屋のサイズにしたがってフロアのタイプ番号を書き換える
function createRoom(startPoint: IPoint, roomSize: ISize) {
  const isAreaNoRoom = checkAreaNoRoom(startPoint, roomSize);
  const isInsideFloor = checkInsideFloor(startPoint, roomSize);
  let result: { point: IPoint; size: ISize } | null = null;
  //フロアをはみ出してしまう場合処理を中断する
  if (!isInsideFloor) {
    return null;
  }
  //予定地にすでに部屋があった場合処理を中断する。
  else if (!isAreaNoRoom) {
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
        blocks[i][j].base = MapType.floor;
      }
    }
  }
  result = { point: startPoint, size: roomSize };
  return result;
}

//作成しようとしている部屋がフロアからはみだしていないか確認する
function checkInsideFloor(startPoint: IPoint, roomSize: ISize) {
  let result = true;
  const endPoint: IPoint = {
    x: startPoint.x + roomSize.width,
    y: startPoint.y + roomSize.height,
  };
  //部屋がフロアからはみ出していないか確認
  if (
    startPoint.x < 1 ||
    startPoint.y < 1 ||
    endPoint.x > floorSize.width - 1 ||
    endPoint.y > floorSize.height - 1
  ) {
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
        i >= startPoint.x - 3 &&
        i < startPoint.x + roomSize.width + 3 &&
        j >= startPoint.y - 3 &&
        j < startPoint.y + roomSize.height + 3
      ) {
        if (blocks[i][j].base === MapType.floor) {
          result = false;
          break;
        }
      }
    }
  }
  return result;
}
