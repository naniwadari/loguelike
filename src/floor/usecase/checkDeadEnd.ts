import Room from "../Room";
import { RoomSearch } from "../../module/RoomSearch";

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
      RoomSearch.remove(noCheckedRooms, now);
      next = RoomSearch.connectTo(noCheckedRooms, now);
    } else {
      let now = next;
      RoomSearch.remove(noCheckedRooms, now);
      next = RoomSearch.connectTo(noCheckedRooms, now);
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
