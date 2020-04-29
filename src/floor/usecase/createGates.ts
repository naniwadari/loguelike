import Room from "../Room";
import { Direction } from "../../config";
import { Random } from "../../module/RandomNum";
import { RoomSearch } from "../../module/RoomSearch";
import { IPoint, IGate } from "../../Types";

interface findDirection {
  direction: Direction;
  distance: number;
}
interface IRoomDistance {
  index: number;
  distance: number;
}

export function createGates(rooms: Room[]) {
  const tmpRooms = rooms.slice();
  let gates: IGate[] = [];
  for (let i = 0; i < rooms.length || i < 100; i++) {
    const room = rooms[i];
    const nearRoom = findNearRoom(room, tmpRooms);
    if (nearRoom) {
      const gate = createGate(room, nearRoom);
      gates.push(gate);
      if (nearRoom.index) room.toPath.push(nearRoom.index);
      if (room.index) nearRoom.hasPath.push(room.index);
      RoomSearch.remove(tmpRooms, room);
      rooms = RoomSearch.update(rooms, room);
      rooms = RoomSearch.update(rooms, nearRoom);
    } else {
      let targetIndex = Random.rangeInt(0, rooms.length - 1);
      let target = RoomSearch.byIndex(rooms, targetIndex);
      if (target.index) room.toPath.push(target.index);
      if (room.index) target.hasPath.push(room.index);
      RoomSearch.remove(tmpRooms, room);
      rooms = RoomSearch.update(rooms, room);
      rooms = RoomSearch.update(rooms, target);
    }
  }
  return { rooms: rooms, gates: gates };
}

export function findNearRoom(room: Room, rooms: Room[]) {
  let roomDistances: IRoomDistance[] = [];
  if (rooms.length <= 1) {
    return undefined;
  }
  for (let i = 0; i < rooms.length; i++) {
    const target = rooms[i];
    const distance =
      Math.abs(room.center.x - target.center.x) +
      Math.abs(room.center.y - target.center.y);
    //距離ゼロは自室なので加えない
    if (distance !== 0) {
      const result = { index: i, distance: distance };
      roomDistances.push(result);
    }
  }
  //部屋の距離を比較して配列を並び替える
  roomDistances = roomDistances.sort((a: IRoomDistance, b: IRoomDistance) => {
    return a.distance > b.distance ? 1 : -1;
  });
  //一番近い部屋を返す
  return rooms[roomDistances[0].index];
}

//パスを作る起点となるドアを決定する
export function createGate(room: Room, target: Room): IGate {
  const direction = findDireciton(room, target);
  let A: IPoint;
  let B: IPoint;
  //掘る方向が左右
  if (direction === Direction.left) {
    A = randomGate(room, Direction.left);
    B = randomGate(target, Direction.right);
    let gate = { A: A, B: B, direction: Direction.left };
    return gate;
  } else if (direction === Direction.right) {
    A = randomGate(room, Direction.right);
    B = randomGate(target, Direction.left);
    let gate = { A: A, B: B, direction: Direction.right };
    return gate;
  }
  //掘る方向が上下
  else if (direction === Direction.top) {
    A = randomGate(room, Direction.top);
    B = randomGate(target, Direction.bottom);
    let gate = { A: A, B: B, direction: Direction.top };
    return gate;
  } else {
    A = randomGate(room, Direction.bottom);
    B = randomGate(target, Direction.top);
    let gate = { A: A, B: B, direction: Direction.bottom };
    return gate;
  }
}

//指定した部屋との上下左右の距離の差を比較して最も小さいものを返す
export function findDireciton(room: Room, target: Room) {
  if (target.center.x <= room.start.x && target.center.y <= room.end.y) {
    return Direction.left;
  } else if (target.center.x <= room.end.x && target.center.y >= room.end.y) {
    return Direction.bottom;
  } else if (target.center.x >= room.end.x && target.center.y >= room.start.y) {
    return Direction.right;
  } else if (
    target.center.x >= room.start.x &&
    target.center.y <= room.start.y
  ) {
    return Direction.top;
  } else {
    return Direction.top;
  }
}

//通路の始点をランダムに決める
export function randomGate(room: Room, direction: Direction) {
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
