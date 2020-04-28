import Room from "../Room";
import { Direction } from "../../config";
import { Random } from "../../module/RandomNum";
import { IPoint, IGate } from "../../Types";

interface findDirection {
  direction: Direction;
  distance: number;
}

export function createGates(rooms: Room[]) {
  const tmpRooms = rooms.slice();
  let gates: IGate[] = [];
  for (let i = 0; i < rooms.length || i < 100; i++) {
    const room = rooms[i];
    const nearRoom = room.findNear(tmpRooms);
    if (nearRoom) {
      const path = createGate(room, nearRoom);
      if (path) {
        gates.push(path);
        if (nearRoom.index) room.toPath.push(nearRoom.index);
        if (room.index) nearRoom.hasPath.push(room.index);
        tmpRooms.some((v: Room, i) => {
          if (v.index === nearRoom.index) tmpRooms.splice(i, 1);
        });
      }
    } else if (room) {
      const path = createGate(room, rooms[0]);
      if (path) {
        gates.push(path);
        if (rooms[0].index) room.toPath.push(rooms[0].index);
        if (room.index) rooms[0].hasPath.push(room.index);
      }
    }
  }
  return gates;
}

//パスを作る起点となるドアを決定する
export function createGate(room: Room, target: Room): IGate {
  const direction = findDirection(room, target);
  let A: IPoint;
  let B: IPoint;
  //掘る方向が左右
  if (direction === Direction.left) {
    A = randomGate(room, Direction.left);
    B = randomGate(target, Direction.right);
    let path = { A: A, B: B, direction: Direction.left };
    return path;
  } else if (direction === Direction.right) {
    A = randomGate(room, Direction.right);
    B = randomGate(target, Direction.left);
    let path = { A: A, B: B, direction: Direction.right };
    return path;
  }
  //掘る方向が上下
  else if (direction === Direction.top) {
    A = randomGate(room, Direction.top);
    B = randomGate(target, Direction.bottom);
    let path = { A: A, B: B, direction: Direction.top };
    return path;
  } else {
    A = randomGate(room, Direction.bottom);
    B = randomGate(target, Direction.top);
    let path = { A: A, B: B, direction: Direction.bottom };
    return path;
  }
}

//指定した部屋との上下左右の距離の差を比較して最も小さいものを返す
function findDirection(room: Room, target: Room) {
  let distances: findDirection[] = [];
  distances.push({
    direction: Direction.left,
    distance: Math.abs(room.start.x - target.end.x),
  });
  distances.push({
    direction: Direction.right,
    distance: Math.abs(room.end.x - target.start.x),
  });
  distances.push({
    direction: Direction.top,
    distance: Math.abs(room.start.y - target.end.y),
  });
  distances.push({
    direction: Direction.bottom,
    distance: Math.abs(room.end.y - target.start.y),
  });
  distances.sort((a: findDirection, b: findDirection) => {
    return a.distance > b.distance ? 1 : -1;
  });
  const result = distances[0];
  return result.direction;
}

//通路の始点をランダムに決める
function randomGate(room: Room, direction: Direction) {
  let gate: IPoint = { x: 0, y: 0 };
  //方角毎に通路の始点をランダムに決める
  if (direction === Direction.left) {
    gate = { x: room.start.x, y: Random.rangeInt(room.start.y, room.end.y) };
  } else if (direction === Direction.right) {
    gate = { x: room.end.x, y: Random.rangeInt(room.start.y, room.end.y) };
  } else if (direction === Direction.top) {
    gate = { x: Random.rangeInt(room.start.x, room.end.x), y: room.start.y };
  } else if (direction === Direction.bottom) {
    gate = { x: Random.rangeInt(room.start.x, room.end.x), y: room.end.y };
  }
  return gate;
}
