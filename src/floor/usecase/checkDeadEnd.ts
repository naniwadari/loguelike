import Room from "../Room";

export default (rooms: Room[]) => {
  let noCheckedRooms = rooms.slice();
  let isConnect = false;
  let needPath: { to: Room; from: Room } = { to: rooms[0], from: rooms[0] };
  //部屋が一部屋のみの場合はパスの必要が無いので早期リターン
  if (rooms.length === 1) {
    isConnect = true;
    return { result: isConnect, needPath: needPath };
  }
  for (let i = 0; noCheckedRooms.length > 0; i++) {
    let next: Room = rooms[0];
    let needPath: any;
    if (i === 0) {
      let now = rooms[0];
      removeRoom(noCheckedRooms, now);
      next = findNextRoom(noCheckedRooms, now);
    } else {
      let now = next;
      removeRoom(noCheckedRooms, now);
      next = findNextRoom(noCheckedRooms, now);
      if (!next) {
        needPath = { to: now, from: noCheckedRooms[0] };
        break;
      }
    }
    isConnect = true;
  }
  if (isConnect) {
    return { result: isConnect, needPath: needPath };
  } else {
    return { result: isConnect, needPath: needPath };
  }
};

//該当する部屋があれば配列から削除する
function removeRoom(rooms: Room[], room: Room) {
  rooms.some((v: Room, i) => {
    if (v.index === room.index) rooms.splice(i, 1);
  });
}

// 次の部屋を検索する
function findNextRoom(rooms: Room[], now: Room) {
  let nextIndex = now.toPath[now.toPath.length - 1];
  let result = findRoomByIndex(rooms, nextIndex);
  return result;
}

//次の部屋をインデックスで検索する
function findRoomByIndex(rooms: Room[], index: number) {
  let result: Room[] = rooms.filter((room: Room) => {
    return room.index === index;
  });
  return result[0];
}

function findRoom(rooms: Room[], room: Room) {
  let isFind: boolean;
  isFind = rooms.some((v: Room, i) => {
    if (v.index === room.index) return true;
    else return false;
  });
  return isFind;
}
