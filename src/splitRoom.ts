import { Random } from "./Random";
import { MapType } from "./config";

const minRoomWidth = 6; //偶数
const minRoomHeight = 6; //偶数

export interface IRoom {
  start: { x: number; y: number };
  end: { x: number; y: number };
}

function roomWidth(room: IRoom) {
  return room.end.x - room.start.x;
}
function roomHeight(room: IRoom) {
  return room.end.y - room.start.y;
}

export function splitRoom(
  blocks: any,
  room: IRoom,
  splitProb: number,
  random: Random
) {
  let avoidProb = random.fraction();
  if (avoidProb <= splitProb) {
    let splitDirection = random.num(2);
    //部屋の横(x)の広さが縦(y)の２倍以上あった場合,縦に分割
    if (roomWidth(room) > roomHeight(room) * 2) {
      splitDirection = 0; //縦
    }
    //部屋の縦(y)の広さが横(x)の2倍以上あった場合、横に分割
    else if (roomWidth(room) * 2 < roomHeight(room)) {
      splitDirection = 1; //横
    }
    //縦に分割する場合
    if (splitDirection === 0) {
      // 横の広さが最小値以下ならリターン
      if (roomWidth(room) <= minRoomWidth) {
        return [];
      }
      const XsplitPoint =
        random.num(roomWidth(room) - minRoomWidth) +
        minRoomWidth / 2 +
        room.start.x;
      if (blocks[XsplitPoint][room.start.y - 1].base !== MapType.wall) {
        return [];
      }
      if (blocks[XsplitPoint][room.end.y + 1].base !== MapType.wall) {
        return [];
      }
      const y = random.num(roomHeight(room)) + room.start.y;
      for (let i = room.start.y; i <= room.end.y; i++) {
        if (i !== y) {
          blocks[XsplitPoint][i].base = MapType.wall;
        }
      }
      //分割後の部屋１
      const splitRoom1: IRoom = {
        start: room.start,
        end: { x: XsplitPoint - 1, y: room.end.y },
      };
      //分割後の部屋２
      const splitRoom2: IRoom = {
        start: { x: XsplitPoint + 1, y: room.start.y },
        end: room.end,
      };
      const orderRoomDirection = random.num(2);
      if (orderRoomDirection === 0) {
        return [splitRoom1, splitRoom2];
      } else {
        return [splitRoom2, splitRoom1];
      }
    }
    // 横に分割する場合
    else if (splitDirection === 1) {
      if (roomHeight(room) <= minRoomHeight) {
        return [];
      }
      const YsplitPoint =
        random.num(roomHeight(room) - minRoomHeight) +
        minRoomHeight / 2 +
        room.start.y;
      if (blocks[room.start.x - 1][YsplitPoint].base !== MapType.wall) {
        return [];
      }
      if (blocks[room.end.x + 1][YsplitPoint].base !== MapType.wall) {
        return [];
      }
      const XsplitPoint = random.num(roomWidth(room)) + room.start.x;
      for (let i = room.start.x; i <= room.end.x; i++) {
        if (i !== XsplitPoint) {
          blocks[i][YsplitPoint].base = MapType.wall;
        }
      }
      const splitRoom1 = {
        start: room.start,
        end: { x: room.end.x, y: YsplitPoint - 1 },
      };
      const splitRoom2 = {
        start: { x: room.start.x, y: YsplitPoint + 1 },
        end: room.end,
      };
      let orderRoomDirection = random.num(2);
      if (orderRoomDirection === 0) {
        return [splitRoom1, splitRoom2];
      } else {
        return [splitRoom2, splitRoom1];
      }
    }
  }
  return [];
}
