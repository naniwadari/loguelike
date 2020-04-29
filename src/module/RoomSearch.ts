import Room from "../floor/Room";

export module RoomSearch {
  //該当する部屋があれば配列から削除する
  export function remove(rooms: Room[], room: Room) {
    rooms.some((v: Room, i) => {
      if (v.index === room.index) rooms.splice(i, 1);
    });
  }
  export function update(rooms: Room[], room: Room) {
    rooms.some((v: Room, i) => {
      if (v.index === room.index) rooms[i] = room;
    });
    return rooms;
  }

  // 次の部屋を検索する
  export function connectTo(rooms: Room[], now: Room) {
    let nextIndex = now.toPath[now.toPath.length - 1];
    let result = byIndex(rooms, nextIndex);
    return result;
  }

  //次の部屋をインデックスで検索する
  export function byIndex(rooms: Room[], index: number) {
    let result: Room[] = rooms.filter((room: Room) => {
      return room.index === index;
    });
    return result[0];
  }

  //配列の中に部屋が存在すればtrueを返す
  export function isExist(rooms: Room[], room: Room) {
    let isExist: boolean;
    isExist = rooms.some((v: Room, i) => {
      if (v.index === room.index) return true;
      else return false;
    });
    return isExist;
  }
}
